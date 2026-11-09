# HW3 - KRAFTON x PUBG Vietnam Championship - WBS

## 1. Functional Slicing
- **Slice A:** Timer Hook (`usePubgAirdropTimer`) - Quản lý thời gian đếm ngược chống trôi (anti-drift) và đồng bộ khi tab wake up.
- **Slice B:** Optimistic Claim (`AirdropCrate`) - Xử lý UI mua vật phẩm, cơ chế Optimistic Lock và Rollback khi có lỗi 409.
- **Slice C:** Leaderboard UI (`Leaderboard`) - Bảng xếp hạng đội tuyển, hỗ trợ lọc và sắp xếp theo WWCD, Placement, Kills.
- **Slice D:** Types & Data (`pubg.ts`) - Định nghĩa TypeScript interface và mock data cho Crate và Squad.

## 2. Contract-First Specification
| Ràng buộc | Yêu cầu kỹ thuật |
|---|---|
| **Anti-Drift Timer** | Cấm dùng `setInterval(s => s - 1)`. Bắt buộc dùng `Math.max(0, targetEpochMs - Date.now())`. Lắng nghe sự kiện `visibilitychange` để resync thời gian ngay khi tab được active lại. |
| **Optimistic Lock** | Trước khi gọi API, phải set state `isClaiming = true` để disable nút bấm, chặn user double-click gây trừ kho âm hoặc gửi request trùng lặp. |
| **Rollback 409** | Giảm tồn kho (stock) ngay lập tức trên UI. Nếu API giả lập trả về lỗi `409 Conflict (Looted Out)`, phải khôi phục (rollback) lại số lượng stock cũ và hiển thị thông báo lỗi. |
| **Semantic HTML** | Nghiêm cấm sử dụng thẻ `<div>` bao ngoài cho layout (Zero Div-Soup). Dùng `<main>`, `<section>`, `<article>`, `<table>`. Cấm dùng `var`. |

## 3. Atomic Generation Plan
| Commit | Message |
|---|---|
| 1 | `feat(hw3): add pubg domain types and mock data` |
| 2 | `feat(hw3): implement zero-drift airdrop countdown hook` |
| 3 | `feat(hw3): build leaderboard with kill-feed filter` |
| 4 | `feat(hw3): implement optimistic claim with 409 rollback` |