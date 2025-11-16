import React, { useState, useMemo } from "react";

export default function TablaTiempos({ datos }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina] = useState(5);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  // FILTRAR DATOS
  const datosFiltrados = useMemo(() => {
    return datos.filter((item) => {
      const coincideFecha = filtroFecha
        ? item.fecha_registro.startsWith(filtroFecha)
        : true;

      const coincideTipo = filtroTipo
        ? item.tipo_dato === filtroTipo
        : true;

      return coincideFecha && coincideTipo;
    });
  }, [datos, filtroFecha, filtroTipo]);

  // PAGINACIÓN
  const indexUltimo = paginaActual * itemsPorPagina;
  const indexPrimero = indexUltimo - itemsPorPagina;
  const datosPaginados = datosFiltrados.slice(indexPrimero, indexUltimo);

  const totalPaginas = Math.ceil(datosFiltrados.length / itemsPorPagina);

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Historial de tiempos</h4>

      {/* FILTROS */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Filtrar por fecha</label>
          <input
            type="date"
            className="form-control"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Tipo de dato</label>
          <select
            className="form-select"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Histórico">Histórico</option>
            <option value="Actual">Actual</option>
            <option value="Simulado">Simulado</option>
          </select>
        </div>
      </div>

      {/* TABLA */}
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tiempo (min)</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {datosPaginados.length > 0 ? (
            datosPaginados.map((item) => (
              <tr key={item.id_registro}>
                <td>{item.id_registro}</td>
                <td>{new Date(item.fecha_registro).toLocaleString()}</td>
                <td>{item.tiempo_espera_min}</td>
                <td>{item.tipo_dato}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-muted">
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {[...Array(totalPaginas)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
