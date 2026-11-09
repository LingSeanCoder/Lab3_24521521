import React, { useState } from 'react';
import { PUBG_SQUADS } from '../data';

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('total');

  // Xử lý Filter và Sort
  const processedSquads = PUBG_SQUADS
    .filter((squad) => squad.squadName.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((squad) => ({
      ...squad,
      totalPts: squad.placementPts + squad.killPts,
    }))
    .sort((a, b) => {
      if (sortBy === 'total') {
        return b.totalPts - a.totalPts;
      }
      return b.killPts - a.killPts;
    });

  return (
    <section className="leaderboard-section" aria-labelledby="leaderboard-title">
      <header className="leaderboard-header">
        <h2 id="leaderboard-title">PUBG VN Championship Standings</h2>
        
        <fieldset className="leaderboard-controls">
          <legend>Filter & Sort</legend>
          <label htmlFor="team-search">Tìm kiếm đội:</label>
          <input
            id="team-search"
            type="text"
            placeholder="Nhập tên đội..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="button" 
            onClick={() => setSortBy('total')} 
            aria-pressed={sortBy === 'total'}
          >
            Sort by Total Pts
          </button>
          <button 
            type="button" 
            onClick={() => setSortBy('kills')} 
            aria-pressed={sortBy === 'kills'}
          >
            Sort by Kill Pts
          </button>
        </fieldset>
      </header>

      <table className="leaderboard-table">
        <caption>Bảng xếp hạng tổng hợp PUBG Việt Nam</caption>
        <thead>
          <tr>
            <th scope="col">Đội</th>
            <th scope="col">WWCD</th>
            <th scope="col">Placement Pts</th>
            <th scope="col">Kill Pts</th>
            <th scope="col">Tổng điểm</th>
          </tr>
        </thead>
        <tbody>
          {processedSquads.map((squad) => (
            <tr key={squad.squadId}>
              <td>{squad.squadName}</td>
              <td>{squad.wwcdCount}</td>
              <td>{squad.placementPts}</td>
              <td>{squad.killPts}</td>
              <td><strong>{squad.totalPts}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}