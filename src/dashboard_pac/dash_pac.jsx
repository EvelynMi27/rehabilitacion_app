import { useState, useEffect } from "react";
import { FaCheckCircle, FaCircle, FaDumbbell, FaClock, FaFire, FaChevronDown, FaChevronUp, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import './paciente.css';

const getYoutubeEmbedUrl=(url)=>{
    if(!url) return null;
    const regExp= /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match=url.match(regExp);
    if(match && match[2].length ===11){
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
}

export default function PacienteDashboardPage() {
  const [rutinas, setRutinas] = useState([]);
  const [expandida, setExpandida] = useState(null);
  const[cargando, setCargando]=useState(true);
const navigate=useNavigate();
  useEffect(()=>{
    const cargarMisRutinas= async()=>{
        try{
            const user = JSON.parse(localStorage.getItem('user'));
            if(!user || !user.id){
                console.error("No se encontro usuario en sesion");
                navigate("/");
                return;
            }
            const response=await api.get(`/mis-rutinas/${user.id}`);
            setRutinas(response.data.data || []);
        }catch(error){
            console.error("Error al cargar mis rutinas",error);
        }finally{
            setCargando(false);
        }
    };
    cargarMisRutinas();
  },[navigate]);

  const toggleExpand = (id) => {
    setExpandida((prev) => (prev === id ? null : id));
  };

  const marcarEjercicio = async (rutinaId, ejercicioId) => {
    
    // 1. Buscamos la rutina exacta que el paciente está tocando
    const rutinaActual = rutinas.find(r => r.id === rutinaId);
    if (!rutinaActual) return;

    // 2. Calculamos el nuevo estado ANTES de decírselo a React
    const ejerciciosActualizados = rutinaActual.ejercicios.map(e =>
        e.id === ejercicioId ? { ...e, completado: !e.completado } : e
    );

    // 3. Verificamos si con este clic ya completó todos
    const todasCompletas = ejerciciosActualizados.every(e => e.completado);

    // 4. Actualizamos la pantalla de React con el cálculo exacto
    setRutinas(prev => prev.map(r =>
        r.id === rutinaId ? { ...r, ejercicios: ejerciciosActualizados, completada: todasCompletas } : r
    ));

    // 5. Si ya están todas, hacemos la petición a tu API de Laravel
    if (todasCompletas) {
        try {
            await api.put(`/mis-rutinas/${rutinaId}/completar`);
            
            // Si Laravel responde "Success", felicitamos y la quitamos de la lista
            alert("¡Felicidades! 🎉 Has completado la rutina con éxito.");
            setRutinas(prev => prev.filter(r => r.id !== rutinaId));
            
        } catch (error) {
            console.error("Error al completar la rutina:", error);
            alert("No se pudo guardar en la base de datos. Avisa a tu fisio.");
        }
    }
  };

  const handleLogout=()=>{
    const confirmar= window.confirm("¿Estas seguro de cerrar sesion?");
    if(confirmar){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }
  };

  if(cargando) return <p style={{textAlign: 'center', marginTop: '50px'}}>Cargando tus rutinas de hoy...</p>

  return (
    <>
      <div className="pac-container">

        {/* ENCABEZADO */}
        <div className="pac-header">
          <div>
            <p className="pac-saludo">¡Hola de nuevo 👋</p>

            <h1 className="pac-titulo">Mis rutinas asignadas</h1>
          </div>
          <button 
            onClick={handleLogout} 
            style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                padding: '8px 15px', backgroundColor: '#dc3545', 
                color: 'white', border: 'none', borderRadius: '5px', 
                cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            <FaSignOutAlt /> Salir
          </button>

        </div>

        {/* LISTA DE RUTINAS */}
        <div className="pac-lista">
          {rutinas.length === 0 ? (
            <div className="pac-felicidades">
              🎉 ¡No tienes rutinas pendientes! ¡Excelente trabajo!
            </div>
          ) : (
            rutinas.map((rutina) => {
              const abierta = expandida === rutina.id;
              const ejs = rutina.ejercicios || [];
              const ejsCompletos = ejs.filter((e) => e.completado).length;

              return (
                <div key={rutina.id} className="pac-card">
                  {/* CABECERA DE LA TARJETA */}
                  <div className="pac-card-header" onClick={() => toggleExpand(rutina.id)} style={{cursor: 'pointer'}}>
                    <div className="pac-card-info">
                      <h3 className="pac-card-nombre">
                        {rutina.nombre}
                      </h3>
                      <p className="pac-card-desc">{rutina.descripcion}</p>
                      <div className="pac-meta">
                        <span><FaClock className="meta-icon" /> {rutina.duracion}</span>
                        <span><FaDumbbell className="meta-icon" /> {ejsCompletos}/{ejs.length} ejercicios</span>
                      </div>
                    </div>

                    <button className="pac-expand-btn">
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

                  {/* EJERCICIOS DESPLEGABLES CON VIDEO */}
                  {abierta && (
                    <div className="pac-ejercicios">
                      {ejs.map((ej) => {
                        const embedUrl = getYoutubeEmbedUrl(ej.video_url);

                        return (
                          <div key={ej.id} className={`pac-ejercicio ${ej.completado ? "pac-ejercicio--done" : ""}`} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            
                            {/* Información del Ejercicio */}
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center', cursor: 'pointer' }} onClick={() => marcarEjercicio(rutina.id, ej.id)}>
                                <span className="pac-ej-check">
                                {ej.completado
                                    ? <FaCheckCircle className="pac-icon-check pac-icon-check--done pac-icon-sm" />
                                    : <FaCircle className="pac-icon-check pac-icon-check--pending pac-icon-sm" />}
                                </span>
                                <div style={{flex: 1}}>
                                    <span className={`pac-ej-nombre ${ej.completado ? "tachado" : ""}`} style={{display: 'block'}}>{ej.nombre}</span>
                                    {ej.descripcion && <span style={{fontSize: '0.85rem', color: '#666'}}>{ej.descripcion}</span>}
                                </div>
                                <span className="pac-ej-detalle">{ej.duracion}s | {ej.repeticiones} reps</span>
                            </div>

                            {/* REPRODUCTOR DE VIDEO (Si tiene URL) */}
                            {embedUrl && (
                                <div style={{ width: '100%', marginTop: '15px', borderRadius: '8px', overflow: 'hidden' }}>
                                    <iframe 
                                        width="100%" 
                                        height="200" 
                                        src={embedUrl} 
                                        title={ej.nombre} 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}