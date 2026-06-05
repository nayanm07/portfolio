# Resume Blurb — Open API for Batch Calling

> Ready-to-use summary of this project for a CV / resume / LinkedIn.
> Pick the format that fits. Verify all numbers before using.

---

## Resume Bullet Points (concise — recommended)

**Backend Developer — Edysor Voice (Open API for Batch Calling)**

- Designed and built an **external-facing REST API** (similar to ElevenLabs) enabling third-party
  developers to trigger and monitor AI voice-calling campaigns programmatically via API keys —
  **23+ endpoints** across agents, campaigns, conversations, scheduled calls, and billing.
- Architected the API as a **thin wrapper** over the existing campaign pipeline, reusing
  `voice_campaigns` tables instead of new infrastructure — cutting development time and avoiding
  duplicate code.
- Implemented **API-key authentication** (generation, validation, revocation) with a gateway-level
  middleware across a **microservices architecture** (API Gateway, User, Call, Agent, Telephony
  services).
- Built **Scheduled Calls** feature end-to-end (migration, repository, service, controller, routes)
  supporting create/list/update/cancel/delete with timezone-aware dispatch.
- Maintained **backward-compatible response shapes** so existing SaaS clients integrated without
  breaking changes; delivered a **Postman collection** for external developer onboarding.

---

## One-line version (for a summary / header)

> Built an external REST API (API-key auth, 23+ endpoints) for programmatic AI voice-calling
> campaigns on a Node.js/TypeScript microservices backend, reusing the existing campaign pipeline
> as a thin wrapper.

---

## Skills / Tech to list

`Node.js` · `TypeScript` · `Fastify` · `Microservices` · `REST API design` ·
`API-key authentication` · `API Gateway` · `MySQL` · `Knex migrations` · `Webhooks` · `Postman`

---

## Notes before using

- **Verify the endpoint count.** Counted as 17 Open API + 6 Scheduled Calls = 23. Confirm from
  [openapi.routes.ts](packages/call-service/src/routes/openapi.routes.ts) before quoting.
- **Don't invent metrics** (e.g. "X% faster") unless actually measured — they get challenged in
  interviews.
- Full technical detail lives in [OPENAPI-PROJECT-SUMMARY.md](OPENAPI-PROJECT-SUMMARY.md).
