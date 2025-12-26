## 📦 Items Module

The Items module handles inventory management with support for filtering, sorting, pagination, and CRUD operations.

### Key features

- URL-driven filters and pagination
- Column-based sorting with ascending/descending order
- Visual stock status filtering with live counters
- Server-side pagination
- CSV / PDF export
- Add, edit and delete items via modal dialogs

---

### Architecture overview

The module follows a clear separation of concerns:

- **Items.jsx**  
  Page-level component responsible for:
  - synchronizing filters, sorting and pagination with the URL
  - triggering data fetching
  - controlling add/edit modals

- **ItemsList.jsx**  
  Presentational container that renders:
  - filters and stock legend
  - sortable table
  - pagination controls

- **UI components**  
  (`FiltersBar`, `StockLegend`, `StockBadge`)  
  Stateless components focused on rendering and user interaction.

- **Hooks**
  - `useFetchItems` – data fetching and pagination logic
  - `useItemActions` – add, edit and delete operations
  - `useExportItems` – CSV and PDF export

---

### Filtering, sorting and pagination

Filtering, sorting and pagination state is stored in the URL using `useSearchParams`.

Rules:

- changing filters or sorting resets the page to `1`
- pagination does not reset filters
- the view is shareable and refresh-safe

Stock filtering is handled via a visual legend instead of a dropdown to improve usability and readability.

---

### UX considerations

- visual stock status indicators
- live counters per stock status
- predictable pagination behavior
- clear action buttons per row

---

### Status

The Items module is feature-complete and production-ready.
