const db = require('../db');

exports.getAllTasks = async (req, res) => {
  console.log('📥 getAllTasks called for user:', req.user?.id);
  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [req.user.id]);
    console.log(`📦 Fetched ${tasks.length} tasks`);
    res.json(tasks);
  } catch (err) {
    console.error('❌ Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  console.log('📥 getTaskById called:', req.params.id, 'for user:', req.user?.id);
  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (task.length === 0) {
      console.warn('⚠️ Task not found');
      return res.status(404).json({ error: 'Task not found' });
    }
    console.log('✅ Task found:', task[0]);
    res.json(task[0]);
  } catch (err) {
    console.error('❌ Error fetching task:', err.message);
    res.status(500).json({ error: 'Failed to fetch task', details: err.message });
  }
};

exports.createTask = async (req, res) => {
  console.log('🔧 createTask hit');
  console.log('📦 Incoming data:', req.body);
  const { title, description } = req.body;
  try {
    await db.query('INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)', [title, description, req.user.id]);
    console.log('✅ Task created for user:', req.user.id);
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    console.error('❌ Error creating task:', err.message);
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

exports.updateTask = async (req, res) => {
  console.log('🔧 updateTask hit for task ID:', req.params.id);
  console.log('📦 Update data:', req.body);
  const { title, description } = req.body;
  try {
    await db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?', [title, description, req.params.id, req.user.id]);
    console.log('✅ Task updated:', req.params.id);
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error('❌ Error updating task:', err.message);
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  console.log('🗑️ deleteTask hit for task ID:', req.params.id);
  try {
    await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    console.log('✅ Task deleted:', req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting task:', err.message);
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
};
