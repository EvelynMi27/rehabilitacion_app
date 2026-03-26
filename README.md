# 🦾 MotriCare App — Frontend

<p align="center">
  <img src="./src/assets/react.svg" width="80" alt="React Logo" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
</p>

Aplicación web desarrollada en **React + Vite** que consume la **MotriCare REST API**. Permite a fisioterapeutas y pacientes gestionar rutinas y ejercicios de rehabilitación motriz.

---

## 🛠️ Tecnologías utilizadas

- **React 19** — Librería de interfaces de usuario
- **Vite 6** — Bundler y servidor de desarrollo
- **Axios** — Cliente HTTP para consumir la API
- **React Router 6** — Navegación entre vistas
- **React Icons** — Íconos (FaUser, FaLock, FaArrowLeft, etc.)

---

## 📁 Estructura del proyecto

```
rehabilitacion_app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── axios.js               # Configuración base de Axios + interceptor de token
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── auth/
│   │   ├── auth.css
│   │   ├── login.jsx              # Inicio de sesión (POST /login)
│   │   └── register.jsx           # Registro de usuario (POST /registro)
│   ├── components/
│   │   └── Navbar.jsx             # Barra de navegación
│   ├── dashboard/
│   │   ├── dashboard.css
│   │   └── dashboard.jsx          # Panel principal
│   ├── ejercicios/
│   │   ├── ejercicios.css
│   │   ├── ejerciciosCrear.jsx    # Crear ejercicio (POST /ejercicios)
│   │   ├── ejerciciosEditar.jsx   # Editar ejercicio
│   │   └── ejerciciosList.jsx     # Listar ejercicios (GET /ejercicios)
│   ├── pacientes/
│   │   ├── pacientes.css
│   │   ├── PacientesEditar.jsx    # Editar paciente
│   │   └── PacientesList.jsx      # Listar pacientes
│   ├── routes/
│   │   └── Routes.jsx             # Definición de rutas
│   ├── rutinas/
│   │   ├── rutinas.css
│   │   ├── RutinasCrear.jsx       # Crear rutina con ejercicios (POST /rutinas)
│   │   ├── RutinasEditar.jsx      # Editar rutina
│   │   └── RutinasList.jsx        # Listar rutinas (GET /rutinas)
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

## ⚙️ Requisitos para ejecutar

- Node.js >= 18
- npm >= 9
- La **MotriCare REST API** corriendo en `http://localhost:8000`

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/EvelynMi27/rehabilitacion_app.git
cd rehabilitacion_app

# 2. Instalar dependencias
npm install

# 3. Instalar dependencias adicionales (si no están incluidas)
npm install axios react-router-dom react-icons
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

> ⚠️ Asegúrate de que la **MotriCare REST API** esté corriendo en `http://localhost:8000` antes de iniciar la app.

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

// Interceptor: agrega el token Bearer automáticamente en cada petición
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
| Login | `/` | Inicio de sesión | Todos |
| Registro | `/registro` | Crear cuenta | Todos |
| Dashboard | `/dash` | Panel principal | Autenticado |
| Ejercicios | `/ejercicios` | Lista de ejercicios | Autenticado |
| Crear ejercicio | `/ejercicios/crear` | Formulario nuevo ejercicio | Fisioterapeuta |
| Rutinas | `/rutinas` | Lista de rutinas | Autenticado |
| Crear rutina | `/rutinas/crear` | Formulario nueva rutina con ejercicios | Fisioterapeuta |
| Pacientes | `/pacientes` | Lista de pacientes | Fisioterapeuta |

---

## 📡 Endpoints consumidos

| Método | Endpoint | Vista que lo usa |
|--------|----------|-----------------|
| POST | `/login` | `login.jsx` |
| POST | `/registro` | `register.jsx` |
| GET | `/ejercicios` | `ejerciciosList.jsx`, `RutinasCrear.jsx` |
| POST | `/ejercicios` | `ejerciciosCrear.jsx` |
| GET | `/rutinas` | `RutinasList.jsx` |
| POST | `/rutinas` | `RutinasCrear.jsx` |
| GET | `/mis-rutinas/{id}` | `dashboard.jsx` |
| POST | `/asignar-rutina` | `PacientesList.jsx` |

---

## 🔐 Manejo de autenticación

- Al hacer login, el token se guarda en `localStorage` con la clave `token`
- El interceptor de Axios lo adjunta automáticamente en cada petición
- Al cerrar sesión se elimina el token del `localStorage`

```javascript
// Guardar token al hacer login
localStorage.setItem('token', response.data.data.token);

// Eliminar token al cerrar sesión
localStorage.removeItem('token');
```

---

## 🗃️ Flujo de creación de rutina

```
RutinasCrear.jsx
   │
   ├─ GET /ejercicios ──► carga lista de ejercicios disponibles desde la API
   │
   │  (fisio selecciona ejercicios y llena el formulario)
   │
   └─ POST /rutinas ──► { nombre, descripcion, ejercicios_id: [1, 3, 5] }
                            │
                            └─ Laravel crea la rutina y asocia ejercicios
                               en la tabla pivote rutina_ejercicio
```

---

## 👥 Roles del sistema

| Rol | Acceso |
|-----|--------|
| `fisio` | Crear/editar ejercicios y rutinas, asignar rutinas a pacientes |
| `paciente` | Ver sus rutinas y ejercicios asignados |

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del sistema de rehabilitación motriz MotriCare.
