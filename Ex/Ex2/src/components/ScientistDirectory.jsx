import { useState, useId } from 'react';
import { SMART_PEOPLE } from '../data';
import './ScientistDirectory.css'; // Thêm dòng này

export function ScientistDirectory() {
  const searchId = useId();
  const iqId = useId();
  const sortId = useId();

  const [people, setPeople] = useState(SMART_PEOPLE);
  const [query, setQuery] = useState('');
  const [minIq, setMinIq] = useState(150);
  const [sortBy, setSortBy] = useState('iq-desc');

  const visible = people
    .filter(p => p.name.toLowerCase().includes(query.trim().toLowerCase()) && p.iq >= minIq)
    .toSorted((a, b) => (sortBy === 'iq-desc' ? b.iq - a.iq : a.age - b.age));

  return (
    <section aria-label="Pioneer Directory" className="directory-container">
      <form className="controls" onSubmit={(e) => e.preventDefault()}>
        <div className="control-group">
          <label htmlFor={searchId}>Search Name</label>
          <input id={searchId} type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="control-group">
          <label htmlFor={iqId}>Min IQ</label>
          <input 
            id={iqId} 
            type="number" 
            value={minIq} 
            onChange={(e) => setMinIq(Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)} 
          />
        </div>
        <div className="control-group">
          <label htmlFor={sortId}>Sort By</label>
          <select id={sortId} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="iq-desc">IQ (High to Low)</option>
            <option value="age-asc">Age (Young to Old)</option>
          </select>
        </div>
      </form>

      <output role="status" aria-live="polite" className="status-text">
        Found {visible.length} pioneers
      </output>

      <ul className="pioneer-list">
        {visible.map(p => (
          <li key={p.id} className="pioneer-item">
            <span><strong>{p.name}</strong> — IQ {p.iq}</span>
            <button 
              className="btn-delete"
              onClick={() => setPeople(prev => prev.filter(item => item.id !== p.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button className="btn-reset" onClick={() => setPeople(SMART_PEOPLE)}>
        Reset Directory
      </button>
    </section>
  );
}