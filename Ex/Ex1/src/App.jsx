import { DeveloperCard } from './components/DeveloperCard';
import './index.css';

function App() {
  return (
    <main style={{ padding: '2rem', display: 'flex', justifyContent: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh', boxSizing: 'border-box' }}>
      <DeveloperCard 
        fullName="Nguyễn Đình Sang" 
        role="Senior Systems Architect • UIT S3T"
        avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&q=80"
        metrics={{ commits: 512, vdomNodes: 0, a11yScore: 100 }}
        skills={[
          { id: 'sk-1', name: 'React 19 Fiber', tier: 'Core' },
          { id: 'sk-2', name: 'Vanilla JS', tier: 'Advanced' }
        ]}
      />
    </main>
  );
}

export default App;