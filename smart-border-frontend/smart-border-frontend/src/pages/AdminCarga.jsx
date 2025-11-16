import React, { useState } from "react";
import { agregarTiempo } from "../api/api";

export default function AdminCarga() {
  const [form, setForm] = useState({
    id_puente: "",
    tiempo_espera_min: "",
    tipo_dato: "Actual"
  });

  const enviar = async () => {
    await agregarTiempo(form);
    alert("Registro agregado correctamente.");
  };

  return (
    <div className="container mt-4">
      <h2>Cargar Nuevo Registro</h2>

      <input className="form-control my-2"
             placeholder="ID puente"
             onChange={e => setForm({...form, id_puente: e.target.value})}/>

      <input className="form-control my-2"
             placeholder="Tiempo en minutos"
             onChange={e => setForm({...form, tiempo_espera_min: e.target.value})}/>

      <select className="form-select my-2"
              onChange={e => setForm({...form, tipo_dato: e.target.value})}>
        <option value="Actual">Actual</option>
        <option value="Histórico">Histórico</option>
        <option value="Simulado">Simulado</option>
      </select>

      <button className="btn btn-primary" onClick={enviar}>
        Guardar
      </button>
    </div>
  );
}
