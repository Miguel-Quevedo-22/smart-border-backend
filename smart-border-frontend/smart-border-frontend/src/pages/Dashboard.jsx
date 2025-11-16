import React, { useEffect, useState } from "react";
import { obtenerPuentes, obtenerTiempos, obtenerPredicciones } from "../api/api";

// Componentes
import PuenteSelector from "../components/PuenteSelector";
import TiempoCard from "../components/TiempoCard";
import GraficaTiempos from "../components/GraficaTiempos";
import TablaTiempos from "../components/TablaTiempos";

export default function Dashboard() {
  const [puentes, setPuentes] = useState([]);
  const [tiempos, setTiempos] = useState([]);
  const [predicciones, setPredicciones] = useState([]);
  const [puenteActual, setPuenteActual] = useState(null);

  // Cargar puentes al inicio
  useEffect(() => {
    obtenerPuentes().then(setPuentes);
  }, []);

  // Cuando seleccionas un puente
  const seleccionarPuente = async (id) => {
    const puente = puentes.find((p) => p.id_puente == id);
    setPuenteActual(puente);

    obtenerTiempos(id).then(setTiempos);
    obtenerPredicciones(id).then(setPredicciones);
  };

  return (
    <div className="container mt-5 app-container">

      <h2 className="text-center mb-4 fw-bold">Dashboard de Tiempos</h2>

      {/* Selección de puente */}
      <PuenteSelector puentes={puentes} onSelect={seleccionarPuente} />

      {/* Información del puente */}
      {puenteActual && (
        <div className="mt-4 mb-3">
          <h3 className="fw-bold">{puenteActual.nombre_puente}</h3>
          <p className="text-light">{puenteActual.ubicacion}</p>
        </div>
      )}

      {/* TARJETAS */}
      <div className="row mt-3">
        <div className="col-md-4">
          <TiempoCard
            titulo="Tiempo Actual"
            valor={
              tiempos.length > 0
                ? tiempos[tiempos.length - 1].tiempo_espera_min + " min"
                : "--"
            }
            color="#007bff"
          />
        </div>

        <div className="col-md-4">
          <TiempoCard
            titulo="Promedio Histórico"
            valor={
              tiempos.length > 0
                ? Math.round(
                    tiempos.reduce((a, b) => a + b.tiempo_espera_min, 0) /
                      tiempos.length
                  ) + " min"
                : "--"
            }
            color="#17a2b8"
          />
        </div>

        <div className="col-md-4">
          <TiempoCard
            titulo="Predicción"
            valor={
              predicciones.length > 0
                ? predicciones[predicciones.length - 1].tiempo_estimado_min +
                  " min"
                : "--"
            }
            color="#28a745"
          />
        </div>
      </div>

      {/* TABLA DE TIEMPOS */}
      {tiempos.length > 0 && (
        <div className="mt-4">
          <TablaTiempos datos={tiempos} />
        </div>
      )}

      {/* GRÁFICA */}
      {tiempos.length > 0 && (
        <div className="mt-4">
          <GraficaTiempos tiempos={tiempos} predicciones={predicciones} />
        </div>
      )}
    </div>
  );
}
