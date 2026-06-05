# Interview AI — Project Summary (Modules, Models & Function Flow)

A **multi-tenant SaaS backend** that lets universities run **AI-powered voice
interviews** for prospective students — handling onboarding, document verification,
the interview call, AI evaluation, and reporting. Built on **NestJS + Prisma +
PostgreSQL**, with **Redis/BullMQ** for background jobs. Each client (tenant) runs in
its **own database**; a control-plane DB governs all tenants.

---

## 1. Tech stack

| Layer | Technology |
|---|---|
| Runtime / framework | Node.js, NestJS, TypeScript |
| Database / ORM | PostgreSQL, Prisma (tenant schema + master schema) |
| Cache & queues | Redis, BullMQ |
| Auth | JWT (admin / student / platform), Passport, RBAC |
| Multi-tenancy | nestjs-cls (AsyncLocalStorage), Prisma client proxy |
| AI / ML | OpenAI (LLM + embeddings), Azure Document Intelligence (OCR), Pinecone (vector DB) |
| Storage / mail | AWS S3, Nodemailer (Handlebars templates) |
| Realtime | Socket.IO (events gateway) |
| Docs | Swagger / OpenAPI |

---

## 2. Module map (NestJS)

| Module | Responsibility |
|---|---|
| **PlatformModule** | Control plane: platform-owner login + tenant provisioning (master DB). |
| **TenantModule** | Per-tenant DB connection pool, master Prisma client, CLS tenant context. |
| **PrismaModule** | Tenant-scoped Prisma proxy (`this.prisma.*` → correct tenant DB). |
| **TenantCacheModule** | Redis cache with per-tenant key prefixing. |
| **AuthModule** | Admin/student login, JWT issue/refresh, sessions, set-/reset-password. |
| **AdminsModule** | Admin CRUD, role assignment, API-key generation, external login. |
| **UsersModule** | Student CRUD, onboarding state, university assignment, auto interview assignment. |
| **UniversitiesModule** | University (tenant sub-entity) CRUD + Pinecone/knowledge config. |
| **InterviewersModule** | AI interviewer personas (voice/LLM/STT config). |
| **InterviewsModule** | Interview creation, attempt assignment (queue-driven). |
| **UploadsModule** | S3 file uploads (resume, passport, photos, logos), signed URLs. |
| **DocumentVerifierModule** | Document checks + triggers OCR / AI-summary / passport jobs. |
| **AiSummaryModule** | AI candidate summary from resume + offer letter. |
| **KnowledgeBaseModule** | Per-university PDF → embeddings → Pinecone index. |
| **WebhookModule** | Provider call webhooks → attempt updates → evaluation pipeline. |
| **AuditLogModule** | Append-only audit trail of admin/user actions. |
| **EventsModule** | Socket.IO gateway for realtime progress (jobs, summaries). |
| **MailModule** | Transactional emails (invites, results, password links). |
| **QueuesModule** | BullMQ queue registration. |

**Cross-cutting:** `TenantResolutionGuard` (binds tenant per request), `JwtAuthGuard`,
`RolesGuard`, `PermissionsGuard`, `ApiKeyGuard`, `AuditLogInterceptor`.

---

## 3. Data models (Prisma)

### Control plane — `prisma/master/schema.prisma`
- **Tenant** — a client; `slug`, encrypted `databaseUrl`, `status`.
- **PlatformAdmin** — platform owner accounts.
- **PlatformSession** — platform refresh-token sessions.

### Per-tenant — `prisma/schema.prisma`

**RBAC & auth**
- **Admin** — staff user (super_admin / university_admin / …), optional `universityId`.
- **Role**, **Permission**, **RolePermission**, **AdminRoleAssignment** — RBAC graph.
- **Session**, **PasswordResetToken**, **EmailVerificationToken** — auth tokens.
- **ApiKey** — hashed API keys for integrations/webhooks.

**Tenant sub-entities**
- **University** — a school within the tenant (logo, Pinecone namespace, question bank).
- **User** — a student (onboarding status, docs, university link).
- **StudentProfile** — passport/nationality/course + AI summary fields.
- **Interviewer** — AI interviewer persona (TTS/STT/LLM/voice config).

