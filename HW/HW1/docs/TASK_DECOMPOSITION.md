# HW1 - Production Studio Drum Kit - WBS

## 1. Functional Slicing
- **Slice A:** Keyboard Hook Logic (`useDrumKeyboard.js`)
- **Slice B:** Drum UI & Hit Log (`DrumKit.jsx`)
- **Slice C:** Styling & Decibel Meter (`DrumKit.css`)

## 2. Contract-First Specification
| Constraint | Requirement |
|---|---|
| **Physical Key Codes** | Bắt buộc dùng `e.code` (`KeyW`, `KeyA`...) thay vì `e.key` để tránh lỗi bộ gõ (UniKey). |
| **Anti-Repeat Guard** | Chặn spam phím bằng `if (e.repeat) return;`. |
| **Input Focus Isolation** | Bỏ qua phím tắt nếu user đang gõ trong `<input>`, `<textarea>`, `<select>` (qua `e.target.tagName`). |
| **A11y (WCAG 2.2 AA)** | Pad dùng `<button aria-pressed={isActive}>`. Hit log bọc trong `<output aria-live="polite">`. |
| **Zero Div-Soup** | Tuyệt đối không dùng thẻ `<div>` cho layout chính, chỉ dùng semantic tags (`<main>`, `<section>`, `<header>`, `<output>`). |

## 3. Atomic Generation Plan
| Commit | Message |
|---|---|
| 1 | `feat(hw1): add useDrumKeyboard hook with focus isolation` |
| 2 | `feat(hw1): build accessible drum pads with visual hit log` |
| 3 | `style(hw1): style pads and decibel meter` |