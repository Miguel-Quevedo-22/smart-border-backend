import React from "react";

export default function TiemposTabla({ tiempos }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tiempo</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {tiempos.map(t => (
          <tr key={t.id_registro}>
            <td>{new Date(t.fecha_registro).toLocaleString()}</td>
            <td>{t.tiempo_espera_min} min</td>
            <td>{t.tipo_dato}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
