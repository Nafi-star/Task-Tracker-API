 const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Tracker API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
