// controllers/tasksController.js
const db = require('../db');

exports.getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id]);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (task.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(task[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task', details: err.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    await db.query('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, req.user.id]);
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    await db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?', [title, description, req.params.id, req.user.id]);
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
};
