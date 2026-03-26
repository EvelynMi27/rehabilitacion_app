import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import './rutinas.css';

export default function EditarRutina() {
    const { id } = useParams(); // ID de la rutina desde la URL
    const navigate = useNavigate();

    // Estados de la Rutina
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    
    // Estado para los ejercicios (existentes con id_ejer o nuevos con id_temp)
    const [ejercicios, setEjercicios] = useState([]);
    const [ejerciciosBorrarIds, setEjerciciosBorrarIds] = useState([]); // Rastrea los que eliminamos
    const [cargando, setCargando] = useState(true);

    // 1. CARGAMOS LOS DATOS (¡Sin buscar el catálogo de /ejercicios!)
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await api.get(`/rutinas/${id}`);
                const dataRutina = response.data.data;

                setNombre(dataRutina.titulo);
                setDescripcion(dataRutina.descripcion);
                setEjercicios(dataRutina.ejercicios || []);

            } catch (error) {
                console.error("Error al cargar datos", error);
                alert("No se pudo cargar la informacion de la rutina");
                navigate("/rutinas");
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, [id, navigate]);

    // Agregar un bloque nuevo vacío
    const agregarBloqueEjercicioNuevo = () => {
        setEjercicios([
            ...ejercicios,
            { id_temp: Date.now(), nombre: "", descripcion: "", duracion: "", repeticiones: "", video_url: "" }
        ]);
    };

    // Quitar bloque de la vista (y anotarlo para borrar en BD si ya existía)
    const quitarBloqueEjercicio = (ejercicioTarget) => {
        if (ejercicioTarget.id_ejer) {
            setEjerciciosBorrarIds([...ejerciciosBorrarIds, ejercicioTarget.id_ejer]);
        }
        setEjercicios(ejercicios.filter(e => {
            if (e.id_ejer) return e.id_ejer !== ejercicioTarget.id_ejer;
            return e.id_temp !== ejercicioTarget.id_temp;
        }));
    };

    // Actualizar campos
    const handleEjercicioChange = (identifier, isNew, campo, valor) => {
        const nuevosEjercicios = ejercicios.map(ej => {
            const match = isNew ? (ej.id_temp === identifier) : (ej.id_ejer === identifier);
            if (match) {
                return { ...ej, [campo]: valor };
            }
            return ej;
        });
        setEjercicios(nuevosEjercicios);
    };

    // Guardar en Laravel
    const guardarCambios = async () => {
        if (!nombre.trim()) return alert("El nombre de la rutina es obligatorio");
        if (ejercicios.length === 0) return alert("La rutina debe tener al menos un ejercicio");

        const ejerciciosIncompletos = ejercicios.some(ej => !ej.nombre.trim() || !ej.duracion || !ej.repeticiones);
        if (ejerciciosIncompletos) return alert("Completa los campos obligatorios (* ) de todos los ejercicios.");

        try {
            const payload = {
                titulo: nombre,
                descripcion: descripcion,
                ejercicios: ejercicios, 
                ejercicios_borrar_ids: ejerciciosBorrarIds 
            };

            await api.put(`/rutinas/${id}`, payload);
            alert("Rutina y ejercicios actualizados correctamente");
            navigate("/rutinas");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar: " + (error.response?.data?.message || "Revisa la consola"));
        }
    };

    if (cargando) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando datos de la rutina...</p>;

    return (
        <>
            <NavbarFunction />
            <div className="rutinas-container">
                <div className="rutinas-header">
                    <div className="header-left">
                        <button onClick={() => navigate("/rutinas")} className="btn-regresar" style={{ border: 'none', cursor: 'pointer' }}>
                            <FaArrowLeft /> Regresar
                        </button>
                        <h1 className="rutinas-title">Editar Rutina</h1>
                    </div>
                    <button className="btn-guardar" onClick={guardarCambios}>
                        <FaSave /> Guardar Cambios
                    </button>
                </div>

                <div className="nueva-rutina-grid" style={{ gridTemplateColumns: "1fr" }}>
                    
                    {/* DATOS DE LA RUTINA */}
                    <div className="form-card">
                        <h2 className="form-card-title">Datos básicos</h2>
                        <div className="form-group">
                            <label>Nombre de la rutina *</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="form-input form-textarea" />
                        </div>
                    </div>

                    {/* EDICIÓN/CREACIÓN DE EJERCICIOS */}
                    <div className="form-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h2 className="form-card-title" style={{ margin: 0 }}>Ejercicios ({ejercicios.length})</h2>
                            <button className="btn-agregar" onClick={agregarBloqueEjercicioNuevo}>
                                <FaPlus /> Agregar Nuevo Ejercicio
                            </button>
                        </div>

                        {ejercicios.length === 0 && <p className="empty-msg">No hay ejercicios asignados. Agrega uno.</p>}

                        {ejercicios.map((ej, index) => {
                            const isNew = !!ej.id_temp;
                            const identifier = isNew ? ej.id_temp : ej.id_ejer;
                            
                            return (
                                <div key={identifier} style={{ border: '1px solid rgb(220, 230, 240)', padding: '15px', borderRadius: '10px', marginBottom: '15px', background: isNew ? 'rgb(255, 253, 240)' : 'rgb(245, 249, 252)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <strong>
                                            Ejercicio {index + 1} {isNew ? <span style={{color: '#f39c12', fontWeight: 'normal', marginLeft: '5px'}}>(Nuevo)</span> : ''}
                                        </strong>
                                        <button className="btn-quitar" onClick={() => quitarBloqueEjercicio(ej)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                    
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                        <div className="form-group">
                                            <label>Nombre *</label>
                                            <input type="text" className="form-input" value={ej.nombre} onChange={(e) => handleEjercicioChange(identifier, isNew, 'nombre', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Video URL</label>
                                            <input type="text" className="form-input" value={ej.video_url || ''} onChange={(e) => handleEjercicioChange(identifier, isNew, 'video_url', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Duración (seg) *</label>
                                            <input type="number" className="form-input" value={ej.duracion} onChange={(e) => handleEjercicioChange(identifier, isNew, 'duracion', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Repeticiones *</label>
                                            <input type="number" className="form-input" value={ej.repeticiones} onChange={(e) => handleEjercicioChange(identifier, isNew, 'repeticiones', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginTop: '10px' }}>
                                        <label>Descripción</label>
                                        <input type="text" className="form-input" value={ej.descripcion || ''} onChange={(e) => handleEjercicioChange(identifier, isNew, 'descripcion', e.target.value)} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </>
    );
}