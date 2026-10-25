// src/components/PubgMatchTelemetry.jsx
import { useState, useEffect } from 'react';
import { PUBG_VN_SQUADS } from '../data';

// Simulated API Function
const fetchKraftonPubgTelemetry = (squadId, signal) => {
  return new Promise((resolve, reject) => {
    // 1. Handle Abort Signal
    const abortHandler = () => {
      clearTimeout(timeoutId);
      reject(new Error('AbortError'));
    };
    signal.addEventListener('abort', abortHandler);

    // 2. Simulate Network Delay
    const timeoutId = setTimeout(() => {
      signal.removeEventListener('abort', abortHandler);

      if (signal.aborted) {
        reject(new Error('AbortError'));
        return;
      }

      // 3. Simulate 35% Packet Loss
      if (Math.random() < 0.35) {
        reject(new Error('Packet Loss'));
        return;
      }

      // 4. Return Data
      const squad = PUBG_VN_SQUADS.find((s) => s.id === squadId);
      resolve(squad);
    }, 1000);
  });
};

export function PubgMatchTelemetry() {
  const [view, setView] = useState({ status: 'IDLE', data: null, error: null });
  const [squadId, setSquadId] = useState('ces');
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    
    setView({ status: 'LOADING', data: null, error: null });

    fetchKraftonPubgTelemetry(squadId, controller.signal)
      .then((payload) => {
        setView({ status: 'SUCCESS', data: payload, error: null });
      })
      .catch((err) => {
        // Safe Abort Error Guard
        if (err.message === 'AbortError') return;
        setView({ status: 'ERROR', data: null, error: err.message });
      });

    // Cleanup function to abort request on unmount or rapid squad switch
    return () => controller.abort();
  }, [squadId, retryTick]);

  return (
    <section aria-label="KRAFTON PUBG Telemetry Radar">
      <nav>
        {PUBG_VN_SQUADS.map((squad) => (
          <button
            key={squad.id}
            onClick={() => setSquadId(squad.id)}
            style={{ fontWeight: squadId === squad.id ? 'bold' : 'normal' }}
          >
            {squad.name}
          </button>
        ))}
      </nav>

      {view.status === 'LOADING' && (
        <div className="skeleton-card" aria-busy="true">
          Syncing KRAFTON Radar...
        </div>
      )}

      {view.status === 'ERROR' && (
        <section role="alert">
          <p>Error: {view.error}</p>
          <button onClick={() => setRetryTick((t) => t + 1)}>
            Reconnect Satellite (Retry)
          </button>
        </section>
      )}

      {view.status === 'SUCCESS' && (
        <article aria-live="polite">
          <h3>
            {view.data.name} — Kills: {view.data.kills}
          </h3>
        </article>
      )}
    </section>
  );
}