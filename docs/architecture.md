# Architecture Overview

1. **Client (React + Chakra + TypeScript)**  
   - Five check-in pages share `PageLayout`, `ProgressSteps`, and theme settings to guarantee consistent spacing, typography, and accessibility.  
   - Mocked API helpers illustrate the expected payloads without revealing backend services.

2. **Admin cockpit (React + Chakra)**  
   - Dashboard, CSV upload, and client detail views demonstrate how staff workflows could appear, using sanitized data cards and placeholders.  
   - Layout components keep controls grouped while still being easy to extend.

3. **Backend (omitted)**  
   - Controllers, services, and business logic are intentionally excluded. Refer to documentation for abstracted responsibilities.

