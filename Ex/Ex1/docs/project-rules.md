# Project Rules - Web Application Development (React 19 + Vite)

## 1. Security & Performance
- **Zero Div-Soup:** Cấm sử dụng thẻ `<div>` để bọc layout. Bắt buộc dùng Semantic HTML (`<article>`, `<header>`, `<hgroup>`, `<dl>`, `<dt>`, `<dd>`, `<ul>`, `<li>`).
- **HTTPS Only:** Mọi tài nguyên external (ảnh, API) phải dùng `https://`. Cấm `http://`.
- **Zero CLS (Cumulative Layout Shift):** Thẻ `<img>` bắt buộc phải có `width`, `height` và `alt`.

## 2. Coding Conventions
- **Styling:** Cấm dùng inline style (`style={{...}}`). Bắt buộc dùng **CSS Modules** (`*.module.css`).
- **DOM:** Cấm dùng `dangerouslySetInnerHTML`. React tự động handle XSS qua JSX.
- **Syntax:** Dùng `const`/`let`. CẤM `var`.
- **Event Handling:** Nếu có event, dùng cú pháp camelCase của React (VD: `onClick`, `onKeyDown`). Cấm `onclick`, `onkeydown`.

## 3. Git & Version Control
- **Atomic Commits:** Cấm gộp code tính năng và code style vào chung 1 commit.
- Commit 1: Chỉ chứa logic JSX/JS.
- Commit 2: Chỉ chứa file CSS.