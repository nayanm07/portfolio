# GORec — AI-Powered Recruitment Mobile App

> Cross-platform React Native app that lets recruiters source, screen, and shortlist
> candidates through a conversational AI assistant — including hands-free voice
> commands that turn spoken job descriptions into structured search queries.

---

## Resume Bullet Points (copy-paste ready)

- Built a cross-platform **React Native (0.85 / React 19)** recruitment app in **TypeScript**, enabling recruiters to source and shortlist candidates via a conversational AI chat interface.
- Implemented a **real-time WebSocket chat pipeline** for streaming AI sourcing results (job recommendations and candidate cards), with auto-reconnect and token-based authentication.
- Developed a **voice-to-job feature** using audio recording + speech-to-text (Deepgram) that transcribes a recruiter's spoken brief and calls an AI endpoint to extract structured job criteria (role, skills, experience, budget, location, notice period).
- Engineered **passwordless phone + OTP authentication** with Android SMS auto-retrieval and phone-number hints for a frictionless login flow.
- Architected app state with **Redux Toolkit, RTK Query, and redux-persist**, including typed API services for auth, chat history, shortlist decisions, and candidate details.
- Added **shortlist management and one-tap Excel export** of candidate decisions for downstream recruiter workflows.
- Built a reusable component library (custom inputs, bottom sheets, modals, OTP fields, headers) with **theming** and **i18n localization (English / Hindi)**.
- Integrated **Firebase Cloud Messaging + Notifee** for push notifications and **react-native-keyboard-controller / reanimated** for a polished chat UX.

---

## Project Overview

**GORec** is a mobile application built for recruiters to streamline candidate
sourcing. Instead of filling out search forms, a recruiter chats with (or speaks
to) an AI assistant which sources matching candidates, presents them as
interactive cards, and lets the recruiter shortlist and export their picks.

## Key Features

| Feature | Description |
| --- | --- |
| **Conversational sourcing** | Chat-driven interface where recruiters describe roles and receive AI-sourced candidates in real time. |
| **Voice commands** | Record a spoken job brief → transcribe → extract structured job criteria automatically. |
| **Real-time results** | WebSocket streaming of job recommendations and candidate cards with reconnect handling. |
| **Shortlisting** | Accept/reject candidate decisions, view detailed candidate profiles. |
| **Excel export** | Export shortlist decisions to a spreadsheet for offline review and sharing. |
| **Phone + OTP auth** | Passwordless login with SMS retrieval and number hints on Android. |
| **Localization & theming** | English/Hindi translations and centralized theme management. |

## Tech Stack

- **Framework:** React Native 0.85, React 19, TypeScript
- **State:** Redux Toolkit, RTK Query, redux-persist, redux-logger
- **Navigation:** React Navigation (native stack + bottom tabs)
- **Real-time:** Native WebSocket + socket.io-client
- **Audio / AI:** react-native-audio-recorder-player, Deepgram transcription, AI voice-command extraction API
- **Auth:** Phone OTP, SMS retriever, Android phone-number hint
- **UI/UX:** Reanimated, Gesture Handler, Keyboard Controller, Bottom Sheet, Linear Gradient, SVG, Fast Image
- **Notifications:** Firebase Messaging, Notifee
- **Forms & i18n:** react-hook-form, i18next / react-i18next
- **Files:** Document picker, image crop picker, blob-util, S3 pre-signed uploads

## Architecture Highlights

- **Feature-organized `src/`** — `container/` (screens), `components/` (reusable UI), `rtkServices/` (typed API layer), `socket/` (WS client), `store/` (Redux slices), `utils/`, `translation/`.
- **Typed API services** for auth, chat, and shortlist endpoints via RTK Query.
- **Centralized WebSocket client** with shared handlers, auto-reconnect, and auth-token injection.
- **Path aliases** (`@components`, `@rtkServices`, `@utils`, etc.) for clean imports.

---

## My Role & Contributions

> _Customize this section with your specific contributions before adding to your resume._

- Implemented the real-time chat screen and WebSocket integration.
- Built the voice-command transcription and job-extraction flow.
- Developed the phone/OTP authentication screens and SMS auto-retrieval.
- Created reusable UI components and the shortlist/Excel-export feature.
