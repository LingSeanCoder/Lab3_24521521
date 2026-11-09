# PUBG VN Esports Platform

Chào mừng bạn đến với **PUBG VN Esports Platform** (HW3). Đây là ứng dụng web mô phỏng hệ thống săn vé và theo dõi giải đấu KRAFTON x PUBG Vietnam Championship.

## 🌟 Tính năng nổi bật
- **Zero-Drift Countdown:** Đồng hồ đếm ngược mở bán Airdrop Crate và VIP Pass. Sử dụng mốc thời gian tuyệt đối (Epoch) kết hợp API `visibilitychange`, đảm bảo đồng hồ không bao giờ bị trễ kể cả khi người dùng chuyển tab.
- **Optimistic UI & Rollback:** Trải nghiệm mua hàng mượt mà. Hệ thống trừ tồn kho ngay lập tức trên UI để giảm độ trễ. Nếu server báo lỗi hết hàng (409 Conflict), giao diện sẽ tự động rollback (hoàn lại) số lượng ban đầu.
- **Live Leaderboard:** Bảng xếp hạng các đội tuyển hàng đầu Việt Nam (The Expendables, Cerberus, v.v.). Hỗ trợ tìm kiếm và sắp xếp thông minh.
- **Accessibility & Performance:** Giao diện xây dựng bằng Semantic HTML, loại bỏ hoàn toàn "Div-Soup", tối ưu cho Screen Reader.

## 🛠️ Công nghệ sử dụng
- React 19
- Vite
- TypeScript