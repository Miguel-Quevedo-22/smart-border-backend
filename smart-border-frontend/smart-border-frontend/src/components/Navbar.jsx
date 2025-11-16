import React from "react";
import { FaBorderAll, FaUpload } from "react-icons/fa";


export default function Navbar({ cambiarVista }) {
  return (
    <nav className="navbar navbar-dark navbar-custom px-3">
      <span className="navbar-brand h1 d-flex align-items-center">
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: "45px", height: "45px", marginRight: "10px", borderRadius: "5px" }}
        />
        Smart Border Queue
      </span>

      <div>
        <button className="btn btn-outline-light btn-nav me-2" onClick={() => cambiarVista("dashboard")}>
          <FaBorderAll size={18} /> Dashboard
        </button>

        <button className="btn btn-outline-light btn-nav" onClick={() => cambiarVista("admin")}>
          <FaUpload size={18} /> Cargar
        </button>
      </div>
    </nav>
  );
}
