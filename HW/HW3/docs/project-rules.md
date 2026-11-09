# Project Rules - PUBG VN Esports Platform (HW3)

Dự án yêu cầu sự chính xác tuyệt đối về mặt thời gian và đồng bộ trạng thái UI/Server.

## 1. Tech Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript (Sử dụng strict mode, cấm dùng `var`).

## 2. Rule State (Quản lý trạng thái)
- **Optimistic Lock:** Bất kỳ hành động nào gọi API (mua vé, mở crate) đều phải có state khóa (vd: `isClaiming`). Nút bấm phải bị `disabled` trong lúc API đang xử lý để chống spam click.
- **Rollback:** Khi thực hiện Optimistic Update (giảm stock ngay trên UI), bắt buộc phải lưu lại trạng thái cũ. Nếu API trả về lỗi (ví dụ: `409 Looted Out`), phải `setState` trả lại số stock cũ.

## 3. Rule Time & Render
- **Zero-Drift Timer:** Nghiêm cấm sử dụng `setInterval` để trừ lùi giá trị (`s - 1`). Thời gian phải luôn được tính toán lại từ mốc tuyệt đối: `Date.now()`.
- **Visibility Resync:** Trình duyệt sẽ bóp nghẹt `setInterval` ở background tab. Bắt buộc phải dùng `document.addEventListener('visibilitychange', ...)` để cập nhật lại thời gian ngay khi người dùng quay lại tab.
- **DOM Rules:** Zero Div-Soup. Sử dụng Semantic Tags.