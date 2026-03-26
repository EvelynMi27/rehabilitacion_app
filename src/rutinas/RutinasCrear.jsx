import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import './rutinas.css';

export default function NuevaRutina() {
    const navigate = useNavigate();
    
    // Estados de la Rutina
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const[pacienteId, setPacienteId]=useState("");
    const [pacientesLista, setPacientesLista]=useState([]);
    // Estado para los ejercicios dinámicos (iniciamos con un ejercicio vacío)
    const [ejercicios, setEjercicios] = useState([
        { id_temp: Date.now(), nombre: "", descripcion: "", duracion: "", repeticiones: "", video_url: "" }
    ]);

    useEffect(()=>{
        const cargarPacientes=async()=>{
            try{
                const response=await api.get('/pacientes');
                setPacientesLista(response.data.data || response.data);
            }catch(error){
                console.error("Error al cargar la lista de pacientes", error);
            }
        };
        cargarPacientes();
    },[]);
    // Agrega un nuevo bloque de ejercicio en blanco
    const agregarBloqueEjercicio = () => {
        setEjercicios([
            ...ejercicios,
            { id_temp: Date.now(), nombre: "", descripcion: "", duracion: "", repeticiones: "", video_url: "" }
        ]);
    };

    // Elimina un bloque de ejercicio
    const quitarBloqueEjercicio = (id_temp) => {
        setEjercicios(ejercicios.filter(e => e.id_temp !== id_temp));
    };

    // Actualiza los datos de un ejercicio específico
    const handleEjercicioChange = (id_temp, campo, valor) => {
        const nuevosEjercicios = ejercicios.map(ej => {
            if (ej.id_temp === id_temp) {
                return { ...ej, [campo]: valor };
            }
            return ej;
        });
        setEjercicios(nuevosEjercicios);
    };

    const guardarRutina = async () => {
        if (!nombre.trim()) return alert("El nombre de la rutina es obligatorio");
        if(!pacienteId) return alert("Debes seleccionar a un paciente");
        if (ejercicios.length === 0) return alert("Debes agregar al menos un ejercicio");

        // Validamos que los ejercicios no estén vacíos
        const ejerciciosIncompletos = ejercicios.some(ej => !ej.nombre.trim() || !ej.duracion || !ej.repeticiones);
        if (ejerciciosIncompletos) return alert("Por favor completa los campos obligatorios de todos los ejercicios.");

        try {
            // El payload ahora lleva los datos de los ejercicios completos para crearlos en Laravel
            const payload = {
                titulo: nombre,
                descripcion: descripcion,
                paciente_id:Number(pacienteId),
                ejercicios: ejercicios.map(ej => ({
                    nombre: ej.nombre,
                    descripcion: ej.descripcion,
                    duracion: Number(ej.duracion),
                    repeticiones: Number(ej.repeticiones),
                    video_url: ej.video_url
                }))
            };

            await api.post('/rutinas', payload);
            alert("Rutina y ejercicios guardados correctamente");
            navigate("/rutinas");
        } catch (error) {
            console.error(error);
            alert("Error al guardar: " + (error.response?.data?.message || "Revisa la consola"));
        }
    };

    return (
        <>
            <NavbarFunction />
            <div className="rutinas-container">
                <div className="rutinas-header">
                    <div className="header-left">
                        <button onClick={() => navigate("/rutinas")} className="btn-regresar" style={{ border: 'none', cursor: 'pointer' }}>
                            <FaArrowLeft /> Regresar
                        </button>
                        <h1 className="rutinas-title">Nueva Rutina</h1>
                    </div>
                    <button className="btn-guardar" onClick={guardarRutina}>
                        <FaSave /> Guardar Rutina
                    </button>
                </div>

                <div className="nueva-rutina-grid" style={{ gridTemplateColumns: "1fr" }}>
                    
                    {/* DATOS DE LA RUTINA */}
                    <div className="form-card">
                        <h2 className="form-card-title">Datos de la rutina</h2>
                        <div className="form-group">
                            <label>Nombre de la rutina *</label>
                            <input type="text" placeholder="Ej: Rutina de hombro" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea placeholder="Describe el objetivo de la rutina..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="form-input form-textarea" />
                        </div>
                        <div className="form-group">
                            <label>Asignar a paciente *</label>
                            <select 
                                className="form-input" 
                                value={pacienteId} 
                                onChange={(e) => setPacienteId(e.target.value)}
                                style={{ cursor: 'pointer', backgroundColor: 'white', color:'#000' }}
                            >
                                <option value="" disabled>-- Seleccione un paciente --</option>
                                {pacientesLista.map(paciente => (
                                    <option key={paciente.id} value={paciente.id}>
                                        {paciente.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* CREACIÓN DE EJERCICIOS */}
                    <div className="form-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h2 className="form-card-title" style={{ margin: 0 }}>Ejercicios de esta rutina</h2>
                            <button className="btn-agregar" onClick={agregarBloqueEjercicio}>
                                <FaPlus /> Agregar Ejercicio
                            </button>
                        </div>

                        {ejercicios.length === 0 && <p className="empty-msg">No has agregado ejercicios</p>}

                        {ejercicios.map((ej, index) => (
                            <div key={ej.id_temp} style={{ border: '1px solid rgb(220, 230, 240)', padding: '15px', borderRadius: '10px', marginBottom: '15px', background: 'rgb(245, 249, 252)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <strong>Ejercicio {index + 1}</strong>
                                    <button className="btn-quitar" onClick={() => quitarBloqueEjercicio(ej.id_temp)}>
                                        <FaTrash />
                                    </button>
                                </div>
                                
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                    <div className="form-group">
                                        <label>Nombre *</label>
                                        <input type="text" className="form-input" value={ej.nombre} onChange={(e) => handleEjercicioChange(ej.id_temp, 'nombre', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Video URL</label>
                                        <input type="text" className="form-input" value={ej.video_url} onChange={(e) => handleEjercicioChange(ej.id_temp, 'video_url', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Duración (seg) *</label>
                                        <input type="number" className="form-input" value={ej.duracion} onChange={(e) => handleEjercicioChange(ej.id_temp, 'duracion', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Repeticiones *</label>
                                        <input type="number" className="form-input" value={ej.repeticiones} onChange={(e) => handleEjercicioChange(ej.id_temp, 'repeticiones', e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label>Descripción</label>
                                    <input type="text" className="form-input" value={ej.descripcion} onChange={(e) => handleEjercicioChange(ej.id_temp, 'descripcion', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}