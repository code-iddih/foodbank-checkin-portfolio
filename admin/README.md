# Admin Dashboard

## Purpose

Demonstrates the staff-facing cockpit built with React + Chakra UI, showcasing analytics, CSV workflows, and client detail views without surfacing proprietary backend logic.

## Responsibilities

- Render dashboards, CSV uploads, check-in lists, and client detail panels.
- Compose reusable layout components (`AdminLayout`, `Sidebar`, `ProtectedRoute`) to keep navigation consistent.
- Display mock data helpers instead of live API responses so the snapshot remains frontend-only.

## Key Files

- `src/pages/DashboardPage.tsx` – analytics cards, help requests, and recent check-in transforms.
- `src/pages/CSVUploadPage.tsx` – upload panel with sanitized statistics and controls.
- `src/pages/CheckInsPage.tsx` – mock check-in feed with status badges.
- `src/pages/ClientDetailPage.tsx` – client profile summary, special requests, and ticket actions.
- `src/lib/api.ts` – mocked fetch helper that resolves dashboard stats.
- `src/lib/supabase.ts` – placeholder for auth helpers so no live Supabase connection is needed.

## Usage Summary

Pages are mounted under React Router within `src/main.tsx` and rely on shared layout/navigation components to provide a cohesive admin UX. The snapshot uses mock helpers for API calls so the UI remains fully demoable.

## Design Notes

- Layout components enforce spacing and consistent headers/sidebar structure.
- Dashboard cards use static helpers so they can be reviewed without backend state.
- CSV upload and client detail views demonstrate how staff workflows are grouped without exposing server logic.
