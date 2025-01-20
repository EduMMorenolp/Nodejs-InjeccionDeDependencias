// models/mysqlTaskModel.js
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tasks_db'
});

const createModel = () => {
    const createTask = async (name, description) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO tasks (name, description) VALUES (?, ?)';
            db.query(query, [name, description], (err, result) => {
                if (err) reject(err);
                resolve({ id: result.insertId, name, description });
            });
        });
    };

    const findAllTasks = async () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tasks';
            db.query(query, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    };

    const findTaskById = async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tasks WHERE id = ?';
            db.query(query, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    };

    const updateTask = async (id, updatedTask) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE tasks SET name = ?, description = ? WHERE id = ?';
            db.query(query, [updatedTask.name, updatedTask.description, id], (err, result) => {
                if (err) reject(err);
                if (result.affectedRows === 0) return resolve(null);
                resolve({ id, ...updatedTask });
            });
        });
    };

    const deleteTask = async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM tasks WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) reject(err);
                resolve(result.affectedRows > 0);
            });
        });
    };

    return { createTask, findAllTasks, findTaskById, updateTask, deleteTask };
}

export default createModel;