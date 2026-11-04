import React, { memo } from 'react';

export const PianoKey = memo(function PianoKey({
  midi,
  label,
  isBlack,
  leftOffset,
  isPressed,
  onNoteOn,
  onNoteOff,
}) {
  return (
    <button
      type="button"
      className={`key ${isBlack ? 'key--black' : 'key--white'} ${isPressed ? 'is-pressed' : ''}`}
      style={isBlack ? { left: `${leftOffset}px` } : undefined}
      aria-pressed={isPressed}
      aria-label={`Note ${label}`}
      onPointerDown={() => onNoteOn(midi)}
      onPointerUp={() => onNoteOff(midi)}
      onPointerLeave={() => onNoteOff(midi)}
      onKeyDown={(e) => {
        if (e.repeat) return;
        if (e.code === 'Space' || e.code === 'Enter') onNoteOn(midi);
      }}
      onKeyUp={(e) => {
        if (e.code === 'Space' || e.code === 'Enter') onNoteOff(midi);
      }}
    >
      <span>{label}</span>
    </button>
  );
});