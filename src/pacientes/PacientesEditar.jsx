// PÁGINA PARA EDITAR LAS RUTINAS DE UN PACIENTE
import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import '../rutinas/rutinas.css';

export default function EditarPaciente() {

    // OBTENEMOS EL ID DEL PACIENTE DE LA URL (/pacientes/editar/1)
    const { id } = useParams();

    // DATOS DE EJEMPLO DE PACIENTES (luego vendrán de la BD)
    const pacientesData = {
        1: { nombre: "Juan Pérez", correo: "juan@gmail.com", telefono: "442-123-4567", rutinas_ids: [1, 2] },
        2: { nombre: "María López", correo: "maria@gmail.com", telefono: "442-987-6543", rutinas_ids: [3] },
        3: { nombre: "Carlos Soto", correo: "carlos@gmail.com", telefono: "442-555-1234", rutinas_ids: [] },
    };

    // RUTINAS DISPONIBLES (luego vendrán de la BD)
    const rutinasDisponibles = [
        { id: 1, nombre: "Rutina de hombro", descripcion: "Ejercicios para rehabilitación de hombro" },
        { id: 2, nombre: "Rutina de rodilla", descripcion: "Ejercicios para rehabilitación de rodilla" },
        { id: 3, nombre: "Rutina de mano", descripcion: "Ejercicios para rehabilitación de mano" },
        { id: 4, nombre: "Rutina de espalda", descripcion: "Ejercicios para dolor lumbar" },
        { id: 5, nombre: "Rutina de cuello", descripcion: "Ejercicios para tensión cervical" },
    ];

    // CARGAMOS LOS DATOS DEL PACIENTE
    const paciente = pacientesData[id];

    // RUTINAS YA ASIGNADAS AL PACIENTE
    const [rutinasAsignadas, setRutinasAsignadas] = useState(
        rutinasDisponibles.filter((r) => paciente?.rutinas_ids.includes(r.id))
    );

    // AGREGAR RUTINA AL PACIENTE (evita duplicados)
    const agregarRutina = (rutina) => {
        const yaAgregada = rutinasAsignadas.find((r) => r.id === rutina.id);
        if (yaAgregada) return;
        setRutinasAsignadas([...rutinasAsignadas, rutina]);
    };

    // QUITAR RUTINA DEL PACIENTE
    const quitarRutina = (rutinaId) => {
        setRutinasAsignadas(rutinasAsignadas.filter((r) => r.id !== rutinaId));
    };

    // GUARDAR CAMBIOS (luego irá la petición a la BD)
    const guardarCambios = () => {
        if (rutinasAsignadas.length === 0) {
            alert("El paciente debe tener al menos una rutina asignada");
            return;
        }

        // AQUÍ IRÁ LA PETICIÓN PUT/PATCH A LA BD
        console.log({
            paciente_id: id,
            rutinas_ids: rutinasAsignadas.map((r) => r.id)
        });

        alert("Rutinas actualizadas correctamente");
    };

    // SI NO EXISTE EL PACIENTE
    if (!paciente) {
        return (
            <>
                <NavbarFunction />
                <div className="rutinas-container">
                    <p>Paciente no encontrado.</p>
                    <a href="/pacientes" className="btn-regresar">
                        <FaArrowLeft /> Regresar
                    </a>
                </div>
            </>
        );
    }

    return (
        <>
            <NavbarFunction />
            <div className="rutinas-container">

                {/* ENCABEZADO */}
                <div className="rutinas-header">
                    <div className="header-left">
                        {/* BOTÓN REGRESAR */}
                        <a href="/pacientes" className="btn-regresar">
                            <FaArrowLeft /> Regresar
                        </a>
                        <div>
                            <h1 className="rutinas-title">Editar rutinas</h1>
                            {/* NOMBRE Y CORREO DEL PACIENTE */}
                            <p style={{ color: "rgb(100, 120, 130)", marginTop: "4px", fontSize: "14px" }}>
                                Paciente: <strong>{paciente.nombre}</strong> — {paciente.correo}
                            </p>
                        </div>
                    </div>

                    {/* BOTÓN GUARDAR */}
                    <button className="btn-guardar" onClick={guardarCambios}>
                        <FaSave /> Guardar Cambios
                    </button>
                </div>

                <div className="nueva-rutina-grid">

                    {/* COLUMNA IZQUIERDA — RUTINAS ASIGNADAS */}
                    <div className="form-card">
                        <h2 className="form-card-title">
                            Rutinas asignadas ({rutinasAsignadas.length})
                        </h2>

                        {rutinasAsignadas.length === 0 ? (
                            <p className="empty-msg">Este paciente no tiene rutinas asignadas</p>
                        ) : (
                            <ul className="ejercicios-seleccionados">
                                {rutinasAsignadas.map((rutina) => (
                                    <li key={rutina.id}>
                                        <div>
                                            {/* NOMBRE DE LA RUTINA */}
                                            <strong>{rutina.nombre}</strong>
                                            {/* DESCRIPCIÓN */}
                                            <p style={{ fontSize: "12px", color: "rgb(120,130,140)", margin: "2px 0 0" }}>
                                                {rutina.descripcion}
                                            </p>
                                        </div>
                                        {/* BOTÓN QUITAR */}
                                        <button className="btn-quitar" onClick={() => quitarRutina(rutina.id)}>
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* COLUMNA DERECHA — RUTINAS DISPONIBLES */}
                    <div className="form-card">
                        <h2 className="form-card-title">Rutinas disponibles</h2>
                        <ul className="ejercicios-disponibles">
                            {rutinasDisponibles.map((rutina) => (
                                <li key={rutina.id}>
                                    <div>
                                        {/* NOMBRE DE LA RUTINA */}
                                        <strong>{rutina.nombre}</strong>
                                        {/* DESCRIPCIÓN */}
                                        <p style={{ fontSize: "12px", color: "rgb(120,130,140)", margin: "2px 0 0" }}>
                                            {rutina.descripcion}
                                        </p>
                                    </div>
                                    {/* BOTÓN AGREGAR */}
                                    <button className="btn-agregar" onClick={() => agregarRutina(rutina)}>
                                        <FaPlus /> Agregar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
}