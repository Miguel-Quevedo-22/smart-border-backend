const API_URL = "http://localhost:3000/api";

export async function obtenerPuentes() {
  const res = await fetch(`${API_URL}/puentes`);
  return res.json();
}

export async function obtenerTiempos(id_puente) {
  const res = await fetch(`${API_URL}/tiempos/${id_puente}`);
  return res.json();
}

export async function obtenerPredicciones(id_puente) {
  const res = await fetch(`${API_URL}/predicciones/${id_puente}`);
  return res.json();
}

export async function filtrarTiempos(query) {
  const res = await fetch(`${API_URL}/tiempos/filtro?${query}`);
  return res.json();
}

export async function agregarTiempo(data) {
  const res = await fetch(`${API_URL}/tiempos/agregar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
