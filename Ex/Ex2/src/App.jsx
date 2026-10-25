import { ScientistDirectory } from './components/ScientistDirectory';

function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Pioneer Directory</h1>
      <ScientistDirectory />
    </main>
  );
}

export default App;