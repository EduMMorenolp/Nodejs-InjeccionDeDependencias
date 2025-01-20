// models/sqliteTaskModel.js
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./src/database/db.sqlite3');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla:', err.message);
        } else {
            console.log('Tabla "tasks" creada o ya existía.');
        }
    });
});

const createModel = () => {
    const createTask = async (name, description) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO tasks (name, description) VALUES (?, ?)';
            db.run(query, [name, description], function (err) {
                if (err) {
                    console.error('Error al ejecutar la consulta:', err.message);
                    return reject(err); // Rechaza con el error
                }
                console.log('Tarea creada con ID:', this.lastID);
                resolve({ id: this.lastID, name, description });
            });
        });
    };

    const findAllTasks = async () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tasks';
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    };

    const findTaskById = async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tasks WHERE id = ?';
            db.get(query, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    };

    const updateTask = async (id, task) => {
        const { name, description } = task;
        return new Promise((resolve, reject) => {
            const query = 'UPDATE tasks SET name = ?, description = ? WHERE id = ?';
            db.run(query, [name, description, id], function (err) {
                if (err) reject(err);
                if (this.changes === 0) return resolve(null);
                resolve({ id, name, description });
            });
        });
    };

    const deleteTask = async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM tasks WHERE id = ?';
            db.run(query, [id], function (err) {
                if (err) reject(err);
                resolve(this.changes > 0);
            });
        });
    };

    return { createTask, findAllTasks, findTaskById, updateTask, deleteTask };

}

export default createModel;