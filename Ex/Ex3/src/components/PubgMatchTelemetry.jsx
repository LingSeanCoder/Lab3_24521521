import { useState, useEffect } from 'react';
import './PubgMatchTelemetry.css'; // Import file CSS

const PUBG_VN_SQUADS = [
  { id: 'ces', name: 'Cerberus Esports', map: 'Erangel', phase: 'Phase 6', alive: 4, kills: 14, wwcdProb: '68%', status: 'In Safe Zone' },
  { id: 'te', name: 'The Expendables', map: 'Miramar', phase: 'Phase 7', alive: 4, kills: 18, wwcdProb: '82%', status: 'Holding High Ground' },
  { id: 'ge', name: 'Genius Esports', map: 'Taego', phase: 'Phase 5', alive: 3, kills: 9, wwcdProb: '41%', status: 'Rotating Blue Zone' }
];

export function PubgMatchTelemetry() {
  const [squadId, setSquadId] = useState('ces');
  const [retryTick, setRetryTick] = useState(0);
  const [view, setView] = useState({ status: 'IDLE', data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setView({ status: 'LOADING', data: null, error: null });
      try {
        // Giả lập độ trễ mạng 1s
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 1000);
          controller.signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('AbortError'));
          });
        });

        // Giả lập 35% mất gói tin
        if (Math.random() < 0.35) {
          throw new Error('Satellite Packet Loss');
        }

        const squad = PUBG_VN_SQUADS.find(s => s.id === squadId);
        setView({ status: 'SUCCESS', data: squad, error: null });
      } catch (err) {
        if (err.message === 'AbortError') return; // Bỏ qua lỗi do hủy fetch
        setView({ status: 'ERROR', data: null, error: err.message });
      }
    };

    fetchData();

    // Cleanup function chống memory leak
    return () => controller.abort();
  }, [squadId, retryTick]);

  return (
    <section aria-label="KRAFTON PUBG Telemetry Radar" className="telemetry-container">
      <div className="squad-selector">
        <button className={squadId === 'ces' ? 'active' : ''} onClick={() => setSquadId('ces')}>CES</button>
        <button className={squadId === 'te' ? 'active' : ''} onClick={() => setSquadId('te')}>TE</button>
        <button className={squadId === 'ge' ? 'active' : ''} onClick={() => setSquadId('ge')}>GE</button>
      </div>

      {view.status === 'LOADING' && (
        <div className="skeleton-card" aria-busy="true">
          Syncing KRAFTON Radar...
        </div>
      )}

      {view.status === 'ERROR' && (
        <section role="alert" className="alert-box">
          <p>Error: {view.error}</p>
          <button onClick={() => setRetryTick(t => t + 1)}>Reconnect Satellite (Retry)</button>
        </section>
      )}

      {view.status === 'SUCCESS' && view.data && (
        <article className="telemetry-card" aria-live="polite">
          <h3>{view.data.name} — Kills: {view.data.kills}</h3>
          <div className="stats-grid">
            <p><strong>Map:</strong> {view.data.map}</p>
            <p><strong>Phase:</strong> {view.data.phase}</p>
            <p><strong>Alive:</strong> {view.data.alive}</p>
            <p><strong>WWCD Prob:</strong> {view.data.wwcdProb}</p>
            <p><strong>Status:</strong> {view.data.status}</p>
          </div>
        </article>
      )}
    </section>
  );
}