// src/components/ScientistDirectory.jsx
import { useState, useId } from 'react';
import { SMART_PEOPLE } from '../data';

export function ScientistDirectory() {
  const [people, setPeople] = useState(SMART_PEOPLE);
  const [query, setQuery] = useState('');
  const [minIq, setMinIq] = useState(160);
  const [sortBy, setSortBy] = useState('iq-desc');

  const searchId = useId();
  const minIqId = useId();
  const sortId = useId();

  const visible = people
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query.trim().toLowerCase()) &&
        p.iq >= minIq
    )
    .toSorted((a, b) =>
      sortBy === 'iq-desc' ? b.iq - a.iq : a.age - b.age
    );

  return (
    <section aria-label="Pioneer Directory">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={searchId}>Name:</label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <label htmlFor={minIqId}>Min IQ:</label>
        <input
          id={minIqId}
          type="number"
          value={minIq}
          onChange={(e) =>
            setMinIq(
              Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber
            )
          }
        />

        <label htmlFor={sortId}>Sort by:</label>
        <select
          id={sortId}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="iq-desc">IQ (High to Low)</option>
          <option value="age-asc">Age (Low to High)</option>
        </select>
      </form>

      <output role="status" aria-live="polite">
        Found {visible.length} pioneers
      </output>

      <ul>
        {visible.map((p) => (
          <li key={p.id}>
            {p.name} — IQ {p.iq}
          </li>
        ))}
      </ul>
    </section>
  );
}