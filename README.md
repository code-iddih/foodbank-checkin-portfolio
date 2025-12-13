# 🍎 Foodbank Check-In & Appointment System (Portfolio Snapshot)

> UI + architecture snapshot of a multilingual client check-in experience and its admin cockpit. Backend services, scheduling logic, and proprietary workflows have been excluded; this directory is for portfolio review only.

🌐 **Live Client Preview:** [https://foodbank-checkin-tan.vercel.app/](https://foodbank-checkin-tan.vercel.app/)  
📊 **Live Admin Preview:** [https://foodbank-checkin.vercel.app/login](https://foodbank-checkin.vercel.app/login)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-5B70FF?logo=chakraui&logoColor=white)](https://chakra-ui.com/)
[![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Proprietary](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

## 📸 Product Screenshots

### Client Check-In Flow
<img src="assets/client-landing.png" width="800" />
<img src="assets/client-mobilecheckin.png" width="400" />

### Admin Dashboard
<img src="assets/admin-login.png" width="800" />
<img src="assets/admin-dailyoperations.png" width="800" />
<img src="assets/admin-recent-check-ins.png" width="800" />
<img src="assets/admin-csv-upload.png" width="800" />
<img src="assets/admin-supportpage.png" width="800" />


## Structure

- `client/` — React/TypeScript client flow, accessible layouts, and mock API helpers (`src/lib/api.ts`, `src/lib/supabase.ts`).
- `admin/` — Dashboard, CSV upload, check-in tables, and client detail UIs backed by static data helpers.
- `docs/` — Architecture overview, UI-focused data flow, and sanitized sample CSV format.
- `assets/` — Screenshot exports referenced throughout this README.

## Highlights

- **Client experience:** Language picker, verification, dietary requests, appointment review, and confirmation with shared layout components.
- **Admin cockpit:** Analytics cards, check-in review table, CSV upload summary, and client detail panels built with Chakra UI.
- **Mock integration helpers:** API modules return resolved promises so the UI runs as a static demo.
- **Documentation:** README + docs reinforce the UI scope and explicitly state that backend logic is omitted.

## Live Demo Notes

1. **Client preview:** Navigate to the live URL above to replay the same five-stage check-in flow shown here.
2. **Admin access:** Log into the live admin cockpit using the demo credentials:  
   - Email: `admin@example.com`  
   - Password: `testing123`
3. **CSV upload:** Use the “Download Sample CSV” button on the CSV Upload page to create today’s data file and upload it. The dashboard then reflects sanitized counts without exposing any proprietary CSV parser.

## Screenshots

- `assets/client-landing.png` — Client landing screen with language selector.  
- `assets/admin-dashboard-analytics.png` — Admin analytics overview.  
- `assets/admin-csv-upload.png` — CSV upload status panel.  
- `assets/admin-check-ins-page.png` — Check-ins table with statuses.

Add exported screenshots into `assets/` before publishing so the visuals render properly.

## Privacy & IP Disclaimer

This portfolio snapshot contains only UI components, mock helpers, and architectural notes. Backend controllers, scheduling algorithms, Supabase schemas, and proprietary services remain the property of Lindsey Stead / Lifesaver Technology Services and are not included here.
