# Dynamic Notes - Ensolvers Implementation Challenge
Este proyecto es una aplicación web de gestión de notas (SPA) desarrollada para el ejercicio técnico de Ensolvers. La aplicación permite la gestión completa de notas, incluyendo su organización por categorías y estados de archivo.

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

# Requisitos del Sistema (Runtimes y Versiones)

Para asegurar el correcto funcionamiento, el proyecto fue desarrollado y probado con las siguientes versiones:

Node.js: v22.21.0

npm: v11.7.0

PostgreSQL: v18.x

Sistema Operativo sugerido: Linux / macOS (o WSL2 en Windows) para la ejecución del script de automatización.

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->


# Arquitectura y Tecnologías

Siguiendo las directrices del desafío, la aplicación se estructuró como una Single Page Application (SPA) con una clara separación entre cliente y servidor:

Backend (API REST)
Framework: NestJS (Node.js). Se eligió por su capacidad nativa de implementar una arquitectura en capas (Controladores, Servicios y Repositorios).

Lenguaje: TypeScript.

Persistencia: PostgreSQL con TypeORM para asegurar que los datos no sean volátiles.

Arquitectura: Separación estricta de responsabilidades para cumplir con el patrón Service Layer.

Frontend (SPA)
Librería: React.

Herramienta de construcción: Vite.

Comunicación: Consumo de API REST mediante Fetch/Axios.

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->


# Instalación y Ejecución

El proyecto incluye un script de automatización que configura el entorno completo.

1. Configuración de Base de Datos
Antes de ejecutar, asegúrate de tener una instancia de PostgreSQL corriendo y crea la base de datos:

SQL

CREATE DATABASE notas_db;
2. Ejecución con un solo comando (Recomendado)
Desde la raíz del proyecto, otorga permisos y ejecuta el script:

Bash

chmod +x start.sh
./start.sh
Este script realizará automáticamente:

Verificación de directorios backend/ y frontend/.

Instalación de dependencias (npm install) en ambas carpetas.

Configuración del archivo .env del backend (usando .env.example).

Lanzamiento simultáneo de la API y el Cliente.

3. Ejecución Manual
Si prefieres iniciar los servicios por separado:

Backend: cd backend && npm run start:dev (Disponible en http://localhost:3000)

Frontend: cd frontend && npm run dev (Disponible en http://localhost:5173)

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

# Funcionalidades Implementadas

Fase 1 (Obligatoria)
Creación, edición y eliminación de notas.

Funcionalidad de archivar/desarchivar.

Listado dinámico de notas activas y archivadas.

Fase 2 (Puntos Extra)
Categorización: Se pueden asignar etiquetas a las notas.

Filtrado: Buscador por contenido y filtro por categorías en tiempo real.

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

# Estructura del Repositorio

He organizado el código de manera modular para facilitar su lectura y mantenimiento:

|Avila-996848/

├── backend/
│   ├── src/
│   │   ├── app.controller.ts         # Controlador principal
│   │   ├── app.service.ts            # Servicio principal
│   │   ├── app.module.ts             # Módulo root
│   │   ├── main.ts                   # Entrada de la aplicación
│   │   └── notes/
│   │       ├── notes.controller.ts   # Controlador de notas
│   │       ├── notes.service.ts      # Lógica de negocios
│   │       ├── notes.module.ts       # Módulo de notas
│   │       ├── note.entity.ts        # Entidad de base de datos
│   │       └── dto/                  # Data Transfer Objects
│   ├── test/                         # Tests E2E
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                          # Variables de entorno
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx                  # Componente principal
│   │   ├── main.tsx                 # Punto de entrada
│   │   ├── index.css                # Estilos globales
│   │   ├── components/
│   │   │   ├── NoteList.tsx         # Lista de notas
│   │   │   ├── NoteForm.tsx         # Formulario de notas
│   │   │   └── NoteItem.tsx         # Nota individual
│   │   ├── services/
│   │   │   └── noteService.ts       # Llamadas a la API
│   │   └── Styles/                  # Estilos de componentes
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── start.sh                         # Script de inicio
└── README.md                        # Este archivo

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

# Notas Adicionales
Login: Para esta entrega se priorizó la agilidad en la gestión de notas, por lo que el acceso es directo (sin login) según lo permitido en la consigna.

Persistencia: Todos los cambios se guardan en PostgreSQL a través de TypeORM, cumpliendo con el requisito de no usar mocks ni almacenamiento en memoria.

Autor: [Tu Nombre]

Fecha: 7 de enero de 2026