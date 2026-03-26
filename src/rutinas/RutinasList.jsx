// AQUI ESTARÁN LAS RUTINAS
import NavbarFunction from "../components/Navbar";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import './rutinas.css';
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function RutinasList() {

    // DATOS DE EJEMPLO (se reemplazarán con datos reales de la BD)
    const [ rutinas, setRutinas]  = useState([]);

    useEffect(()=>{
        api.get('/rutinas')
        .then(res=>{
            setRutinas(res.data.data || res.data);
        })
        .catch(err=>console.error("Error al cargar rutinas", err));
    }, []);
    // FUNCION PARQA ELIMIANR
    const eliminarRutina = async(id) =>{
        // CONFIRMAR
        const confirmar = window.confirm("¿Estás seguro de eliminar esta rutina?");
        if(confirmar){
            try{
                await api.delete(`/rutinas/${id}`);
                setRutinas(rutinas.filter((rutina)=>(rutina.id_rutina || rutina.id) !== id));
                alert("Rutina eliminada");
            }catch(error){
                alert("Error al eliminar rutina");
                console.error(error);
            }
        }
    };

    return (
        <>
            <NavbarFunction />
            <div className="rutinas-container">

                {/* ENCABEZADO CON TÍTULO Y BOTÓN CREAR */}
                <div className="rutinas-header">
                    <h1 className="rutinas-title">Rutinas</h1>
                    <a href="/rutinas/nueva" className="btn-crear">
                        <FaPlus /> Nueva Rutina
                    </a>
                </div>

                {/* TABLA DE RUTINAS */}
                <table className="rutinas-tabla">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titulo</th>
                            <th>Descripción</th>
                            <th>Ejercicios</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* MAPEO DEL ARREGLO DE RUTINAS */}
                        {rutinas.map((rutina) => (
                            <tr key={rutina.id_rutina || rutina.id}>
                                <td>{rutina.id_rutina || rutina.id}</td>
                                <td>{rutina.titulo}</td>
                                <td>{rutina.descripcion}</td>
                                <td>{rutina.ejercicios?.length || 0}</td>
                                <td className="acciones">
                                    {/* BOTÓN EDITAR */}
                                    <a href={`/rutinas/editar/${rutina.id_rutina || rutina.id}`} className="btn-editar">
                                        <FaEdit /> Editar
                                    </a>
                                    {/* BOTÓN ELIMINAR */}
                                    <button className="btn-eliminar" onClick={() => eliminarRutina(rutina.id_rutina || rutina.id)}>
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