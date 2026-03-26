// FUNCIÓN DE LA VISTA DEL LOGIN
import { useState} from 'react';
import './auth.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const[error, setError]=useState('');

    const handleLogin=async(e)=>{
        e.preventDefault();
        setError('');
        try{
            const response = await api.post('/login',{
                email:email,
                password:password
            });
            console.log("Datos del backend:",response.data);
            localStorage.setItem('token', response.data.data.token);
            const rolUsuario=response.data.data.user.rol;
            localStorage.setItem('rol', rolUsuario);
            if(rolUsuario==='fisio'){
                navigate("/dash");
            }else if(rolUsuario === 'paciente'){
                navigate("/dash_pac");
            }else{
                setError('Rol no reconocido');
            }
        }catch(err){
            setError(err.response?.data?.message || 'Correo o contraseña incorrectos');
        }
    };
    return (
        /* Contenedor principal: centra el formulario en la pantalla */
        <main className="container-main">

            {/* Contenedor exclusivo del login con ancho fijo de 450px */}
            <div className="container-form-login">

                {/* Título del formulario */}
                <div className="heading">Iniciar sesión</div>

                <form onSubmit={handleLogin} className="form">
                    {error && <p className='error-msg' style={{color:'red', textAlign:'center'}}>{error}</p>}

                    {/* Campo de correo con ícono de usuario */}
                    <div className='icon-input'>
                        <FaUser className='icon' />
                        <input
                            type="email"
                            className="input"
                            placeholder='Ingrese su correo'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo de contraseña con ícono de candado */}
                    <div className='icon-input'>
                        <FaLock className='icon' />
                        <input
                            type="password"
                            className="input"
                            placeholder='Ingrese su contraseña'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Botón de envío */}
                    <input type="submit" className='login-button' value="Iniciar sesión"/>

                    {/* Enlace para ir a la página de registro */}
                    <a href="/registro" className='title'>Registrarse</a>

                </form>
            </div>
        </main>
    );
}