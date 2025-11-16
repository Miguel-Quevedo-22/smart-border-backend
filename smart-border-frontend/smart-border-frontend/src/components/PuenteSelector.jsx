import React from "react";

export default function PuenteSelector({ puentes, onSelect }) {
  return (
    <select className="form-select mb-4" onChange={e => onSelect(e.target.value)}>
      <option value="">Selecciona un puente...</option>
      {puentes.map(p => (
        <option key={p.id_puente} value={p.id_puente}>
          {p.nombre_puente}
        </option>
      ))}
    </select>
  );
}
