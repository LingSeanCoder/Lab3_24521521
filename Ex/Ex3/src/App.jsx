import { PubgMatchTelemetry } from './components/PubgMatchTelemetry';
import './App.css';

function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#fff', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <h1>PUBG VN Series Live Radar</h1>
      <PubgMatchTelemetry />
    </main>
  );
}

export default App;