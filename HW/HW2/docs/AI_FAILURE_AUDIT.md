# AI Failure Audit - HW2 Piano

Below are 3 common defects AI (like ChatGPT/Copilot) frequently introduces when generating code for an 88-key Piano project, and how an engineer resolves them.

## Failure 1: Hardcoding 88 Piano Keys (Code Bloat)
- **Defect Description:** AI tends to generate hundreds of `<button>` or `<div>` tags manually in the JSX file. This violates the DRY principle, bloats the file to thousands of lines, and violates the algorithmic generation requirement.
- **Diagnostic Method:** Look at the Component file length (excessively long) or review the code and notice the absence of a `for/while` loop from MIDI 21 to 108.
- **Refactored Solution:** Use a loop from 21 to 108, calculate `isBlack` based on `midi % 12`, and render the array dynamically via `.map()`.

## Failure 2: Re-rendering All 88 Keys (Missing Memoization)
- **Defect Description:** When a user presses a single key, the parent component's state changes. Without `React.memo`, all 88 child components re-render, causing frame drops. Additionally, AI often passes inline arrow functions `onClick={() => play(midi)}` to children, which completely defeats the purpose of `React.memo`.
- **Diagnostic Method:** Open **React DevTools Profiler**, enable "Highlight updates when components render". Press one key; if all 88 keys flash an outline, the defect is present.
- **Refactored Solution:** Wrap `PianoKey` in `React.memo`. In the parent component, wrap `handleNoteOn` and `handleNoteOff` in `useCallback` with an empty dependency array `[]` (use `useRef` if state needs to be read inside) to ensure references remain stable across renders.

## Failure 3: Audio Click/Pop on Key Release (Audio Clicks)
- **Defect Description:** AI often calls `osc.stop()` immediately inside the `noteOff` function. Mathematically, abruptly cutting the waveform from high amplitude to zero creates an impulse, resulting in an audible "Pop" or "Click" sound.
- **Diagnostic Method:** Listen via headphones while repeatedly pressing and releasing keys. Alternatively, observe the waveform in Audacity/Web Audio DevTools to spot sudden sharp breaks in the signal.
- **Refactored Solution:** Do not call `osc.stop()` immediately. Instead, use `gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)` to smoothly fade the volume to zero over 40ms, and then call `osc.stop(ctx.currentTime + 0.04)`.