// FUNCIÓN DE LA VISTA DEL registro
import {useState} from 'react';
import './auth.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from '../api/axios';

export default function RegisterPage() {
    const navigate = useNavigate();
    const[formData, setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    });
    const [error, setError]=useState('');
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleRegister=async(e)=>{
        
    }

    return (
      <main className="container-main">
          <div className="container-form">
            <div className="heading">Registro</div>
           <div className='back'>
             <button  className='back-button' onClick={() => navigate("/")}>
                <FaArrowLeft/>
            </button>
           </div>
                <form action="" className="form">
                    <input type="text" className="input" id='nombre' placeholder='Ingrese su nombre' />
                    <input type="email" className="input" id='email' placeholder='Ingrese su correo' />
                    <input type="password" className="input" id='pass' placeholder='Ingrese su contraseña' />
                    <input type="password" className="input" id='pass_va' placeholder='Confirmar contraseña' />
                    <input type="submit" className='login-button' value="Crear cuenta" />
                </form>
            </div>
      </main>
    

    )
}