import { useState } from "react";
import { FaCheckCircle, FaCircle, FaDumbbell, FaClock, FaFire, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './paciente.css';
import { useNavigate } from "react-router-dom";

// Datos de ejemplo
const rutinasMock = [
  {
    id: 1,
    nombre: "Rutina de fuerza - Tren superior",
    descripcion: "Fortalecimiento de hombros, pecho y brazos.",
    duracion: "45 min",
    calorias: "320 kcal",
    completada: false,
    ejercicios: [
      { id: 101, nombre: "Press de banca", series: 3, repeticiones: 12, completado: false },
      { id: 102, nombre: "Remo con mancuerna", series: 3, repeticiones: 10, completado: false },
      { id: 103, nombre: "Elevaciones laterales", series: 3, repeticiones: 15, completado: false },
    ],
  },
  {
    id: 2,
    nombre: "Movilidad y flexibilidad",
    descripcion: "Sesión suave de estiramientos y movilidad articular.",
    duracion: "30 min",
    calorias: "120 kcal",
    completada: false,
    ejercicios: [
      { id: 201, nombre: "Estiramiento de cadera", series: 2, repeticiones: 60, completado: false },
      { id: 202, nombre: "Rotación de hombros", series: 2, repeticiones: 20, completado: false },
    ],
  },
  {
    id: 3,
    nombre: "Cardio intervalado",
    descripcion: "HIIT de baja intensidad para mejorar resistencia.",
    duracion: "25 min",
    calorias: "280 kcal",
    completada: true,
    ejercicios: [
      { id: 301, nombre: "Jumping jacks", series: 4, repeticiones: 30, completado: true },
      { id: 302, nombre: "Sentadillas con salto", series: 4, repeticiones: 15, completado: true },
    ],
  },
];

export default function PacienteDashboardPage() {
  const [rutinas, setRutinas] = useState(rutinasMock);
  const [expandida, setExpandida] = useState(null);
    const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  const toggleExpand = (id) => {
    setExpandida((prev) => (prev === id ? null : id));
  };

  const marcarEjercicio = (rutinaId, ejercicioId) => {
    setRutinas((prev) =>
      prev.map((r) => {
        if (r.id !== rutinaId) return r;
        const ejerciciosActualizados = r.ejercicios.map((e) =>
          e.id === ejercicioId ? { ...e, completado: !e.completado } : e
        );
        const todasCompletas = ejerciciosActualizados.every((e) => e.completado);
        return { ...r, ejercicios: ejerciciosActualizados, completada: todasCompletas };
      })
    );
  };

  const marcarRutinaCompleta = (rutinaId) => {
    setRutinas((prev) =>
      prev.map((r) => {
        if (r.id !== rutinaId) return r;
        const nuevoEstado = !r.completada;
        return {
          ...r,
          completada: nuevoEstado,
          ejercicios: r.ejercicios.map((e) => ({ ...e, completado: nuevoEstado })),
        };
      })
    );
  };

  const completadas = rutinas.filter((r) => r.completada).length;
  const progreso = Math.round((completadas / rutinas.length) * 100);

  return (
    <>
      <div className="pac-container">

        {/* ENCABEZADO */}
        <div className="pac-header">
          <div>
            <p className="pac-saludo">¡Hola de nuevo 👋</p>
            <h1 className="pac-titulo">Mis rutinas asignadas</h1>
          </div>
          <div className="pac-progreso-wrap">
            <span className="pac-progreso-label">{completadas}/{rutinas.length} completadas</span>
            <div className="pac-barra-bg">
              <div className="pac-barra-fill" style={{ width: `${progreso}%` }} />
            </div>
            <span className="pac-progreso-pct">{progreso}%</span>
                {/* BOTÓN CERRAR SESIÓN */}
          <button className="pac-logout-btn" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
          </div>
        </div>

        {/* LISTA DE RUTINAS */}
        <div className="pac-lista">
          {rutinas.map((rutina) => {
            const abierta = expandida === rutina.id;
            const ejs = rutina.ejercicios;
            const ejsCompletos = ejs.filter((e) => e.completado).length;

            return (
              <div
                key={rutina.id}
                className={`pac-card ${rutina.completada ? "pac-card--completa" : ""}`}
              >
                {/* CABECERA DE LA TARJETA */}
                <div className="pac-card-header">
                  <button
                    className="pac-check-btn"
                    onClick={() => marcarRutinaCompleta(rutina.id)}
                    title={rutina.completada ? "Marcar como pendiente" : "Marcar como completa"}
                  >
                    {rutina.completada
                      ? <FaCheckCircle className="pac-icon-check pac-icon-check--done" />
                      : <FaCircle className="pac-icon-check pac-icon-check--pending" />}
                  </button>

                  <div className="pac-card-info" onClick={() => toggleExpand(rutina.id)}>
                    <h3 className={`pac-card-nombre ${rutina.completada ? "tachado" : ""}`}>
                      {rutina.nombre}
                    </h3>
                    <p className="pac-card-desc">{rutina.descripcion}</p>
                    <div className="pac-meta">
                      <span><FaClock className="meta-icon" /> {rutina.duracion}</span>
                      <span><FaFire className="meta-icon" /> {rutina.calorias}</span>
                      <span><FaDumbbell className="meta-icon" /> {ejsCompletos}/{ejs.length} ejercicios</span>
                    </div>
                  </div>

                  <button className="pac-expand-btn" onClick={() => toggleExpand(rutina.id)}>
                    {abierta ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                {/* MINI BARRA DE EJERCICIOS */}
                <div className="pac-mini-barra-bg">
                  <div
                    className="pac-mini-barra-fill"
                    style={{ width: `${ejs.length ? (ejsCompletos / ejs.length) * 100 : 0}%` }}
                  />
                </div>

                {/* EJERCICIOS DESPLEGABLES */}
                {abierta && (
                  <div className="pac-ejercicios">
                    {ejs.map((ej) => (
                      <div
                        key={ej.id}
                        className={`pac-ejercicio ${ej.completado ? "pac-ejercicio--done" : ""}`}
                        onClick={() => marcarEjercicio(rutina.id, ej.id)}
                      >
                        <span className="pac-ej-check">
                          {ej.completado
                            ? <FaCheckCircle className="pac-icon-check pac-icon-check--done pac-icon-sm" />
                            : <FaCircle className="pac-icon-check pac-icon-check--pending pac-icon-sm" />}
                        </span>
                        <span className={`pac-ej-nombre ${ej.completado ? "tachado" : ""}`}>{ej.nombre}</span>
                        <span className="pac-ej-detalle">{ej.series} series × {ej.repeticiones} reps</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MENSAJE CUANDO TODO ESTÁ COMPLETO */}
        {progreso === 100 && (
          <div className="pac-felicidades">
            🎉 ¡Completaste todas tus rutinas del día! ¡Excelente trabajo!
          </div>
        )}
      </div>
    </>
  );
}