import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDrumKeyboard } from '../hooks/useDrumKeyboard';
import './DrumKit.css';

// Cấu hình tần số âm thanh cho từng Pad
const PADS = {
  KeyW: { id: 'w', label: 'W', name: 'Crash', freq: 400 },
  KeyA: { id: 'a', label: 'A', name: 'Snare', freq: 250 },
  KeyS: { id: 's', label: 'S', name: 'Kick', freq: 100 },
  KeyD: { id: 'd', label: 'D', name: 'Tom 1', freq: 150 },
  KeyJ: { id: 'j', label: 'J', name: 'Tom 2', freq: 180 },
  KeyK: { id: 'k', label: 'K', name: 'Ride', freq: 350 },
  KeyL: { id: 'l', label: 'L', name: 'Hi-Hat', freq: 500 },
};

export default function DrumKit() {
  const [hitLog, setHitLog] = useState([]);
  const [decibel, setDecibel] = useState(0);
  const audioCtxRef = useRef(null);

  // Khởi tạo Web Audio API
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioContext();
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const playSound = (freq) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Hiệu ứng âm lượng giảm dần (Decay)
    gainNode.gain.setValueAtTime(1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  const handleTrigger = useCallback((pad) => {
    playSound(pad.freq);
    
    // Cập nhật Hit Log (giữ 5 lần gần nhất)
    setHitLog((prev) => [pad.name, ...prev].slice(0, 5));

    // Hiệu ứng Visual Decibel
    setDecibel(100);
    const timeout = setTimeout(() => setDecibel(0), 100);
    return () => clearTimeout(timeout);
  }, []);

  const activeKeys = useDrumKeyboard(PADS, handleTrigger);

  // Zero Div-Soup: Bắt đầu bằng thẻ <main>
  return (
    <main className="drum-kit-wrapper">
      <header className="drum-header">
        <h1>Studio Drum Kit</h1>
        <p>Sử dụng <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> <kbd>J</kbd> <kbd>K</kbd> <kbd>L</kbd> để chơi</p>
      </header>

      <section className="decibel-container" aria-label="Visual Decibel Meter">
        <span 
          className="decibel-bar" 
          style={{ width: `${decibel}%` }}
          aria-hidden="true"
        ></span>
      </section>

      <section className="pads-grid" aria-label="Drum Pads">
        {Object.values(PADS).map((pad) => {
          // Tìm key của pad hiện tại để check active
          const isActive = activeKeys.has(Object.keys(PADS).find(k => PADS[k].id === pad.id));
          return (
            <button
              key={pad.id}
              className={`drum-pad ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => handleTrigger(pad)}
            >
              <strong className="pad-label">{pad.label}</strong>
              <span className="pad-name">{pad.name}</span>
            </button>
          );
        })}
      </section>

      <section className="hit-log-container">
        <h2>Visual Hit Log</h2>
        <output aria-live="polite" className="hit-log-output">
          {hitLog.length > 0 ? hitLog.join('  ➔  ') : 'Chưa có âm thanh...'}
        </output>
      </section>
    </main>
  );
}