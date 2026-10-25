# Exercise 1: Semantic Engineer & Pro-Gamer Profile Card

## Setup Instructions
1. Khởi tạo dự án React 19 + Vite.
2. Cài đặt dependencies: `npm install`
3. Chạy dev server: `npm run dev`

## Verification Checklist (Checkpoint 1)
Chạy các lệnh sau trong terminal để đảm bảo pass audit:

1. **Zero `<div>` soup check:**
   `grep -n '<div' src/components/DeveloperCard.jsx`
   *Kết quả mong đợi: 0 matches (Empty!)*

2. **HTTPS-only media origins check:**
   `grep -n 'http://' src/components/DeveloperCard.jsx`
   *Kết quả mong đợi: 0 matches*

3. **Chrome DevTools Inspection:**
   - Accessibility Tree: `article -> header -> dl -> list`
   - Device Toolbar: iPhone SE (375px) -> Không có horizontal scroll.