const API = "/api";

export async function obtenerPuentes() {
  const res = await fetch(`${API}/puentes`);
  return await res.json();
}

export async function obtenerTiempos(id) {
  const res = await fetch(`${API}/tiempos/${id}`);
  return await res.json();
}

export async function obtenerPredicciones(id) {
  const res = await fetch(`${API}/predicciones/${id}`);
  return await res.json();
}

export async function agregarTiempo(data) {
  const res = await fetch(`${API}/tiempos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
