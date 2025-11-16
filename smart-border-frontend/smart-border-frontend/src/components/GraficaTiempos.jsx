import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function GraficaTiempos({ tiempos, predicciones }) {
  const labels = tiempos.map(t => new Date(t.fecha_registro).toLocaleTimeString());
  const datosTiempos = tiempos.map(t => t.tiempo_espera_min);
  const datosPrediccion = predicciones.map(p => p.tiempo_estimado_min);

  const data = {
    labels,
    datasets: [
      {
        label: "Tiempo real (min)",
        data: datosTiempos,
        borderColor: "blue",
        tension: 0.3
      },
      {
        label: "Predicción (min)",
        data: datosPrediccion,
        borderColor: "green",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="card p-3 shadow-sm mb-4">
      <h5 className="mb-3">Tiempos vs Predicción</h5>
      <Line data={data} />
    </div>
  );
}
