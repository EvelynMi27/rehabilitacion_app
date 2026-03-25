// CREAR EJERCICIO
import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useState } from "react";
import './ejercicios.css';

export default function NuevoEjercicio() {

    // ESTADO DEL FORMULARIO
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        duracion: "",
        repeticiones: "",
        video_url: "",
    });

    // ERRORES DE VALIDACIÓN
    const [errores, setErrores] = useState({});

    // ACTUALIZAR CAMPOS DEL FORMULARIO
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // LIMPIAR ERROR DEL CAMPO AL ESCRIBIR
        setErrores({ ...errores, [e.target.name]: "" });
    };

    // VALIDAR URL
    const esUrlValida = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    // VALIDACIONES
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

    // GUARDAR
    const guardar = () => {
        const erroresEncontrados = validar();
        if (Object.keys(erroresEncontrados).length > 0) {
            setErrores(erroresEncontrados);
            return;
        }

        // AQUÍ IRÁ LA PETICIÓN POST A LA BD
        console.log(form);
        alert("Ejercicio creado correctamente");
    };

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
                        <h1 className="rutinas-title">Nuevo Ejercicio</h1>
                    </div>
                    <button className="btn-guardar" onClick={guardar}>
                        <FaSave /> Guardar Ejercicio
                    </button>
                </div>

                {/* FORMULARIO */}
                <div className="form-card" style={{ maxWidth: "600px" }}>

                    {/* NOMBRE */}
                    <div className="form-group">
                        <label>Nombre *</label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Elevación de brazo"
                            className="form-input"
                        />
                        {errores.nombre && <p className="error-msg">{errores.nombre}</p>}
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="form-group">
                        <label>Descripción *</label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            placeholder="Describe el ejercicio..."
                            className="form-input form-textarea"
                        />
                        {errores.descripcion && <p className="error-msg">{errores.descripcion}</p>}
                    </div>

                    {/* DURACIÓN Y REPETICIONES EN DOS COLUMNAS */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>

                        {/* DURACIÓN */}
                        <div className="form-group">
                            <label>Duración (segundos) *</label>
                            <input
                                type="number"
                                name="duracion"
                                value={form.duracion}
                                onChange={handleChange}
                                placeholder="Ej: 30"
                                min="1"
                                className="form-input"
                            />
                            {errores.duracion && <p className="error-msg">{errores.duracion}</p>}
                        </div>

                        {/* REPETICIONES */}
                        <div className="form-group">
                            <label>Repeticiones *</label>
                            <input
                                type="number"
                                name="repeticiones"
                                value={form.repeticiones}
                                onChange={handleChange}
                                placeholder="Ej: 10"
                                min="1"
                                step="1"
                                className="form-input"
                            />
                            {errores.repeticiones && <p className="error-msg">{errores.repeticiones}</p>}
                        </div>

                    </div>

                    {/* VIDEO URL */}
                    <div className="form-group">
                        <label>URL del video *</label>
                        <input
                            type="url"
                            name="video_url"
                            value={form.video_url}
                            onChange={handleChange}
                            placeholder="https://youtube.com/watch?v=..."
                            className="form-input"
                        />
                        {errores.video_url && <p className="error-msg">{errores.video_url}</p>}
                    </div>

                </div>
            </div>
        </>
    );
}