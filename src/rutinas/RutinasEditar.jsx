// PÁGINA PARA EDITAR UNA RUTINA
import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './rutinas.css';

export default function EditarRutina() {

    // OBTENEMOS EL ID DE LA URL (/rutinas/editar/1)
    const { id } = useParams();

    // DATOS DE EJEMPLO (luego vendrán de la BD según el id)
    const rutinaInicial = {
        1: { nombre: "Rutina de hombro", descripcion: "Ejercicios para rehabilitación de hombro", ejercicios_id: [1, 2, 3, 4] },
        2: { nombre: "Rutina de rodilla", descripcion: "Ejercicios para rehabilitación de la rodilla", ejercicios_id: [5, 6, 10] },
        3: { nombre: "Rutina de mano", descripcion: "Ejercicios para rehabilitación de mano", ejercicios_id: [7, 8, 9] },
    };

    // EJERCICIOS DISPONIBLES (luego vendrán de la BD)
    const ejerciciosDisponibles = [
        { id: 1, nombre: "Elevación de brazo" },
        { id: 2, nombre: "Flexión de rodilla" },
        { id: 3, nombre: "Rotación de hombro" },
        { id: 4, nombre: "Extensión de muñeca" },
        { id: 5, nombre: "Estiramiento lumbar" },
        { id: 6, nombre: "Fortalecimiento de cuádriceps" },
        { id: 7, nombre: "Apertura de dedos" },
        { id: 8, nombre: "Flexión de muñeca" },
        { id: 9, nombre: "Pinza digital" },
        { id: 10, nombre: "Sentadilla asistida" },
    ];

    // CARGAMOS LOS DATOS DE LA RUTINA A EDITAR
    const rutina = rutinaInicial[id];

    // ESTADOS CON LOS VALORES ACTUALES DE LA RUTINA
    const [nombre, setNombre] = useState(rutina?.nombre || "");
    const [descripcion, setDescripcion] = useState(rutina?.descripcion || "");

    // EJERCICIOS YA ASIGNADOS A LA RUTINA
    const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState(
        ejerciciosDisponibles.filter((e) => rutina?.ejercicios_id.includes(e.id))
    );

    // AGREGAR EJERCICIO (evita duplicados)
    const agregarEjercicio = (ejercicio) => {
        const yaAgregado = ejerciciosSeleccionados.find((e) => e.id === ejercicio.id);
        if (yaAgregado) return;
        setEjerciciosSeleccionados([...ejerciciosSeleccionados, ejercicio]);
    };

    // QUITAR EJERCICIO
    const quitarEjercicio = (id) => {
        setEjerciciosSeleccionados(ejerciciosSeleccionados.filter((e) => e.id !== id));
    };

    // GUARDAR CAMBIOS (por ahora solo muestra en consola)
    const guardarCambios = () => {
        if (!nombre.trim()) {
            alert("El nombre de la rutina es obligatorio");
            return;
        }
        if (ejerciciosSeleccionados.length === 0) {
            alert("Debes agregar al menos un ejercicio");
            return;
        }

        // AQUÍ IRÁ LA PETICIÓN PUT/PATCH A LA BD
        console.log({
            id,
            nombre,
            descripcion,
            ejercicios_ids: ejerciciosSeleccionados.map((e) => e.id)
        });

        alert("Rutina actualizada correctamente");
    };

    // SI NO EXISTE LA RUTINA
    if (!rutina) {
        return (
            <>
                <NavbarFunction />
                <div className="rutinas-container">
                    <p>Rutina no encontrada.</p>
                    <a href="/rutinas" className="btn-regresar"><FaArrowLeft /> Regresar</a>
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
                        <a href="/rutinas" className="btn-regresar">
                            <FaArrowLeft /> Regresar
                        </a>
                        <h1 className="rutinas-title">Editar Rutina</h1>
                    </div>

                    {/* BOTÓN GUARDAR */}
                    <button className="btn-guardar" onClick={guardarCambios}>
                        <FaSave /> Guardar Cambios
                    </button>
                </div>

                <div className="nueva-rutina-grid">

                    {/* COLUMNA IZQUIERDA — DATOS DE LA RUTINA */}
                    <div className="form-card">
                        <h2 className="form-card-title">Datos de la rutina</h2>

                        {/* NOMBRE */}
                        <div className="form-group">
                            <label>Nombre de la rutina *</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        {/* DESCRIPCIÓN */}
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="form-input form-textarea"
                            />
                        </div>

                        {/* EJERCICIOS SELECCIONADOS */}
                        <h2 className="form-card-title" style={{ marginTop: "20px" }}>
                            Ejercicios agregados ({ejerciciosSeleccionados.length})
                        </h2>

                        {ejerciciosSeleccionados.length === 0 ? (
                            <p className="empty-msg">No hay ejercicios en esta rutina</p>
                        ) : (
                            <ul className="ejercicios-seleccionados">
                                {ejerciciosSeleccionados.map((e) => (
                                    <li key={e.id}>
                                        <span>{e.nombre}</span>
                                        {/* QUITAR EJERCICIO */}
                                        <button className="btn-quitar" onClick={() => quitarEjercicio(e.id)}>
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* COLUMNA DERECHA — EJERCICIOS DISPONIBLES */}
                    <div className="form-card">
                        <h2 className="form-card-title">Ejercicios disponibles</h2>
                        <ul className="ejercicios-disponibles">
                            {ejerciciosDisponibles.map((e) => (
                                <li key={e.id}>
                                    <span>{e.nombre}</span>
                                    <button className="btn-agregar" onClick={() => agregarEjercicio(e)}>
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