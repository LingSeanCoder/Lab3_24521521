// src/components/ScientistDirectory.jsx
import { useState, useId } from 'react';
import { SMART_PEOPLE } from '../data';

export function ScientistDirectory() {
  const [people, setPeople] = useState(SMART_PEOPLE);

  return (
    <section aria-label="Pioneer Directory">
      <ul>
        {people.map(p => (
          <li key={p.id}>
            {p.name} — IQ {p.iq}
          </li>
        ))}
      </ul>
    </section>
  );
}