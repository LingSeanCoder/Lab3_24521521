// src/App.jsx
import { DeveloperCard } from './components/DeveloperCard';

export default function App() {
  return (
    <main style={{ padding: '2rem', display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <DeveloperCard
        fullName="Nguyễn Đình Sang"
        role="Senior Systems Architect • UIT S3T"
        skills={[
          { id: 'sk-1', name: 'React 19 Fiber', tier: 'Core' },
          { id: 'sk-2', name: 'Vanilla JS', tier: 'Advanced' }
        ]}
      />
    </main>
  );
}