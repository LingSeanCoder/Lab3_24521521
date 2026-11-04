import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PIANO_KEYS } from '../utils/pianoKeys';
import { PolyphonicSynth } from '../audio/PolyphonicSynth';
import { PianoKey } from './PianoKey';
import './Piano.css';

export default function Piano() {
  const synthRef = useRef(new PolyphonicSynth());
  const [activeNotes, setActiveNotes] = useState(new Set());
  const [isRecording, setIsRecording] = useState(false);
  const [sequence, setSequence] = useState([]);

  // Refs để đồng bộ state bên trong useCallback mà không cần thêm dependency
  const isRecordingRef = useRef(false);
  const sequenceRef = useRef([]);
  const recordStartRef = useRef(0);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  useEffect(() => {
    return () => {
      synthRef.current.stopAll();
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // useCallback với mảng dependency rỗng để giữ nguyên reference
  const handleNoteOn = useCallback((midi) => {
    synthRef.current.noteOn(midi);
    setActiveNotes((prev) => new Set(prev).add(midi));

    if (isRecordingRef.current) {
      const now = Date.now();
      const deltaMs = sequenceRef.current.length === 0 ? 0 : now - recordStartRef.current;
      
      setSequence((prev) => {
        const next = [...prev, { midi, deltaMs }];
        sequenceRef.current = next;
        return next;
      });
    }
  }, []);

  const handleNoteOff = useCallback((midi) => {
    synthRef.current.noteOff(midi);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(midi);
      return next;
    });
  }, []);

  const startRecording = () => {
    setSequence([]);
    sequenceRef.current = [];
    recordStartRef.current = Date.now();
    setIsRecording(true);
    isRecordingRef.current = true;
  };

  const stopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;
  };

  const playSequence = async (speed = 1.0) => {
    if (sequenceRef.current.length === 0) return;
    if (abortControllerRef.current) abortControllerRef.current.abort();
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    synthRef.current.stopAll();
    setActiveNotes(new Set());

    const wasRecording = isRecordingRef.current;
    isRecordingRef.current = false;

    let accumulatedTime = 0;

    try {
      for (const note of sequenceRef.current) {
        const waitTime = (note.deltaMs - accumulatedTime) / speed;
        
        if (waitTime > 0) {
          await new Promise((resolve, reject) => {
            const timer = setTimeout(resolve, waitTime);
            signal.addEventListener('abort', () => {
              clearTimeout(timer);
              reject(new Error('AbortError'));
            });
          });
        }
        
        accumulatedTime = note.deltaMs;
        
        // Kích hoạt âm thanh
        handleNoteOn(note.midi);
        // Tự động nhả phím sau một khoảng thời gian ngắn (giả lập độ dài nốt)
        setTimeout(() => handleNoteOff(note.midi), 150 / speed);
      }
    } catch (err) {
      if (err.message !== 'AbortError') console.error(err);
    } finally {
      isRecordingRef.current = wasRecording;
    }
  };

  const stopPlayback = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    synthRef.current.stopAll();
    setActiveNotes(new Set());
  };

  return (
    <main className="piano-app">
      <header className="controls">
        <h1>88-Key Polyphonic Piano</h1>
        <section className="sequencer">
          <button onClick={isRecording ? stopRecording : startRecording} className={isRecording ? 'recording' : ''}>
            {isRecording ? '⏹ Stop Record' : '⏺ Record'}
          </button>
          <button onClick={() => playSequence(0.5)} disabled={sequence.length === 0}>▶ 0.5x</button>
          <button onClick={() => playSequence(1.0)} disabled={sequence.length === 0}>▶ 1.0x</button>
          <button onClick={() => playSequence(2.0)} disabled={sequence.length === 0}>▶ 2.0x</button>
          <button onClick={stopPlayback} className="btn-stop">⏹ Stop</button>
        </section>
      </header>

      <section className="piano-container">
        <div className="piano-keys">
          {PIANO_KEYS.map((key) => (
            <PianoKey
              key={key.midi}
              midi={key.midi}
              label={key.label}
              isBlack={key.isBlack}
              leftOffset={key.leftOffset}
              isPressed={activeNotes.has(key.midi)}
              onNoteOn={handleNoteOn}
              onNoteOff={handleNoteOff}
            />
          ))}
        </div>
      </section>
    </main>
  );
}