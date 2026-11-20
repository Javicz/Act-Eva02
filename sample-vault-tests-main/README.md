# <img src="frontend/img/favicon-bw.png" width="45" height="45" align="center"> SampleVaultest

**SampleVaultest** estos son tests para el backend de una aplicación web diseñada para la gestión profesional de librerías de sonido. Permite a los productores musicales subir, categorizar, escuchar y organizar sus muestras de audio (samples) de forma privada y segura, todo bajo una arquitectura modular y eficiente.

---

## 🚀 Características Principales

* **Gestión de Samples:** Sube archivos de audio (MP3, WAV, OGG, FLAC) con metadatos personalizados (BPM, categoría).
* **Reproductor Integrado:** Escucha tus sonidos directamente desde la biblioteca mediante una interfaz minimalista.
* **Arquitectura Limpia:** Separación total de responsabilidades entre controladores, servicios y utilidades.
* **Frontend "Zero innerHTML":** Manipulación del DOM 100% nativa para máxima seguridad y rendimiento.
* **Sostenibilidad de Software:** Código optimizado siguiendo principios de eficiencia en el consumo de recursos (inspirado en el modelo **GREENSOFT**).

## 🛠️ Tecnologías Utilizadas

### Backend
* **Node.js & Express:** Servidor robusto y escalable.
* **Multer:** Gestión eficiente de subida de archivos binarios.
* **MySQL/MariaDB:** Persistencia de metadatos de forma relacional.

### Frontend
* **Vanilla JavaScript:** Lógica pura sin dependencias de frameworks pesados.
* **W3.CSS:** Framework CSS ligero para una interfaz moderna y responsiva.
* **Web Components (Custom):** Manejo dinámico de la UI mediante inyección de nodos nativos.

---

### Inicialización del Backend:
Entra en la carpeta del servidor e instala las dependencias necesarias:
```bash
cd backend
npm install
```

### Configuración de la base de datos
Con MySQL/MariaDB iniciado, desde la carpeta `backend` carga la estructura y los datos de prueba (admin/12345 y pepe/12345):

> **Atención:** `config/init.sql` elimina y vuelve a crear la base `samplevaultest`. No lo ejecutes si necesitas conservar los datos actuales.

```powershell
cmd /c "mysql -u root -p < config\init.sql"
```

`init.sql` crea la base `samplevaultest` y el usuario de aplicación `samplevaultest` con contraseña `samplevaultest`. Para instalaciones que no sean locales, cambia esas credenciales antes de ejecutar el script.

### Configuración del entorno
Desde `backend`, crea el archivo `.env` a partir del ejemplo:
```powershell
Copy-Item .env.example .env
```
El modo de pruebas es el predeterminado, por lo que también se puede iniciar sin definir `NODE_ENV`. Revisa las variables de conexión si tu MySQL usa otros valores.

### Iniciar el servidor
```bash
npm start
```
Abre `http://localhost:3000/` y ejecuta los botones de la página de pruebas. Los tests usan la base de datos configurada y las credenciales de prueba indicadas arriba.

Para ejecutar los tests unitarios del middleware de autenticación:
```powershell
npm test
```
## 📂 Estructura del Proyecto

```text
├── backend/
│   ├── config/          # Configuración de Multer y DB.
│   ├── controllers/     # Lógica de negocio.
│   ├── repositories/    # Acceso a datos (SQL).
│   ├── routes/          # Rutas de acceso a módulos del backend.
│   ├── uploads/         # Almacenamiento físico de sonidos.
│   └── utils/           # Helpers de sistema de archivos (fileHelper).
├── frontend/
│   ├── css/             # Estilos personalizados.
│   ├── html/            # Archivos de maquetación estáticos.
│   ├── img/             # Activos visuales (favicon.png).
│   └── js/
│       ├── tests/  # Scripts necesarios para crear el frontend de los tests.
├── test-samples/ #samples de prueba para subir.