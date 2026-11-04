# Project Rules - Production Studio Piano (HW2)

The project strictly adheres to performance, audio, and React architecture rules to ensure a smooth experience for the 88-key interface.

## 1. Tech Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Audio Engine:** Web Audio API (OscillatorNode, GainNode)

## 2. Audio & Performance Rules
- **Polyphony & FIFO:** Maximum 8 voices concurrently. Use ES6 `Map` for storage. When the 9th note is triggered, the oldest note must be evicted (First-In-First-Out).
- **Audio Hygiene:** Strictly prohibited to call `osc.stop()` immediately upon key release. Must use ADSR Ramp (`exponentialRampToValueAtTime` down to `0.0001` over 40ms) to eliminate Click/Pop artifacts.
- **Render Isolation (Critical):** Re-rendering all 88 keys when a single key is pressed is forbidden.
  - `PianoKey` must be wrapped in `React.memo`.
  - Event handlers (`handleNoteOn`, `handleNoteOff`) must be wrapped in `useCallback` and must not depend on rapidly changing state (use `useRef` if state needs to be read).

## 3. DOM & Architecture Rules
- **Zero Div-Soup:** Do not use `<div>` for main layout. Use semantic tags like `<main>`, `<section>`, `<header>`, `<button>`.
- **A11y:** Piano keys must have `aria-pressed` and `aria-label` to support Screen Readers.