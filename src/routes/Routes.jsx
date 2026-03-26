// ARCHIVO CON LAS RUTAS

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../auth/login.jsx";
import RegisterPage from "../auth/register.jsx";
import DashboardPage from "../dashboard/dashboard.jsx";
import RutinasList from "../rutinas/RutinasList.jsx";
import NuevaRutina from "../rutinas/RutinasCrear.jsx";
import EditarRutina from "../rutinas/RutinasEditar.jsx";
import PacientesList from "../pacientes/PacientesList.jsx";
import EditarPaciente from "../pacientes/PacientesEditar.jsx";
import EjerciciosList from "../ejercicios/ejerciciosList.jsx";
import NuevoEjercicio from "../ejercicios/ejerciciosCrear.jsx";
import EditarEjercicio from "../ejercicios/ejerciciosEditar.jsx";
import PacienteDashboardPage from "../dashboard_pac/dash_pac.jsx";


// EXPORTAMOS LAS RUTAS

export default function AppRouter(){
    return(

        <BrowserRouter>
        <Routes>

            {/* AUTH */}
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/registro" element={<RegisterPage/>}/>
            {/* PARA EL DASHBOARD */}
            <Route path="/dash" element={<DashboardPage/>}/>
            <Route path="/rutinas" element={<RutinasList/>}/>
            {/* RUTINAS */}
            <Route path="/rutinas/nueva" element={<NuevaRutina/>}/>
            <Route path="/rutinas/editar/:id" element={<EditarRutina />} />
            {/* PACIENTES */}
            <Route path="/pacientes" element={<PacientesList/>}/>
            <Route path="/pacientes/editar/:id" element={<EditarPaciente/>}/>

            {/* EJERCICIOS */}
            <Route path="/ejercicios" element={<EjerciciosList/>}/>
            <Route path="/ejercicios/nuevo" element={<NuevoEjercicio/>}/>
            <Route path="/ejercicios/editar/:id" element={<EditarEjercicio/>}/>

            {/*Dashboard del paciente */}
            <Route path="/dash_pac" element={<PacienteDashboardPage/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}