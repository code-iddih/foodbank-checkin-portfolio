# Client Check-In Application

## Purpose
Hosts the multilingual, five-step client check-in experience with accessible Chakra UI layouts.

## Responsibilities
- Deliver language selection, verification, dietary request capture, appointment review, and confirmation screens.
- Reuse shared layout components (`PageLayout`, `ProgressSteps`, `PrimaryButton`) to keep spacing and progression consistent.
- Consume mock API helpers so the UI remains interactive without real backend calls.

## Key Files
- `src/pages/Landing.tsx` – welcome screen with language picker header.
- `src/pages/InitialCheckIn.tsx` – phone + last-name form with formatted inputs.
- `src/pages/SpecialRequests.tsx` – dietary checkbox groups and free-text notes.
- `src/pages/AppointmentDetails.tsx` – appointment preview before confirmation.
- `src/pages/Confirmation.tsx` – completion state with next visit messaging.
- `src/lib/api.ts` – mocked appointment helper returning sanitized data.
- `src/lib/supabase.ts` – stub that keeps proprietary auth logic out of this snapshot.

## Usage Summary
These pages are mounted via React Router in `src/main.tsx`. They rely on shared layout helpers and mock services (`src/lib/api.ts`) to represent the user experience without any backend implementation.

## Design Notes
- Layout components enforce uniform width, padding, and typography across every step.
- `ProgressSteps` keeps the current step highlighted so clients always know where they are in the flow.
- Mock helpers are explicit to emphasize that this is a UI-only portfolio snapshot; no backend logic is exposed within this directory.
