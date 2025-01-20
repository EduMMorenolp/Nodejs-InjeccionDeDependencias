# Inyección de Dependencias - Node.js

Este repositorio presenta un ejemplo de implementación de **inyección de dependencias** en una aplicación Node.js. La aplicación permite gestionar tareas mediante una API RESTful, y el patrón de inyección de dependencias se utiliza para mejorar la flexibilidad y escalabilidad del código.

### Características

- **Patrón de Inyección de Dependencias**:
  - Las dependencias entre componentes como los controladores, servicios y modelos son inyectadas a través de funciones de fábrica.
  - Esto permite una mayor modularidad y facilidad de pruebas.
- **API CRUD**:
  - `POST /tasks`: Crear una nueva tarea.
  - `GET /tasks`: Listar todas las tareas.
  - `GET /tasks/:id`: Obtener una tarea específica por su ID.
  - `PUT /tasks/:id`: Actualizar una tarea existente.
  - `DELETE /tasks/:id`: Eliminar una tarea por su ID.
- **Base de datos**: El repositorio es compatible con **SQLite** o **MySQL**, y la base de datos se configura a través de un modelo específico que se inyecta en los servicios y controladores.

### Tecnologías utilizadas

- **Node.js**
- **Express**
- **SQLite / MySQL**
- **body-parser**

### Estructura del proyecto

- **Controladores**: Manejan las rutas y delegan la lógica de negocio a los servicios.
- **Servicios**: Contienen la lógica del negocio y llaman a los modelos para interactuar con la base de datos.
- **Modelos**: Abstracción para interactuar con la base de datos (SQLite o MySQL).
