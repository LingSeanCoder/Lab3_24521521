# HW2 - Production Studio Piano - WBS

## 1. Functional Slicing
- **Slice A:** Algorithmic Key Gen (`pianoKeys.js`) - Generate 88 keys mathematically, strictly no hardcoding.
- **Slice B:** Audio Engine (`PolyphonicSynth.js`) - Web Audio API handling, 8-voice polyphony, FIFO steal.
- **Slice C:** Memoized UI (`Piano.jsx`, `PianoKey.jsx`) - Render keys, optimize re-renders using `React.memo`.
- **Slice D:** Sequencer (`Piano.jsx`) - Record and replay with variable speeds, cancelable via `AbortController`.

## 2. Contract-First Specification
| Constraint | Technical Requirement |
|---|---|
| **Math Generation** | No hardcoded HTML. Use a loop from MIDI 21 (A0) to 108 (C8). Frequency formula: `f = 440 * 2^((midi - 69) / 12)`. |
| **FIFO Steal** | Store active voices in an ES6 `Map`. When size >= 8, retrieve `keys().next().value` (oldest) to release. |
| **Render Isolation** | Wrap `PianoKey` in `React.memo()`. Event handlers `onNoteOn/Off` must be wrapped in `useCallback` to maintain stable references. |
| **Audio Hygiene** | Prevent click/pop by using `exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)` before calling `osc.stop()`. |
| **Abort** | Use `AbortController` to cancel all `setTimeout` instances in the replay sequence when the user clicks Stop or on component unmount. |

## 3. Atomic Generation Plan
| Commit | Message |
|---|---|
| 1 | `feat(hw2): implement algorithmic 88-key generation` |
| 2 | `feat(hw2): build polyphonic synth engine with fifo stealing` |
| 3 | `feat(hw2): build memoized piano ui and keyboard bindings` |
| 4 | `feat(hw2): add fifo recording and variable-speed replay` |