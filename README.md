# 🦾 MotriCare App — Frontend

<p align="center">
  <img src="./src/assets/react.svg" width="80" alt="React Logo" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white" alt="Bootstrap" />
</p>

Aplicación web desarrollada en **React + Vite** que consume la **MotriCare REST API**. Permite a fisioterapeutas gestionar rutinas y pacientes, y a pacientes visualizar sus rutinas de rehabilitación asignadas.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | ^19.2.4 | Librería principal de UI |
| Vite | ^8.0.1 | Bundler y servidor de desarrollo |
| React Router DOM | ^7.13.2 | Navegación entre vistas |
| Axios | ^1.13.6 | Cliente HTTP para consumir la API |
| Bootstrap | ^5.3.8 | Estilos y componentes UI |
| React Bootstrap | ^2.10.10 | Componentes Bootstrap para React |
| React Icons | ^5.6.0 | Íconos (FaUser, FaLock, FaEdit, etc.) |

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
│   │   └── hero.png
│   ├── auth/
│   │   ├── auth.css
│   │   ├── login.jsx              # Inicio de sesión → POST /login
│   │   └── register.jsx           # Registro de usuario → POST /registro
│   ├── components/
│   │   └── Navbar.jsx             # Barra de navegación compartida
│   ├── dashboard/
│   │   ├── dashboard.css
│   │   └── dashboard.jsx          # Panel principal del fisioterapeuta
│   ├── dashboard_pac/
│   │   ├── paciente.css
│   │   └── dash_pac.jsx           # Dashboard del paciente → GET /mis-rutinas/{id}
│   ├── pacientes/
│   │   ├── pacientes.css
│   │   └── PacientesList.jsx      # Listar y eliminar pacientes
│   ├── routes/
│   │   └── Routes.jsx             # Definición de rutas con React Router
│   ├── rutinas/
│   │   ├── rutinas.css
│   │   ├── RutinasCrear.jsx       # Crear rutina con ejercicios → POST /rutinas
│   │   ├── RutinasEditar.jsx      # Editar rutina existente → PUT /rutinas/{id}
│   │   └── RutinasList.jsx        # Listar, editar y eliminar rutinas
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

## ⚙️ Requisitos previos

- Node.js >= 18
- npm >= 9
- La **MotriCare REST API** corriendo en `http://localhost:8000`

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone <https://github.com/EvelynMi27/rehabilitacion_app>
cd rehabilitacion_app

# 2. Instalar dependencias
npm install
```

---

## ▶️ Ejecutar el proyecto

```bash
npm run dev
```

La app estará disponible en: `http://localhost:5173`

> ⚠️ Asegúrate de que la **MotriCare REST API** esté corriendo en `http://localhost:8000` antes de iniciar la app.

Otros scripts disponibles:

```bash
npm run build    # Compilar para producción
npm run preview  # Previsualizar el build
npm run lint     # Revisar errores de estilo con ESLint
```

---

## 🔗 Conexión con la API

La configuración de Axios se encuentra en `src/api/axios.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/MotricareAPI',
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

## 🖥️ Vistas y rutas de la aplicación

| Ruta | Componente | Descripción | Rol |
|------|------------|-------------|-----|
| `/` | `login.jsx` | Inicio de sesión | Todos |
| `/registro` | `register.jsx` | Crear cuenta | Todos |
| `/dash` | `dashboard.jsx` | Panel principal del fisioterapeuta | `fisio` |
| `/dash_pac` | `dash_pac.jsx` | Panel del paciente: ver rutinas asignadas, expandir ejercicios con video, marcar como completados y cerrar sesión | `paciente` |
| `/rutinas` | `RutinasList.jsx` | Listar, editar y eliminar rutinas | `fisio` |
| `/rutinas/nueva` | `RutinasCrear.jsx` | Crear nueva rutina con ejercicios | `fisio` |
| `/rutinas/editar/:id` | `RutinasEditar.jsx` | Editar rutina existente | `fisio` |
| `/pacientes` | `PacientesList.jsx` | Listar y eliminar pacientes | `fisio` |

---

## 📡 Endpoints consumidos

| Método | Endpoint | Componente que lo usa |
|--------|----------|-----------------------|
| `POST` | `/login` | `login.jsx` |
| `POST` | `/registro` | `register.jsx` |
| `GET` | `/pacientes` | `PacientesList.jsx`, `RutinasCrear.jsx` |
| `DELETE` | `/pacientes/{id}` | `PacientesList.jsx` |
| `GET` | `/rutinas` | `RutinasList.jsx` |
| `POST` | `/rutinas` | `RutinasCrear.jsx` |
| `GET` | `/rutinas/{id}` | `RutinasEditar.jsx` |
| `PUT` | `/rutinas/{id}` | `RutinasEditar.jsx` |
| `DELETE` | `/rutinas/{id}` | `RutinasList.jsx` |
| `GET` | `/mis-rutinas/{id}` | `dash_pac.jsx` |
| `PUT` | `/mis-rutinas/{id_rutina}/completar` | `dash_pac.jsx` |

---

## 🔐 Manejo de autenticación

- Al hacer login, el token y los datos del usuario se guardan en `localStorage`
- El interceptor de Axios adjunta el token Bearer automáticamente en cada petición
- El dashboard del paciente usa el `id` guardado en `localStorage` para cargar sus rutinas
- Al cerrar sesión se limpia el `localStorage`

```javascript
// Guardar sesión al hacer login
localStorage.setItem('token', response.data.data.token);
localStorage.setItem('user', JSON.stringify(response.data.data.user));

// Eliminar sesión al cerrar
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## 🗃️ Flujo de creación de rutina

```
RutinasCrear.jsx
   │
   ├─ GET /pacientes ──► carga lista de pacientes para seleccionar
   │
   │  (fisio llena el formulario: título, descripción, selecciona paciente)
   │  (fisio agrega dinámicamente bloques de ejercicios con nombre, duración, reps y video)
   │
   └─ POST /rutinas ──► { titulo, descripcion, paciente_id, ejercicios: [...] }
                            │
                            └─ API crea la rutina, sus ejercicios y los asocia al paciente
```

---

## 🎬 Reproducción de videos en el dashboard del paciente

El dashboard del paciente (`dash_pac.jsx`) detecta automáticamente si la URL del ejercicio es de YouTube y la convierte en un `iframe` embebido para reproducción directa:

```javascript
const getYoutubeEmbedUrl = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
};
```

---

## 👥 Roles del sistema

| Rol | Acceso |
|-----|--------|
| `fisio` | Crear, editar y eliminar rutinas; gestionar pacientes; asignar rutinas |
| `paciente` | Ver sus rutinas asignadas, expandir ejercicios y marcarlos como completados |

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del sistema de rehabilitación motriz MotriCare.
