// src/components/SkillBadge.jsx
export function SkillBadge({ id, name, tier }) {
  return (
    <li>
      {name} ({tier})
    </li>
  );
}