# PokéApp Fullstack

**PokéApp** es una aplicación fullstack que permite buscar Pokémon utilizando la PokeAPI, ver detalles de cada uno y gestionar una lista de favoritos. El sistema cuenta con autenticación (registro e inicio de sesión) y está desarrollado utilizando React en el frontend y Express/MongoDB en el backend.

---

## Tabla de Contenidos

- [Características](#características)
- [Arquitectura y Patrones de Diseño](#arquitectura-y-patrones-de-diseño)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
  - [Backend](#backend)
  - [Frontend](#frontend)

---

## Características

- **Búsqueda de Pokémon:** Permite buscar Pokémon utilizando un término de búsqueda.
- **Detalles del Pokémon:** Visualización de información completa (ID, nombre, imagen, altura, peso, tipos y habilidades).
- **Gestión de Favoritos:** Los usuarios autenticados pueden agregar y eliminar Pokémon de su lista de favoritos, con persistencia en MongoDB.
- **Autenticación:** Registro e inicio de sesión con validaciones tanto en el frontend como en el backend (usando JWT y bcryptjs).
- **Componentes Reutilizables:** Frontend basado en componentes reutilizables, hooks personalizados y Context API para una arquitectura limpia y escalable.
- **Consumo de API Externa:** Integra la PokeAPI para obtener información de Pokémon y usa variables de entorno para la configuración.

---

## Arquitectura y Patrones de Diseño

### Frontend

- **Component-based Architecture:** La aplicación está dividida en _pages_ (vistas completas), _components_ (componentes reutilizables), _hooks_ (lógica personalizada) y _context_ (gestión global de estados, por ejemplo, autenticación).  
- **Separation of Concerns:** Cada módulo (por ejemplo, la búsqueda, la gestión de favoritos y la autenticación) se encarga de su propia lógica, lo que facilita el mantenimiento y la escalabilidad.
- **Patrón de Diseño:** Se utiliza una arquitectura basada en componentes con separación de responsabilidades.

### Backend

- **Modelo-Vista-Controlador (MVC):**  
  - **Modelos:** Definidos con Mongoose para estructurar los datos (por ejemplo, los Pokémon favoritos).
  - **Controladores:** Gestionan la lógica de cada endpoint (búsqueda, detalles, agregar y eliminar favoritos).
  - **Rutas:** Configuradas en Express para exponer una API RESTful.
- **Middleware de Autenticación:** Se usa JWT para proteger rutas y asegurar que solo usuarios autenticados puedan acceder a ciertas funciones (como la gestión de favoritos).

---

## Tecnologías Utilizadas

### Frontend

- **React 19**
- **Vite**
- **Axios**
- **React Router Dom**
- **Bootstrap 5**
- **SweetAlert2**

### Backend

- **Express**
- **MongoDB** y **Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **Axios** (para consumir la PokeAPI)
- **dotenv** (para la configuración de variables de entorno)
- **cors**


### Testing

**Jest**
**Supertest**

## Instalación y Configuración


1. **Clonar el repositorio** 
   git clone  https://github.com/juliancolli03/pokeapp-fullstack.git

2. **Navegar a backend** 

   ```bash
   cd backend
   npm install
   node server

3. **Navegar al directorio `frontend**:

   ```bash
   cd frontend
   npm install
   npm run dev

## Pruebas:

La aplicación utiliza Jest y Supertest para realizar pruebas unitarias y de integración del backend. Los tests cubren varios aspectos de la API de Pokémon:
**Tipos de Pruebas**
Búsqueda de Pokémon
Validación de parámetros de búsqueda
Filtrado de resultados
Manejo de errores
Detalles de Pokémon
Obtención de detalles de Pokémon válidos
Manejo de Pokémon inexistentes
Gestión de Favoritos
Agregar Pokémon a favoritos
Prevenir duplicados
Listar favoritos
Eliminar favoritos

**Características de los Tests**
Mocking: Se utilizan mocks para simular:
Middleware de autenticación
Llamadas a PokeAPI
Operaciones de base de datos con Mongoose
Cobertura de Casos de Uso
Escenarios exitosos
Validación de errores
Manejo de casos límite

**Ejecutar Pruebas**

cd backend
npm test
      
