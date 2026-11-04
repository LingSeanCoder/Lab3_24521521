# 88-Key Polyphonic Piano & Concurrent FIFO Sequencer

Welcome to **HW2**, an 88-key electronic Piano project built on top of the Web Audio API.

## 🌟 Key Features
- **Polyphony:** Play up to 8 concurrent notes with automatic FIFO Voice Stealing to prevent clipping.
- **Algorithmic Key Generation:** Dynamically generates 88 keys from MIDI 21 (A0) to 108 (C8) without hardcoding 88 HTML tags.
- **Render Optimization:** Utilizes `React.memo` and `useCallback` for isolated rendering. Pressing one key only re-renders that specific key, preventing UI lag.
- **Sequencer:** Record and Replay functionality with variable speeds (0.5x, 1.0x, 2.0x). Supports mid-sequence cancellation via `AbortController`.
- **Click-Free Envelope:** Implements ADSR (Attack-Decay-Sustain-Release) using `exponentialRampToValueAtTime` to ensure smooth audio transitions.

## 🛠️ Technology Stack
- React 19
- Vite
- Web Audio API