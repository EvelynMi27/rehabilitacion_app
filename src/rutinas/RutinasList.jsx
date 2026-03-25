// AQUI ESTARÁN LAS RUTINAS
import NavbarFunction from "../components/Navbar";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import './rutinas.css';
import { useState } from "react";

export default function RutinasList() {

    // DATOS DE EJEMPLO (se reemplazarán con datos reales de la BD)
    const [ rutinas, setRutinas]  = useState([
        { id: 1, nombre: "Rutina de hombro", descripcion: "Ejercicios para rehabilitación de hombro", ejercicios_id: [1,2,3,4]},
        { id: 2, nombre: "Rutina de rodilla", descripcion: "Ejercicios para rehabilitación de la rodilla", ejercicios_id: [5,6,10] },
        { id: 3, nombre: "Rutina de mano", descripcion: "Ejercicios para rehabilitación de mano" ,ejercicios_id: [7,8,9]},
    ]);

    // FUNCION PARQA ELIMIANR
    const eliminarRutina = (id) =>{
        // CONFIRMAR
        const confirmar = window.confirm("¿Estás seguro de eliminar esta rutina?");
        if(confirmar){
            // Filtramos y eliminamos
            setRutinas(rutinas.filter((rutina) => rutina.id !==id));
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
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Ejercicios</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* MAPEO DEL ARREGLO DE RUTINAS */}
                        {rutinas.map((rutina) => (
                            <tr key={rutina.id}>
                                <td>{rutina.id}</td>
                                <td>{rutina.nombre}</td>
                                <td>{rutina.descripcion}</td>
                                <td>{rutina.ejercicios_id.length}</td>
                                <td className="acciones">
                                    {/* BOTÓN EDITAR */}
                                    <a href={`/rutinas/editar/${rutina.id}`} className="btn-editar">
                                        <FaEdit /> Editar
                                    </a>
                                    {/* BOTÓN ELIMINAR */}
                                    <button className="btn-eliminar" onClick={() => eliminarRutina(rutina.id)}>
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