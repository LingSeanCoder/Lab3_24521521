# AI Failure Audit - HW3 PUBG VN Arena

Dưới đây là 3 lỗi nghiêm trọng mà AI thường sinh ra khi code bài toán Timer và Optimistic UI.

## Failure 1: Timer Drift (Đồng hồ bị trôi)
- **Defect:** AI thường dùng `setInterval` để trừ lùi giá trị (`setLeft(s => s - 1)`). Khi tab bị ẩn, trình duyệt bóp nghẹt timer xuống 1 lần/phút. Khi quay lại tab, đồng hồ bị chậm hàng phút so với thực tế.
- **Diagnostic:** Chuyển sang tab khác 10 giây, sau đó quay lại. Nếu đồng hồ trên UI chỉ giảm 1-2 giây thay vì 10 giây -> Dính lỗi drift.
- **Fix:** Loại bỏ hoàn toàn việc trừ lùi. Tính toán lại `remainingMs = Math.max(0, targetEpochMs - Date.now())`. Lắng nghe `visibilitychange` để gọi hàm tính toán lại ngay khi tab được active.

## Failure 2: Missing Optimistic Lock (Spam Click)
- **Defect:** AI thường không disable nút mua hàng khi API đang xử lý. Nếu người dùng click đúp (double-click) hoặc mạng chậm, hàng loạt request sẽ được gửi đi, gây ra lỗi trừ kho âm (race condition).
- **Diagnostic:** Mở Network Tab, bấm nút mua hàng liên tục thật nhanh. Nếu thấy hàng loạt request giống hệt nhau được bắn ra -> Dính lỗi.
- **Fix:** Thêm state `isClaiming`. Set `isClaiming = true` trước khi gọi API, và `false` trong block `finally`. Nút bấm phải có thuộc tính `disabled={isClaiming}`.

## Failure 3: Missing Rollback on 409 Conflict (Desync UI)
- **Defect:** AI thường viết code giảm stock ngay lập tức (Optimistic Update) nhưng quên xử lý trường hợp API trả về lỗi. Nếu server báo lỗi 409 (hết hàng), UI vẫn hiển thị số stock đã bị trừ, gây sai lệch dữ liệu.
- **Diagnostic:** Dùng Network Tab chặn request, hoặc giả lập API trả về lỗi 409. Bấm mua hàng, thấy UI vẫn báo "Hết hàng" nhưng Console có lỗi đỏ.
- **Fix:** Lưu lại giá trị stock trước khi trừ. Bọc lời gọi API trong `try/catch`. Nếu kết quả trả về lỗi 409, gọi `setStock(previousStock)` để rollback giao diện về trạng thái đúng.