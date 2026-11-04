export const WHITE_KEY_WIDTH = 24;
export const BLACK_KEY_WIDTH = 16;

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const BLACK_KEY_INDICES = [1, 3, 6, 8, 10]; // C#, D#, F#, G#, A#

export function generatePianoKeys() {
  const keys = [];
  let whiteKeyCount = 0;

  for (let midi = 21; midi <= 108; midi++) {
    const noteName = NOTE_NAMES[midi % 12];
    const octave = Math.floor(midi / 12) - 1;
    const isBlack = BLACK_KEY_INDICES.includes(midi % 12);
    const label = `${noteName}${octave}`;
    
    // Calculate frequency using the required formula
    const freq = 440 * Math.pow(2, (midi - 69) / 12);

    let leftOffset;
    if (!isBlack) {
      leftOffset = whiteKeyCount * WHITE_KEY_WIDTH;
      whiteKeyCount++;
    } else {
      leftOffset = (whiteKeyCount * WHITE_KEY_WIDTH) - (BLACK_KEY_WIDTH / 2);
    }

    keys.push({
      midi,
      label,
      isBlack,
      leftOffset,
      freq
    });
  }

  return keys;
}

export const PIANO_KEYS = generatePianoKeys();