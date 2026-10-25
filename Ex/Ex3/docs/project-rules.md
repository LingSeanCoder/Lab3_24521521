# Project Rules - Ex3

## 1. Async Data Fetching
- Mọi fetch API phải dùng `AbortController`.
- `useEffect` bắt buộc phải return hàm cleanup: `return () => controller.abort();`.
- Bỏ qua lỗi `AbortError` (không hiển thị lỗi này ra UI).
- Dùng `try/catch` thay vì `.then().catch()`.

## 2. UI/UX & A11y
- Cấm dùng `window.alert()` (theo slide 19).
- Trạng thái lỗi hiển thị qua `<section role="alert">` + nút Retry.
- Skeleton loader phải có `aria-busy="true"` và chiều cao cố định 220px.