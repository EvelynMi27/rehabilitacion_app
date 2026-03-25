// AQUI SE CREA LAS RUTINAS

import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave,FaPlus,FaTrash } from "react-icons/fa";
import { useState } from "react";
import './rutinas.css';

export default function NuevaRutina(){
    // ESTADOS PARA EL FORMULARIO
    const [nombre, setNombre] = useState("");
    const [ descripcion, setDescripcion] = useState("");

    // EJERCICIOS DISPONIBLES
       const ejerciciosDisponibles = [
        { id: 1, nombre: "Elevación de brazo" },
        { id: 2, nombre: "Flexión de rodilla" },
        { id: 3, nombre: "Rotación de hombro" },
        { id: 4, nombre: "Extensión de muñeca" },
        { id: 5, nombre: "Estiramiento lumbar" },
        { id: 6, nombre: "Fortalecimiento de cuádriceps" },
    ];

    // Ejercicios seleccionados para la rutina
     const [ejercicios,setEjercicios] = useState([]);

    //  Agregar un ejercicio a la rutina
    const agregarEjercicio = (ejercicio) =>{
        // Evitar duplicados
        const AgregadoYa = ejercicios.find((e) => e.id ===ejercicio.id);
        if(AgregadoYa) return;
        setEjercicios([...ejercicios,ejercicio]);
        
    };

    // Quitar el ejercicio de la rutina
    const quitarEjercicio = (id) =>{
        setEjercicios(ejercicios.filter((e) => e.id !==id));
    };

    // GUARDAR (SOLO MUESTRA ENN CONSOLA)
    const guardarRutina = () =>{
        if(!nombre.trim()){
            alert("El nombre de la rutina es obligatorio");
            return;
        }
        if(ejercicios.length===0){
            alert("Debes agregar al menos un ejercicio");
            return;
        }
        // AQUI ES LA PETICIÓN
        console.log({
            nombre, descripcion, ejercicios_id: ejercicios.map((e) =>e.id)
        });

        alert("Rutina guardada correctamente");
    };

    return(
        <><NavbarFunction /><div className="rutinas-container">

            {/* ENCABEZADO */}
            <div className="rutinas-header">
                <div className="header-left">
                    {/* BOTÓN REGRESAR */}
                    <a href="/rutinas" className="btn-regresar">
                        <FaArrowLeft /> Regresar
                    </a>
                    <h1 className="rutinas-title">Nueva Rutina</h1>
                </div>

                {/* BOTÓN GUARDAR */}
                <button className="btn-guardar" onClick={guardarRutina}>
                    <FaSave /> Guardar Rutina
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
                            placeholder="Ej: Rutina de hombro"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="form-input" />
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            placeholder="Describe el objetivo de la rutina..."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="form-input form-textarea" />
                    </div>

                    {/* EJERCICIOS SELECCIONADOS */}
                    <h2 className="form-card-title" style={{ marginTop: "20px" }}>
                        Ejercicios agregados ({ejercicios.length})
                    </h2>

                    {ejercicios.length === 0 ? (
                        <p className="empty-msg">No has agregado ejercicios aún</p>
                    ) : (
                        <ul className="ejercicios-seleccionados">
                            {ejercicios.map((e) => (
                                <li key={e.id}>
                                    <span>{e.nombre}</span>
                                    {/* QUITAR EJERCICIO */}
                                    <button
                                        className="btn-quitar"
                                        onClick={() => quitarEjercicio(e.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* COLUMNA DERECHA — LISTA DE EJERCICIOS DISPONIBLES */}
                <div className="form-card">
                    <h2 className="form-card-title">Ejercicios disponibles</h2>
                    <ul className="ejercicios-disponibles">
                        {ejerciciosDisponibles.map((e) => (
                            <li key={e.id}>
                                <span>{e.nombre}</span>
                                {/* AGREGAR EJERCICIO */}
                                <button
                                    className="btn-agregar"
                                    onClick={() => agregarEjercicio(e)}
                                >
                                    <FaPlus /> Agregar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div></>

    )
}