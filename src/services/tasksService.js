// services/tasksService.js

const createService = (taskModel) => {
    const createTask = async (name, description) => {
        try {
            return await taskModel.createTask(name, description);
        } catch (err) {
            throw new Error('Error al crear la tarea: ' + err.message);
        }
    };

    const findAllTasks = async () => {
        try {
            return await taskModel.findAllTasks();
        } catch (err) {
            throw new Error('Error al obtener las tareas: ' + err.message);
        }
    };

    const findTaskById = async (id) => {
        try {
            return await taskModel.findTaskById(id);
        } catch (err) {
            throw new Error('Error al obtener la tarea: ' + err.message);
        }
    };

    const updateTask = async (id, name, description) => {
        try {
            return await taskModel.updateTask(id, name, description);
        } catch (err) {
            throw new Error('Error al actualizar la tarea: ' + err.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            return await taskModel.deleteTask(id);
        } catch (err) {
            throw new Error('Error al eliminar la tarea: ' + err.message);
        }
    };

    return { createTask, findAllTasks, findTaskById, updateTask, deleteTask };
};

export default createService;
