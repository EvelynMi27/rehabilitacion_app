// EDITAR EJERCICIO
import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './ejercicios.css';

export default function EditarEjercicio() {

    const { id } = useParams();

    // DATOS DE EJEMPLO (luego vendrán de la BD)
    const ejerciciosData = {
        1: { nombre: "Elevación de brazo", descripcion: "Ejercicio para movilidad de hombro", duracion: 30, repeticiones: 10, video_url: "https://youtube.com/watch?v=abc" },
        2: { nombre: "Flexión de rodilla", descripcion: "Ejercicio para fortalecer rodilla", duracion: 45, repeticiones: 15, video_url: "https://youtube.com/watch?v=def" },
        3: { nombre: "Rotación de hombro", descripcion: "Ejercicio para rehabilitación de hombro", duracion: 20, repeticiones: 12, video_url: "https://youtube.com/watch?v=ghi" },
    };

    const ejercicioInicial = ejerciciosData[id];

    // ESTADO DEL FORMULARIO CON DATOS ACTUALES
    const [form, setForm] = useState({
        nombre: ejercicioInicial?.nombre || "",
        descripcion: ejercicioInicial?.descripcion || "",
        duracion: ejercicioInicial?.duracion || "",
        repeticiones: ejercicioInicial?.repeticiones || "",
        video_url: ejercicioInicial?.video_url || "",
    });

    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrores({ ...errores, [e.target.name]: "" });
    };

    const esUrlValida = (url) => {
        try { new URL(url); return true; }
        catch { return false; }
    };

    const validar = () => {
        const nuevosErrores = {};

        if (!form.nombre.trim())
            nuevosErrores.nombre = "El nombre es obligatorio";

        if (!form.descripcion.trim())
            nuevosErrores.descripcion = "La descripción es obligatoria";

        if (!form.duracion || Number(form.duracion) <= 0)
            nuevosErrores.duracion = "La duración debe ser un número positivo";

        if (!form.repeticiones || !Number.isInteger(Number(form.repeticiones)) || Number(form.repeticiones) <= 0)
            nuevosErrores.repeticiones = "Las repeticiones deben ser un número entero positivo";

        if (!form.video_url.trim())
            nuevosErrores.video_url = "La URL del video es obligatoria";
        else if (!esUrlValida(form.video_url))
            nuevosErrores.video_url = "La URL del video no es válida";

        return nuevosErrores;
    };

    const guardarCambios = () => {
        const erroresEncontrados = validar();
        if (Object.keys(erroresEncontrados).length > 0) {
            setErrores(erroresEncontrados);
            return;
        }

        // AQUÍ IRÁ LA PETICIÓN PUT/PATCH A LA BD
        console.log({ id, ...form });
        alert("Ejercicio actualizado correctamente");
    };

    if (!ejercicioInicial) {
        return (
            <>
                <NavbarFunction />
                <div className="rutinas-container">
                    <p>Ejercicio no encontrado.</p>
                    <a href="/ejercicios" className="btn-regresar"><FaArrowLeft /> Regresar</a>
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
                        <a href="/ejercicios" className="btn-regresar">
                            <FaArrowLeft /> Regresar
                        </a>
                        <h1 className="rutinas-title">Editar Ejercicio</h1>
                    </div>
                    <button className="btn-guardar" onClick={guardarCambios}>
                        <FaSave /> Guardar Cambios
                    </button>
                </div>

                {/* FORMULARIO */}
                <div className="form-card" style={{ maxWidth: "600px" }}>

                    <div className="form-group">
                        <label>Nombre *</label>
                        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="form-input" />
                        {errores.nombre && <p className="error-msg">{errores.nombre}</p>}
                    </div>

                    <div className="form-group">
                        <label>Descripción *</label>
                        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="form-input form-textarea" />
                        {errores.descripcion && <p className="error-msg">{errores.descripcion}</p>}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>

                        <div className="form-group">
                            <label>Duración (segundos) *</label>
                            <input type="number" name="duracion" value={form.duracion} onChange={handleChange} min="1" className="form-input" />
                            {errores.duracion && <p className="error-msg">{errores.duracion}</p>}
                        </div>

                        <div className="form-group">
                            <label>Repeticiones *</label>
                            <input type="number" name="repeticiones" value={form.repeticiones} onChange={handleChange} min="1" step="1" className="form-input" />
                            {errores.repeticiones && <p className="error-msg">{errores.repeticiones}</p>}
                        </div>

                    </div>

                    <div className="form-group">
                        <label>URL del video *</label>
                        <input type="url" name="video_url" value={form.video_url} onChange={handleChange} className="form-input" />
                        {errores.video_url && <p className="error-msg">{errores.video_url}</p>}
                    </div>

                </div>
            </div>
        </>
    );
}