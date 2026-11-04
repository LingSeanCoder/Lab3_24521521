# Project Rules - Production Studio Drum Kit

Dự án tuân thủ nghiêm ngặt các quy tắc kỹ thuật sau để đảm bảo tính ổn định, hiệu năng và khả năng tiếp cận (A11y).

## 1. Tech Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Ngôn ngữ:** JavaScript (ES6+)

## 2. Event & Performance Rules
- **Physical Key Codes:** Tuyệt đối sử dụng `e.code` (VD: `'KeyW'`, `'KeyA'`) thay vì `e.key`. Điều này đảm bảo phím tắt hoạt động chính xác bất kể người dùng đang bật bộ gõ tiếng Việt (UniKey/Telex) hay đổi layout bàn phím (AZERTY).
- **Anti-Repeat Guard:** Bắt buộc phải có `if (e.repeat) return;` ở đầu hàm xử lý `keydown` để ngăn chặn tính năng auto-repeat của Hệ điều hành làm spam âm thanh.
- **Input Focus Isolation:** Không kích hoạt âm thanh nếu người dùng đang tương tác với form. Kiểm tra thông qua `['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)`.

## 3. Accessibility (A11y) & DOM Rules
- **Zero Div-Soup:** Nghiêm cấm sử dụng thẻ `<div>` làm layout chính. Bắt buộc sử dụng các thẻ HTML ngữ nghĩa như `<main>`, `<header>`, `<section>`, `<output>`.
- **Pad Controls:** Mỗi phím đàn phải được render bằng thẻ `<button>` (để có sẵn keyboard navigation). Bắt buộc có thuộc tính `aria-pressed={isActive}` để thông báo trạng thái bấm cho Screen Reader.
- **Live Region:** Mọi thông báo trạng thái (như lịch sử gõ phím - Hit Log) phải nằm trong thẻ `<output aria-live="polite">` để hỗ trợ người dùng khiếm thính/trình đọc màn hình.