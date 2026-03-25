// LISTA DE EJERCICIOS
import NavbarFunction from "../components/Navbar";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import './ejercicios.css';


export default function EjerciciosList() {

    const [ejercicios, setEjercicios] = useState([
        { id: 1, nombre: "Elevación de brazo", descripcion: "Ejercicio para movilidad de hombro", duracion: 30, repeticiones: 10, video_url: "https://youtube.com/watch?v=abc" },
        { id: 2, nombre: "Flexión de rodilla", descripcion: "Ejercicio para fortalecer rodilla", duracion: 45, repeticiones: 15, video_url: "https://youtube.com/watch?v=def" },
        { id: 3, nombre: "Rotación de hombro", descripcion: "Ejercicio para rehabilitación de hombro", duracion: 20, repeticiones: 12, video_url: "https://youtube.com/watch?v=ghi" },
    ]);

    // ELIMINAR EJERCICIO
    const eliminarEjercicio = (id) => {
        const confirmar = window.confirm("¿Estás segura de eliminar este ejercicio?");
        if (confirmar) {
            setEjercicios(ejercicios.filter((e) => e.id !== id));
        }
    };

    return (
        <>
            <NavbarFunction />
            <div className="rutinas-container">

                {/* ENCABEZADO */}
                <div className="rutinas-header">
                    <h1 className="rutinas-title">Ejercicios</h1>
                    <a href="/ejercicios/nuevo" className="btn-crear">
                        <FaPlus /> Nuevo Ejercicio
                    </a>
                </div>

                {/* TABLA */}
                <table className="rutinas-tabla">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Duración (seg)</th>
                            <th>Repeticiones</th>
                            <th>Video</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ejercicios.map((ejercicio) => (
                            <tr key={ejercicio.id}>
                                <td>{ejercicio.id}</td>
                                <td>{ejercicio.nombre}</td>
                                <td>{ejercicio.descripcion}</td>
                                <td>{ejercicio.duracion}s</td>
                                <td>{ejercicio.repeticiones}</td>
                                <td>
                                    {/* ENLACE AL VIDEO */}
                                    <a href={ejercicio.video_url} target="_blank" rel="noreferrer" className="btn-editar">
                                        Ver video
                                    </a>
                                </td>
                                <td className="acciones">
                                    <a href={`/ejercicios/editar/${ejercicio.id}`} className="btn-editar">
                                        <FaEdit /> Editar
                                    </a>
                                    <button className="btn-eliminar" onClick={() => eliminarEjercicio(ejercicio.id)}>
                                        <FaTrash /> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
}