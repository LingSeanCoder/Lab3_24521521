# Ex2 - Interactive Scientist Directory - WBS

## 1. Functional Slicing
- Slice A: Data & State (SMART_PEOPLE array + useState)
- Slice B: Derived Pipeline (Search, IQ Filter, toSorted)
- Slice C: Actions & A11y (Delete, Reset, Live Status)

## 2. Contract-First Specification
- **Zero useEffect:** Tuyệt đối không dùng useEffect cho việc filter/sort. Mọi thứ phải là derived state tính trực tiếp khi render.
- **A11y:** Input phải dùng `useId()` cho label `htmlFor` + `id`. Kết quả đếm dùng `<output role="status" aria-live="polite">`.
- **Data:** Mảng gồm 7 người, người thứ 7 là `{ id: 'sp-7', name: 'Nguyễn Đình Sang', age: 20, iq: 150 }`.
- **Toán tử:** Dùng `.toSorted()` (ES2023) thay vì `.sort()`.
- **Type-safe:** Dùng `e.target.valueAsNumber` cho input số Min IQ.

## 3. Atomic Generation Plan (3 Commits)
| Commit | Message |
|---|---|
| 1 | `feat(ex2): normalize smartPeople schema with stable IDs` |
| 2 | `feat(ex2): add search, IQ filter & toSorted` |
| 3 | `feat(ex2): add delete/reset & live status` |