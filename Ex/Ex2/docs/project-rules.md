# Project Rules - Ex2

## 1. Stack Constraints
- React 19, Vite.
- Không dùng CSS inline cho layout phức tạp, khuyến khích dùng CSS Module (tạo file `ScientistDirectory.module.css`).
- Cấm thẻ `<div>` (Zero Div-Soup). Chỉ dùng semantic tags: `<section>`, `<form>`, `<ul>`, `<li>`, `<output>`.

## 2. State Rules
- **Cấm dùng `useEffect`** để update danh sách hiển thị.
- Derived state phải được tính trực tiếp trong thân hàm component: `const visible = people.filter(...).toSorted(...)`.

## 3. A11y Rules
- Dùng hook `useId()` của React để tạo id duy nhất cho form input.
- Trạng thái đếm số lượng phải dùng: `<output role="status" aria-live="polite">`.