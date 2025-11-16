import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdminCarga from "./pages/AdminCarga";

export default function App() {
  const [vista, setVista] = useState("dashboard");

  return (
    <>
      <Navbar cambiarVista={setVista} />

      {vista === "dashboard" && <Dashboard />}
      {vista === "admin" && <AdminCarga />}
    </>
  );
}
