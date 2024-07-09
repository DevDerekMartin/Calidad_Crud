// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuración de la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'SQA',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Permitir CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Endpoint para obtener todas las personas (usuarios)
app.get('/api/personas', (req, res) => {
  pool.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error('Error al obtener personas', error);
      return res.status(500).json({ error: 'Error al obtener personas' });
    }
    res.json(results);
  });
});

// Endpoint para obtener una persona por su ID
app.get('/api/personas/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error al obtener persona por ID', error);
      return res.status(500).json({ error: 'Error al obtener persona por ID' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json(results[0]);
  });
});

// Endpoint para agregar una nueva persona
app.post('/api/personas', (req, res) => {
  const { nombre, email, telefono, imagen, fecha_nacimiento, comentario } = req.body;
  pool.query(
    'INSERT INTO usuarios (nombre, email, telefono, imagen, fecha_nacimiento, comentario) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, email, telefono, imagen, fecha_nacimiento, comentario],
    (error, results) => {
      if (error) {
        console.error('Error al insertar persona', error);
        return res.status(500).json({ error: 'Error al insertar persona' });
      }
      res.json({ id: results.insertId, nombre, email, telefono, imagen, fecha_nacimiento, comentario });
    }
  );
});

// Endpoint para actualizar una persona
app.put('/api/personas/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, imagen, fecha_nacimiento, comentario } = req.body;
  pool.query(
    'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, imagen = ?, fecha_nacimiento = ?, comentario = ? WHERE id = ?',
    [nombre, email, telefono, imagen, fecha_nacimiento, comentario, id],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar persona', error);
        return res.status(500).json({ error: 'Error al actualizar persona' });
      }
      res.json({ message: 'Persona actualizada', affectedRows: results.affectedRows });
    }
  );
});

// Endpoint para eliminar una persona
app.delete('/api/personas/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error al eliminar persona', error);
      return res.status(500).json({ error: 'Error al eliminar persona' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    res.json({ message: 'Persona eliminada', affectedRows: results.affectedRows });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
