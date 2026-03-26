// AQUI ESTARÁN LOS PACIENTES
import NavbarFunction from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import './pacientes.css';
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function PacientesList() {

    // DATOS DE EJEMPLO (se reemplazarán con datos reales de la BD)
    const [pacientes, setPacientes] = useState([]);

    useEffect(()=>{
        const cargarPacientes=async()=>{
            try{
                const response=await api.get('/pacientes');
                setPacientes(response.data.data || response.data);
            }catch(error){
                console.error("Error al cargar la lista de pacientes", error);
            }
        };
        cargarPacientes();
    }, []);

    // FUNCIÓN PARA ELIMINAR UN PACIENTE --ELIMINAR SI NO ES NECESARIA
    const eliminarPaciente = (id) => {
        const confirmar = window.confirm("¿Estás segura de eliminar este paciente?");
        if (confirmar) {
            setPacientes(pacientes.filter((paciente) => paciente.id !== id));
        }
    };

    return (
        <>
            <NavbarFunction />
            <div className="pacientes-container">

                {/* ENCABEZADO CON TÍTULO */}
                <div className="pacientes-header">
                    <h1 className="pacientes-title">Pacientes</h1>
                </div>

                {/* TABLA DE PACIENTES */}
                <table className="pacientes-tabla">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rutinas asignadas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente) => (
                            <tr key={paciente.id}>
                                <td>{paciente.id}</td>
                                <td>{paciente.name}</td>
                                <td>{paciente.email}</td>


                                {/* CANTIDAD DE RUTINAS ASIGNADAS */}
                                <td>{paciente.rutinas_asignadas?.length || 0} rutinas</td>

                                <td className="acciones">
                                    {/* BOTÓN EDITAR RUTINAS — solo se puede editar las rutinas asignadas */}
                                    <a href={`/pacientes/editar/${paciente.id}`} className="btn-editar">
                                        <FaEdit /> Editar rutinas
                                    </a>
                                    {/* BOTÓN ELIMINAR */}
                                    <button className="btn-eliminar" onClick={() => eliminarPaciente(paciente.id)}>
                                        <FaTrash /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {pacientes.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                    No hay pacientes registrados aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </>
    );
}