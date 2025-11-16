import React, { useState } from "react";

export default function FiltroAvanzado({ onFiltrar }) {
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    tipo_dato: "",
    minTiempo: "",
    maxTiempo: ""
  });

  const actualizar = (campo, valor) => {
    setFiltros({ ...filtros, [campo]: valor });
  };

  const aplicarFiltro = () => {
    onFiltrar(filtros);
  };

  const limpiar = () => {
    const vacio = {
      fechaInicio: "",
      fechaFin: "",
      tipo_dato: "",
      minTiempo: "",
      maxTiempo: ""
    };
    setFiltros(vacio);
    onFiltrar(vacio);
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5>Filtro Avanzado</h5>

      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Fecha inicio</label>
          <input
            type="date"
            className="form-control"
            value={filtros.fechaInicio}
            onChange={(e) => actualizar("fechaInicio", e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha fin</label>
          <input
            type="date"
            className="form-control"
            value={filtros.fechaFin}
            onChange={(e) => actualizar("fechaFin", e.target.value)}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Tipo de dato</label>
          <select
            className="form-select"
            value={filtros.tipo_dato}
            onChange={(e) => actualizar("tipo_dato", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Actual">Actual</option>
            <option value="Histórico">Histórico</option>
            <option value="Simulado">Simulado</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Min (minutos)</label>
          <input
            type="number"
            className="form-control"
            value={filtros.minTiempo}
            onChange={(e) => actualizar("minTiempo", e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Max (minutos)</label>
          <input
            type="number"
            className="form-control"
            value={filtros.maxTiempo}
            onChange={(e) => actualizar("maxTiempo", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary" onClick={aplicarFiltro}>
          Aplicar Filtro
        </button>
        <button className="btn btn-secondary" onClick={limpiar}>
          Limpiar
        </button>
      </div>
    </div>
  );
}
