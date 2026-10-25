# AI Failure Mode Audit - Exercise 3

Trong quá trình dùng AI sinh code, tôi đã phát hiện và fix 3 lỗi nghiêm trọng (đúng như cảnh báo của Lab).

## 1. Lỗi thiếu AbortController (Memory Leak & Race Condition)
- **Defect Description:** Prompt đầu tiên, AI viết hàm `fetch` trong `useEffect` nhưng dùng cờ boolean `let isMounted = true`. Khi user đổi đội liên tục, các request cũ vẫn chạy ngầm và ghi đè state của request mới. Hơn nữa, khi component unmount, request không bị hủy.
- **Diagnostic Method:** Thử click chuyển đội liên tục (CES -> TE -> GE) rồi bật Network Tab (Fast 3G). Thấy 3 request vẫn pending và dữ liệu bị nhảy loạn xạ.
- **Refactored Solution:** Ép AI dùng `AbortController`. Thêm `return () => controller.abort()` ở cuối `useEffect`. Thêm block `if (err.name === 'AbortError') return;` trong catch.

## 2. Lỗi lạm dụng `window.alert()` (Vi phạm A11y)
- **Defect Description:** Khi giả lập lỗi mất gói tin 35%, AI gọi `window.alert('Network Error')` khiến trình duyệt bị block và không thể dùng bàn phím để focus.
- **Diagnostic Method:** Đọc code thấy `alert()`. Đối chiếu slide "Zero window.alert() Mandate".
- **Refactored Solution:** Xóa `alert()`. Render một `<section role="alert">` chứa thông báo lỗi và nút "Reconnect Satellite (Retry)" bằng React state.

## 3. Lỗi Cleanup Function rỗng
- **Defect Description:** AI khai báo `useEffect(() => {...}, [squadId])` nhưng ở cuối không hề return hàm cleanup.
- **Diagnostic Method:** Kiểm tra bằng mắt, thấy thiếu `return`.
- **Refactored Solution:** Bổ sung `return () => controller.abort();`.