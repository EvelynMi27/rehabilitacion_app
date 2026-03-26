// FUNCIÓN DE LA VISTA DEL registro
import { useState } from 'react';
import './auth.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from '../api/axios';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        rol: ''
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.password_confirmation) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await api.post('/registro', formData);
            alert('Cuenta creada exitosamente. Por favor, inicia sesion');
            navigate("/");
        } catch (err) {
            if (err.response?.data?.errors) {
                const firstError = Object.values(err.response.data.errors)[0][0];
                setError(firstError);
            } else {
                setError(err.response?.data?.message || 'Error al crear la cuenta');
            }
        }
    };

    return (
        <main className="container-main">
            <div className="container-form">
                <div className="heading">Registro</div>
                <div className='back'>
                    <button className='back-button' onClick={() => navigate("/")}>
                        <FaArrowLeft />
                    </button>
                </div>
                <form onSubmit={handleRegister} className="form">
                    {error && <p className='error-msg' style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
                    <input type="text" className="input" name='name' value={formData.name} onChange={handleChange} placeholder='Ingrese su nombre' required />
                    <input type="email" className="input" name='email' value={formData.email} onChange={handleChange} placeholder='Ingrese su correo' required />
                    <select className='input' name='rol' value={formData.rol} onChange={handleChange} required style={{ cursor: 'pointer' }}>
                        <option value='' disabled>Seleccione un rol</option>
                        <option value='paciente'>Paciente</option>
                        <option value='fisio'>Fisioterapeuta</option>
                    </select>
                    <input type="password" className="input" name='password' value={formData.password} onChange={handleChange} placeholder='Ingrese su contraseña' required minLength={8} />
                    <input type="password" className="input" name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} placeholder='Confirmar contraseña' required />
                    <input type="submit" className='login-button' value="Crear cuenta" />
                </form>
            </div>
        </main>
    );
}