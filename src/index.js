import express from 'express';
import bodyParser from 'body-parser';
import createController from './controllers/tasksController.js';
import createModel from './models/sqliteTaskModel.js';
// import createModel from './models/mysqlTaskModel.js';

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

const taskModel = createModel();
const tasksController = createController(taskModel);

// Definir las rutas de la API utilizando los controladores
app.post('/tasks', tasksController.create);
app.get('/tasks', tasksController.list);
app.get('/tasks/:id', tasksController.get);
app.put('/tasks/:id', tasksController.update);
app.delete('/tasks/:id', tasksController.deleteTask);

// Manejar errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

// Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
