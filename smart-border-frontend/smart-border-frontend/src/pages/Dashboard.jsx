import React, { useEffect, useState } from "react";
import { obtenerPuentes, obtenerTiempos, obtenerPredicciones } from "../api/api";

export default function Dashboard() {
  const [puentes, setPuentes] = useState([]);
  const [puenteSeleccionado, setPuenteSeleccionado] = useState(null);
  const [tiempos, setTiempos] = useState([]);
  const [predicciones, setPredicciones] = useState([]);

  useEffect(() => {
    obtenerPuentes().then(setPuentes);
  }, []);

  const seleccionarPuente = (id) => {
    setPuenteSeleccionado(id);
    obtenerTiempos(id).then(setTiempos);
    obtenerPredicciones(id).then(setPredicciones);
  };

  return (
    <div className="container mt-4">
      <h1>Smart Border Queue</h1>

      <select className="form-select my-3" onChange={(e) => seleccionarPuente(e.target.value)}>
        <option>Selecciona un puente...</option>
        {puentes.map(p => (
          <option key={p.id_puente} value={p.id_puente}>{p.nombre_puente}</option>
        ))}
      </select>

      <pre>{JSON.stringify(tiempos, null, 2)}</pre>
      <pre>{JSON.stringify(predicciones, null, 2)}</pre>
    </div>
  );
}
