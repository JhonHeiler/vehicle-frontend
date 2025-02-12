# Proyecto de Chat con Angular 17 y Node.js

Este proyecto es una aplicación web de chat basada en **Angular 17**, **Node.js (Express)** y **MySQL**. Además, integra **OpenAI** para la generación de respuestas inteligentes.
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
## 📦 Estructura del Proyecto

```
mi-proyecto
 ┣ 📂 backend (Node.js + Express + MySQL)
 ┃ ┣ 📂 controllers  # Lógica de negocio (CRUD)
 ┃ ┣ 📂 models       # Definición de la BD con Sequelize
 ┃ ┣ 📂 routes       # Endpoints de Express
 ┃ ┣ 📂 services     # Integración con OpenAI
 ┃ ┣ 📜 server.js    # Punto de entrada
 ┃ ┗ 📜 config.js    # Configuración de MySQL
 ┣ 📂 frontend (Angular 17)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 app
 ┃ ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┗ 📜 app.module.ts
 ┃ ┃ ┣ 📜 main.ts
 ┃ ┃ ┣ 📜 styles.scss
 ┃ ┗ 📜 angular.json
```

## 🚀 Tecnologías Utilizadas

### Backend:
- **Node.js** v22.13.1
- **Express.js** (Framework web para Node.js)
- **MySQL** (Base de datos relacional)
- **Sequelize** (ORM para MySQL)
- **dotenv** (Manejo de variables de entorno)
- **cors** (Manejo de CORS)

### Frontend:
- **Angular 17** (Framework para frontend)
- **Angular Material** (Componentes UI)
- **RxJS** (Manejo de datos reactivos)
- **TypeScript** (Lenguaje de programación tipado)

### Integraciones:
- **OpenAI API** (Para generación de respuestas automáticas en el chat)

## 🔧 Instalación

### 1️⃣ Clonar el repositorio:
```sh
 git clone https://github.com/tu_usuario/mi-proyecto.git
 cd mi-proyecto
```

### 2️⃣ Configurar el Backend
```sh
 cd backend
 npm install
```
Crear un archivo `.env` con la configuración de la base de datos y la API de OpenAI:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=chat_db
OPENAI_API_KEY=tu_api_key
```
Ejecutar el servidor:
```sh
 node server.js
```

### 3️⃣ Configurar el Frontend
```sh
 cd frontend
 npm install
 ng serve
```
La aplicación estará disponible en `http://localhost:4200`.

## 🛠️ Funcionalidades
- 📌 Chat interactivo con integración de OpenAI.
- 🔐 Autenticación de usuarios (opcional).
- 🗄️ Almacenamiento de consultas en MySQL.
- 🎨 Interfaz moderna con Angular Material.

## 📌 API Endpoints
### 📌 `POST /chat`
- **Descripción**: Envía un mensaje al servidor y obtiene una respuesta de OpenAI.
- **Cuerpo de la solicitud:**
```json
{
  "placa": "ABC123",
  "consulta": "¿Cuál es el historial del vehículo?"
}
```
- **Respuesta:**
```json
{
  "respuesta": "El vehículo con placa ABC123 tiene un historial limpio.",
  "metodologia": "Datos obtenidos a través de OpenAI y consultas internas."
}
```

## 📄 Licencia
Este proyecto está bajo la licencia MIT.

