// AQUI SERA EL DASHBOARD
import { FaClipboardList, FaUserInjured } from "react-icons/fa";
import NavbarFunction from "../components/Navbar";
import './dashboard.css';

export default function DashboardPage(){
    return(
        <><NavbarFunction /><div className="dashboard-container">
            {/* Titulo de la página */}
            <h1 className="dashboard-title">Panel de control</h1>

            {/* ACCESOS DIRECTOS DE LA APP */}
            <div className="dashboard-cards">
                {/* PACIENTES SOLO VER Y EDITAR */}
                <a href="/pacientes" className="dashboard-card">
                <FaUserInjured className="card-icon"/>
                <h3>Pacientes</h3>
                <p className="texto">Ver y editar pacientes</p>
                </a>

                {/* RUTINAS */}
                <a href="/rutinas" className="dashboard-card">
                <FaClipboardList className="card-icon"/>
                <h3>Rutinas</h3>
                <p className="texto">Ver, crear, editar y eliminar rutinas</p>
                </a>

            </div>
        </div></>
    )
}