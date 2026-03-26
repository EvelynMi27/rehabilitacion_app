# 🦾 MotriCare App — Frontend

<p align="center">
  <img src="./src/assets/react.svg" width="80" alt="React Logo" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white" alt="Axios" />
</p>

Aplicación web desarrollada en **React + Vite** que consume la **MotriCare REST API**. Permite a fisioterapeutas y pacientes gestionar rutinas y ejercicios de rehabilitación motriz.

---

## 🛠️ Tecnologías utilizadas

- **React 19** — Librería de interfaces de usuario
- **Vite** — Bundler y servidor de desarrollo
- **Axios** — Cliente HTTP para consumir la API
- **React Router** — Navegación entre vistas

---

## 📁 Estructura del proyecto

```
rehabilitacion_app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── axios.js               # Configuración base de Axios
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── auth/
│   │   ├── auth.css
│   │   ├── login.jsx              # Pantalla de inicio de sesión
│   │   └── register.jsx           # Pantalla de registro
│   ├── components/
│   │   └── Navbar.jsx             # Barra de navegación
│   ├── dashboard/
│   │   ├── dashboard.css
│   │   └── dashboard.jsx          # Panel principal
│   ├── ejercicios/
│   │   ├── ejercicios.css
│   │   ├── ejerciciosCrear.jsx    # Crear ejercicio
│   │   ├── ejerciciosEditar.jsx   # Editar ejercicio
│   │   └── ejerciciosList.jsx     # Listar ejercicios
│   ├── pacientes/
│   │   ├── pacientes.css
│   │   ├── PacientesEditar.jsx    # Editar paciente
│   │   └── PacientesList.jsx      # Listar pacientes
│   ├── routes/
│   │   └── Routes.jsx             # Definición de rutas
│   ├── rutinas/
│   │   ├── rutinas.css
│   │   ├── RutinasCrear.jsx       # Crear rutina
│   │   ├── RutinasEditar.jsx      # Editar rutina
│   │   └── RutinasList.jsx        # Listar rutinas
│   ├── App.css
│   ├── App.jsx                    # Componente raíz
│   ├── index.css
│   └── main.jsx                   # Punto de entrada
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/EvelynMi27/rehabilitacion_app.git
cd rehabilitacion_app

# 2. Instalar dependencias
npm install

# 3. Instalar dependencias adicionales
npm install axios
```

---

## ▶️ Ejecutar el proyecto

```bash
npm run dev
```

La app estará disponible en:
```
http://localhost:5173
```

> Asegúrate de que la **MotriCare REST API** esté corriendo en `http://localhost:8000` antes de iniciar la app.

---

## 🔗 Conexión con la API

La configuración de Axios se encuentra en `src/api/axios.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/MotricareAPI',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 🖥️ Vistas de la aplicación

| Vista | Ruta | Descripción | Rol |
|-------|------|-------------|-----|
| Login | `/login` | Inicio de sesión | Todos |
| Registro | `/register` | Crear cuenta | Todos |
| Dashboard | `/dashboard` | Panel principal | Autenticado |
| Ejercicios | `/ejercicios` | Lista de ejercicios | Autenticado |
| Crear ejercicio | `/ejercicios/crear` | Formulario nuevo ejercicio | Fisioterapeuta |
| Rutinas | `/rutinas` | Lista de rutinas | Autenticado |
| Crear rutina | `/rutinas/crear` | Formulario nueva rutina | Fisioterapeuta |
| Pacientes | `/pacientes` | Lista de pacientes | Fisioterapeuta |

---

## 👥 Roles del sistema

| Rol | Acceso |
|-----|--------|
| `fisio` | Crear/editar ejercicios, rutinas y asignarlas a pacientes |
| `paciente` | Ver sus rutinas y ejercicios asignados |

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del sistema de rehabilitación motriz MotriCare.
