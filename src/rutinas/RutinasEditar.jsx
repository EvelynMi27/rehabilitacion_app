// PÁGINA PARA EDITAR UNA RUTINA
import NavbarFunction from "../components/Navbar";
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './rutinas.css';

export default function EditarRutina() {

    // OBTENEMOS EL ID DE LA URL (/rutinas/editar/1)
    const { id } = useParams();
    const navigate=useNavigate();
    const[nombre, setNombre]=useState("");
    const[descripcion, setDescripcion]=useState("");
    const[ejerciciosSeleccionados, setEjerciciosSeleccionados]=useState([]);
    const[ejerciciosDisponibles, setEjerciciosDisponibles]=useState([]);
    const[cargando, setCargando]=useState(true);

    useEffect(()=>{
        const cargarDatos= async ()=>{
            try{
                const [resEjercicios, resRutina]= await Promise.all([
                    api.get('/ejercicios'),
                    api.get(`/rutinas/${id}`)
                ]);

                setEjerciciosDisponibles(resEjercicios.data.data || resEjercicios.data);
                const dataRutina=resRutina.data.data || resRutina.data;
                setNombre(dataRutina.titulo);
                setDescripcion(dataRutina.descripcion);
                setEjerciciosSeleccionados(dataRutina.ejercicios || []);
            }catch(error){
                console.error("Error al cargar datos", error);
                alert("No se pudo cargar la informacion");
            }finally{
                setCargando(false);
            }
        };
        cargarDatos();
    }, [id]);
    // AGREGAR EJERCICIO (evita duplicados)
    const agregarEjercicio = (ejercicio) => {
        const yaAgregado = ejerciciosSeleccionados.find((e) => e.id === ejercicio.id);
        if (yaAgregado) return;
        setEjerciciosSeleccionados([...ejerciciosSeleccionados, ejercicio]);
    };

    // QUITAR EJERCICIO
    const quitarEjercicio = (ejercicioId) => {
        setEjerciciosSeleccionados(ejerciciosSeleccionados.filter((e) => e.id !== ejercicioId));
    };

    // GUARDAR CAMBIOS (por ahora solo muestra en consola)
    const guardarCambios = async () => {
        if (!nombre.trim()) {
            alert("El nombre de la rutina es obligatorio");
            return;
        }
        if (ejerciciosSeleccionados.length === 0) {
            alert("Debes agregar al menos un ejercicio");
            return;
        }

        try{
            await api.put(`/rutinas/${id}`,{
                titulo: nombre,
                descripcion:descripcion,
                ejercicios_ids:ejerciciosSeleccionados.map((e)=>e.id)
            });

            alert("Rutina actualizada correctamente");
            navigate("/rutinas");
        }catch(error){
            console.error(error);
            alert("Error al actualizar la rutina");
        }
        
    };

    if(cargando) return <p style={{textAlign:'center', marginTop:'50px'}}>Cargando...</p>

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