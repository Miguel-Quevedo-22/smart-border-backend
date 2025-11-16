import React from "react";

export default function PrediccionCard({ predicciones }) {
  if (!predicciones.length) return null;

  const p = predicciones[0];

  return (
    <div className="card mb-4 p-3 shadow">
      <h4>Predicción del Cruce</h4>
      <p><strong>Tiempo estimado: </strong>{p.tiempo_estimado_min} min</p>
      <p><strong>Modelo usado: </strong>{p.modelo_utilizado}</p>
      <p><strong>Error: </strong>{(p.margen_error * 100).toFixed(1)}%</p>
    </div>
  );
}
