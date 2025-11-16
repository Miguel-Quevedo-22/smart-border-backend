import React from "react";

export default function TiempoCard({ titulo, valor, color }) {
  return (
    <div className="card shadow-sm p-3 mb-3 border-0" style={{ borderLeft: `6px solid ${color}` }}>
      <h5 className="text-muted">{titulo}</h5>
      <h2 className="fw-bold">{valor}</h2>
    </div>
  );
}
