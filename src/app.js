const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api/routes/index.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de Transmetro funcionando correctamente.' });
});

app.use('/api', apiRoutes);

module.exports = app;