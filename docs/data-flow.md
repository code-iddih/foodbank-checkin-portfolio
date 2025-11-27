# Data Flow (UI Perspective)

1. **Client check-in**  
   - Language selector → phone + last name → dietary inputs → appointment summary → confirmation.  
   - Each page talks to `client/src/lib/api.ts`, which returns resolved promises populated with sanitized data.

2. **Admin operations**  
   - Dashboard consumes mock `fetchDashboardStats` values to render analytics cards.  
   - CSV upload view draws from `admin/src/lib/csv.ts` (placeholders) for row counts and duplicates.  
   - Client detail and check-in tables display sanitized records with accessible controls.

3. **Security considerations**  
   - No live Supabase keys or backend endpoints are stored in this snapshot.  
   - Data shown in the UI is synthetic and meant for demonstration only.

