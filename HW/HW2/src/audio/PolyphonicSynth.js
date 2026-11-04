export const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

export class PolyphonicSynth {
  constructor(maxVoices = 8) {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.maxVoices = maxVoices;
    this.activeVoices = new Map(); // ES6 Map giữ thứ tự chèn cho FIFO
  }

  noteOn(midi) {
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Nếu nốt đã kêu, hủy trước khi kêu lại để tránh chồng chéo
    if (this.activeVoices.has(midi)) {
      this.noteOff(midi);
    }

    // FIFO Voice Stealing
    if (this.activeVoices.size >= this.maxVoices) {
      const oldestMidi = this.activeVoices.keys().next().value;
      this.noteOff(oldestMidi);
    }

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(midiToFreq(midi), this.ctx.currentTime);

    // Attack phase chống click ở đầu nốt
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.02);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start();

    this.activeVoices.set(midi, { osc, gainNode });
  }

  noteOff(midi) {
    if (!this.activeVoices.has(midi)) return;

    const { osc, gainNode } = this.activeVoices.get(midi);

    // Release phase chống click/pop
    gainNode.gain.setValueAtTime(gainNode.gain.value, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

    osc.stop(this.ctx.currentTime + 0.05);

    this.activeVoices.delete(midi);
  }

  stopAll() {
    for (const midi of Array.from(this.activeVoices.keys())) {
      this.noteOff(midi);
    }
  }
}