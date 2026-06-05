# Clinic Cloud — Resume Summary

Copy-paste-ready blurbs for your resume, sized from one-liner to full project entry. Pick the version that fits the slot you have.

---

## One-liner (LinkedIn headline / portfolio tagline)

> **Clinic Cloud** — Multi-tenant healthcare SaaS backend (NestJS, PostgreSQL, Redis, AWS) powering clinic management, appointments, payments, WhatsApp bookings, and Indian-government ABDM/ABHA health-record integration across 27+ feature modules.

---

## Short version (2–3 lines, typical resume bullet)

**Clinic Cloud — Multi-Tenant Healthcare SaaS Backend** &nbsp;·&nbsp; *NestJS, TypeScript, PostgreSQL, Prisma, Redis, AWS, Docker*

Designed and built a production multi-tenant healthcare platform serving multiple clinics from a single backend, with tenant-isolated data access, JWT + OTP authentication, role/permission-based authorization, real-time appointment booking, Razorpay payments, WhatsApp bot integration, and ABDM (India's national health records) compliance. Deployed to AWS EC2 via automated GitHub Actions CI/CD behind Nginx + HTTPS.

---

## Standard resume entry (recommended)

### Clinic Cloud — Multi-Tenant Healthcare SaaS Backend
*Backend Engineer · TypeScript · NestJS · PostgreSQL · Prisma · Redis · BullMQ · AWS · Docker*

- Architected a **multi-tenant SaaS backend** for healthcare clinics with strict tenant isolation enforced via middleware, header-based tenant resolution (`x-tenant-id`), and per-request authorization to prevent cross-tenant data leakage.
- Built **27+ feature modules** covering clinics, doctors, staff, patients, appointments, schedules, medical records, prescriptions, invoices/billing, payments, attendance, leave, notifications, audit logs, and analytics.
- Integrated **ABDM / ABHA (India's national digital health infrastructure)** — patient creation, scan-and-share consent flows, certificate caching, QR-based bridge services — for regulatory-compliant electronic health records.
- Implemented **real-time appointment booking** with token-number allocation, advance-booking windows, clinic holiday and doctor-leave validation, and Socket.IO live updates.
- Built a **WhatsApp bot** (multi-language) for patient booking, payment reminders, and appointment notifications, backed by **BullMQ** background-job queues on Redis.
- Integrated **Razorpay** payment gateway with webhook handling, invoice generation (pdfmake), and reconciliation.
- Designed a **fine-grained RBAC system** with role + permission decorators and guards (`@Roles`, `@RequirePermissions`, `JwtAuthGuard`, `PermissionsGuard`), plus subscription-feature gating.
- Implemented **S3-backed file uploads** (logos, prescriptions, QR codes, lab reports) with signed URLs, public-served files, and CloudFront integration.
- Set up **automated CI/CD** via GitHub Actions deploying to AWS EC2 with Docker Compose, Nginx reverse proxy, Let's Encrypt HTTPS, and zero-downtime Prisma migrations.
- Wrote a **Prisma data layer** with 80+ models and 39+ migrations covering complex relationships across clinics, users, roles, appointments, payments, ABDM records, and audit trails.

---

## Long version (portfolio / case study)

**Clinic Cloud** is a comprehensive multi-tenant SaaS backend for healthcare clinics in India, built on NestJS 10 with TypeScript. A single backend serves any number of clinics ("tenants"), each with their own staff, doctors, patients, appointments, billing, and compliance records — fully isolated at the data layer.

### Core capabilities

- **Multi-tenancy & security** — Tenant resolution via `x-tenant-id` header (with subdomain fallback), middleware-level clinic existence and active-status validation, per-user clinic-access enforcement to block tenant-ID spoofing, super-admin bypass, and route-level permission guards.
- **Appointments & scheduling** — Doctor schedules (day-of-week recurring), token-based slot allocation, real-time remaining-seats calculation, advance-booking-window enforcement, clinic-holiday detection (one-time / weekly / monthly / yearly recurrence), doctor approved-leave checks, emergency-appointment fast path, bulk create/cancel, reschedule, and Google Meet integration for online consultations.
- **Patient & medical records** — Patient profiles, medical history, prescriptions (with Hindi support), prescription templates, lab reports, X-rays, and scan uploads.
- **Billing & payments** — Invoice generation (pdfmake PDFs uploaded to S3), Razorpay payment links, webhook handling, service-item catalog, subscription billing with monthly resource limits.
- **WhatsApp integration** — A WhatsApp Cloud API bot for patient onboarding, appointment booking, reminders, payment links, and QR-based check-in, with multi-language template support.
- **ABDM / ABHA compliance** — Full integration with India's Ayushman Bharat Digital Mission: HIP bridge services, ABHA patient creation, scan-and-share consent flows, profile QR generation, server-to-server callbacks, and certificate caching.
- **Notifications & real-time** — Socket.IO event gateway, push/email/in-app notifications, appointment reminders via BullMQ scheduled jobs.
- **Observability** — Comprehensive audit logging on sensitive operations, structured logging, health checks via `@nestjs/terminus`.
- **File storage** — S3 with signed URLs (private) and CloudFront/bucket-policy public URLs, organized into typed folders (logos, prescriptions, invoices, lab reports, clinic QR codes, etc.).

### Engineering practices

- **Database** — PostgreSQL with Prisma ORM; 80+ models; 39+ versioned migrations; relational data covering clinics, users, multi-role assignments, schedules, appointments, payments, holidays, leaves, ABDM records, audit logs, and analytics aggregates.
- **Caching** — Redis-backed cache layer for clinic details, permissions, and ABDM certificates, with explicit invalidation on writes.
- **Queues** — BullMQ for WhatsApp messages, PDF generation, appointment reminders, and email sending, with a `@bull-board` admin UI.
- **API design** — RESTful, fully documented with Swagger / `@nestjs/swagger`, including request/response schemas and tenant-header security definitions.
- **DevOps** — Docker Compose stack (NestJS + PostgreSQL + Redis + Nginx), GitHub Actions CI/CD deploying to AWS EC2, Nginx HTTPS reverse proxy with Let's Encrypt, ngrok-based local webhook testing.

### Tech stack

`TypeScript` · `NestJS 10` · `PostgreSQL` · `Prisma ORM` · `Redis` · `BullMQ` · `Socket.IO` · `JWT + Passport` · `Razorpay` · `WhatsApp Cloud API` · `ABDM / ABHA` · `AWS S3` · `AWS EC2` · `CloudFront` · `Docker` · `Nginx` · `GitHub Actions` · `pdfmake` · `Puppeteer` · `Swagger`

---

## Skills demonstrated (for a "Skills" section)

- **Backend architecture** — Multi-tenant SaaS design, modular monolith with bounded contexts, dependency injection, layered services.
- **Security** — Tenant isolation, JWT/OTP auth, RBAC, permission decorators, webhook signature verification, signed URLs.
- **Data modeling** — Complex relational schemas with Prisma, migration management, soft deletes, indexed query optimization.
- **Async & real-time** — Job queues (BullMQ), Socket.IO real-time events, scheduled tasks (`@nestjs/schedule`), webhook handling.
- **Third-party integrations** — Payment gateways (Razorpay), messaging (WhatsApp Cloud API), government APIs (ABDM/ABHA), Google APIs (Meet, Drive).
- **Cloud & DevOps** — AWS (S3, EC2, CloudFront), Docker, Nginx, HTTPS/Let's Encrypt, GitHub Actions CI/CD, ngrok.
- **API & documentation** — REST API design, OpenAPI/Swagger, structured error responses, versioning.

---

## Suggested bullet templates (mix-and-match per resume slot)

> Built a multi-tenant healthcare SaaS backend on NestJS + PostgreSQL serving multiple isolated clinics from a single deployment, with header-based tenant resolution and middleware-enforced access control.

> Integrated India's ABDM (Ayushman Bharat Digital Mission) and ABHA health-record system, including scan-and-share consent flows, patient creation, and HIP bridge services for regulatory compliance.

> Implemented real-time appointment booking with token allocation, holiday/leave validation, and Socket.IO live updates; reduced double-booking incidents to zero in production.

> Built a multi-language WhatsApp bot for patient booking, reminders, and payment links using the WhatsApp Cloud API and BullMQ queues on Redis.

> Designed a fine-grained RBAC system with role-based and permission-based guards across 27+ feature modules, plus subscription-tier feature gating.

> Shipped Dockerized CI/CD to AWS EC2 via GitHub Actions, with Nginx + Let's Encrypt HTTPS and zero-downtime Prisma migrations.

> Integrated Razorpay payments with webhook handling, automatic invoice PDF generation (pdfmake), S3 storage, and reconciliation across clinics.
