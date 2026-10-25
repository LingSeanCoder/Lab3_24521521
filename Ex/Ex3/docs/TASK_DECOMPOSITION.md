# Ex3 - KRAFTON PUBG VN Series Live Telemetry - WBS

## 1. Functional Slicing
- Slice A: Core State Machine & API Simulation (IDLE, LOADING, SUCCESS, ERROR).
- Slice B: Race Condition Guard (AbortController + Cleanup).
- Slice C: UI Views (Skeleton Radar, Alert Error, Data Card).

## 2. Contract-First Specification
- **Data:** Mảng `PUBG_VN_SQUADS` (3 đội: CES, TE, GE).
- **State Machine:** Chỉ dùng object `view` với `status` (IDLE/LOADING/SUCCESS/ERROR) và `data/error`. Cấm dùng boolean flag.
- **AbortController:** Bắt buộc dùng `AbortController` trong `useEffect`. Hàm cleanup phải gọi `controller.abort()`. Bắt lỗi `err.name === 'AbortError'` để return sớm.
- **Error Boundary:** Cấm dùng `window.alert()`. Phải dùng `<section role="alert">` kèm nút Retry.
- **Skeleton:** Dùng CSS thuần, khung xương 220px phát sáng màu xanh Blue-Zone.

## 3. Atomic Generation Plan (2 Commits bắt buộc)
| Commit | Message |
|---|---|
| 1 | `feat(ex3): implement PUBG VN 4-state telemetry & AbortController` |
| 2 | `feat(ex3): add skeleton UI & retry alert` |