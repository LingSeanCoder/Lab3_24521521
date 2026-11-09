import React from 'react';
import Leaderboard from './components/Leaderboard';
import AirdropArena from './components/AirdropArena';

export default function App() {
  return (
    <main>
      <header>
        <h1>KRAFTON x PUBG VN Championship</h1>
      </header>
      <AirdropArena />
      <Leaderboard />
    </main>
  );
}