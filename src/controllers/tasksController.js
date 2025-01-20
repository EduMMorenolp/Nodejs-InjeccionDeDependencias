// controllers/tasksController.js
import createService from '../services/tasksService.js';

const createController = (taskModel) => {

    const tasksServices = createService(taskModel);

    const create = async (req, res) => {
        const { name, description } = req.body;
        try {
            const newTask = await tasksServices.createTask(name, description);
            res.status(201).json(newTask);
        } catch (err) {
            res.status(500).send('Error al crear la tarea');
        }
    };

    const list = async (req, res) => {
        try {
            const tasks = await tasksServices.findAllTasks();
            res.json(tasks);
        } catch (err) {
            res.status(500).send('Error al obtener las tareas');
        }
    };

    const get = async (req, res) => {
        const { id } = req.params;
        try {
            const task = await tasksServices.findTaskById(parseInt(id));
            if (!task) return res.status(404).send('Tarea no encontrada');
            res.json(task);
        } catch (err) {
            res.status(500).send('Error al obtener la tarea');
        }
    };

    const update = async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const updatedTask = await tasksServices.updateTask(parseInt(id), { name, description });
            if (!updatedTask) return res.status(404).send('Tarea no encontrada');
            res.json(updatedTask);
        } catch (err) {
            res.status(500).send('Error al actualizar la tarea');
        }
    };

    const deleteTask = async (req, res) => {
        const { id } = req.params;
        try {
            const success = await tasksServices.deleteTask(parseInt(id));
            if (!success) return res.status(404).send('Tarea no encontrada');
            res.sendStatus(204);
        } catch (err) {
            res.status(500).send('Error al eliminar la tarea');
        }
    };

    return {
        create,
        list,
        get,
        update,
        deleteTask
    };
}

export default createController;