**Interview lifecycle**
- **Interview** — an assigned interview (user × university × interviewer).
- **InterviewAttempt** — a single attempt (status, result, score, provider call id).
- **TranscriptTurn** — per-turn transcript of an attempt.
- **EvaluationReport** — AI scoring, sentiment, strengths/weaknesses, lead category, PDF URL.
- **ProctoringEvent**, **ProctoringMedia** — proctoring signals + captured media.

**Documents, integrations, audit**
- **Upload** — S3 file metadata (virus/verify status).
- **DocumentSubmission**, **PassportVerification** — document tracking + verification.
- **WebhookEvent** — inbound provider events (idempotent).
- **AuditLog** — who did what, when.

---

## 4. Function flow (end-to-end)

### A. Platform & tenant setup
```
Platform owner → /platform/login (master DB)
              → /platform/tenants  → create Tenant row (encrypt DB URL)
                                   → migrate tenant DB → seed RBAC + client super_admin
                                   → status = active
```

### B. Request → correct database (every call)
```
Request → CLS context → TenantResolutionGuard
        (path slug | X-Tenant header | subdomain | JWT tenantId)
        → open/reuse tenant Prisma client → bind to CLS
        → JwtAuthGuard / Roles / Permissions
        → Controller → Service (this.prisma.* hits the tenant DB)
```

### C. Student onboarding → interview assignment
```
university_admin → POST /users (create student)
   → save user + profile  → enqueue ASSIGN_INTERVIEWS { tenantId, … }
   → InterviewsProcessor (runForTenant) → create Interview/Attempts → email invite
```

### D. Documents → verification → AI summary
```
student → POST /uploads (resume / passport / offer letter)  [S3: tenants/<slug>/…]
   → DocumentVerifierService runs checks
   → enqueue AI_SUMMARY (resume+offer) or PASSPORT_EXTRACTION (OCR)
   → processors (runForTenant) → OpenAI/Azure → write StudentProfile / verification
   → realtime progress via Socket.IO
```

### E. Interview call → evaluation → report
```
Provider → POST /webhooks/:tenantSlug/edysor  (call.started / call.ended)
   → bind tenant → update InterviewAttempt + store TranscriptTurns
   → enqueue EVALUATION { tenantId }
   → EvaluationProcessor → LLM scoring/sentiment/lead → EvaluationReport
   → enqueue EVALUATION_REPORT → build PDF (S3) + email result
```

### F. Knowledge base (per university)
```
admin → upload question-bank PDF → enqueue KNOWLEDGE_BASE_INDEXING
   → KnowledgeBaseProcessor → parse PDF → OpenAI embeddings → Pinecone (university namespace)
```

### G. Auth lifecycle
```
login (tenant-scoped) → JWT { tenantId, roles, universityId } + refresh session
refresh → rotate session, re-issue JWT
RBAC → Roles/Permissions guards enforce per-route access within the tenant
audit → AuditLogInterceptor records mutating actions
```

---

## 5. Background jobs (BullMQ)

| Queue | Trigger | Worker output |
|---|---|---|
| `ASSIGN_INTERVIEWS` | student created/assigned | Interviews + invite email |
| `AI_SUMMARY` | resume + offer uploaded | AI candidate summary on profile |
| `PASSPORT_EXTRACTION` | passport uploaded | OCR-extracted passport fields |
| `KNOWLEDGE_BASE_INDEXING` | question-bank PDF uploaded | Pinecone vectors (per university) |
| `EVALUATION` | call.ended webhook | EvaluationReport (score, sentiment, lead) |
| `EVALUATION_REPORT` | evaluation done | PDF report (S3) + result email |

Every job carries `tenantId` and re-binds tenant context before any DB/cache access.

---

## 6. Key design decisions

- **DB-per-tenant** — strongest isolation; the database *is* the tenant boundary, so no
  `tenantId` column is needed on business tables.
- **Prisma proxy + AsyncLocalStorage** — all existing services keep `this.prisma.*`
  with no changes; the correct tenant DB is injected per request/job.
- **Three trust tiers** — platform owner (all tenants) → client super_admin (one tenant)
  → university-scoped roles, enforced by RBAC guards.
- **Shared Redis & S3, namespaced** — cache keys prefixed `t:<id>:`, S3 objects under
  `tenants/<slug>/…`.

> See also: [WORKFLOW.md](WORKFLOW.md) (sequence diagrams) and
> [MULTI_TENANT.md](MULTI_TENANT.md) (ops runbook).
