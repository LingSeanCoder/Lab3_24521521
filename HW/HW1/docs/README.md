# Production Studio Drum Kit

Chào mừng bạn đến với **Production Studio Drum Kit** (HW1). Đây là một dự án Web Application được xây dựng nhằm mô phỏng một bộ trống điện tử trên trình duyệt.

Dự án được nâng cấp từ bài Lab 1 lên chuẩn "Production Studio" với **React 19** và **Vite**, tuân thủ các tiêu chuẩn khắt khe về hiệu năng và khả năng tiếp cận (WCAG 2.2 AA). 

## Tính năng nổi bật
- **Đánh trống bằng bàn phím:** Sử dụng các phím `W`, `A`, `S`, `D`, `J`, `K`, `L`. Hỗ trợ bộ gõ tiếng Việt (nhờ xử lý `e.code`).
- **Âm thanh tổng hợp:** Sử dụng Web Audio API tích hợp sẵn, không cần tải file media bên ngoài.
- **Visual Decibel Meter:** Thanh đo cường độ âm thanh trực quan bằng CSS.
- **Visual Hit Log:** Lịch sử gõ phím hiển thị rõ ràng, hỗ trợ Screen Readers (`aria-live`).
- **Zero Div-Soup:** Cấu trúc DOM ngữ nghĩa hoàn toàn (không sử dụng `<div>` cho layout).

## Hướng dẫn cài đặt và chạy

1. Cài đặt các dependencies:
```bash
npm install