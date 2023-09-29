const express = require('express');
const path = require('path');
const model = require('../capa_datos/model');
const bodyParser = require('body-parser');
const port = 3000; 
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manejo de archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname,'..','view')));

// Pagina formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','capa_presentacion/index.html'));
});

// Devuelve todas las respuestas
app.get('/respuestas', (req, res) => {
  res.json(model.respuestas());
});

// Peticion para guardar respuestas
app.post('/guardarRespuesta',(req,res)=> {
  const respuesta = {
    id: 0,
    nombre: req.body.nombre,
    edad: req.body.edad,
    p1: req.body.p1,
    p2: req.body.p2,
    p3: req.body.p3
  }
  model.nuevaRespuesta(respuesta)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Respuesta guardada con éxito.');
});

// Peticion para actualizar la respuesta
app.put('/actualizarRespuestas',(req,res)=> {
  const respuesta = {
    id: req.body.id,
    nombre: req.body.nombre,
    edad: req.body.edad,
    p1: req.body.p1,
    p2: req.body.p2,
    p3: req.body.p3
  }
  if (model.actualizar(respuesta)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Respuestas actualizadas con éxito.');
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Id no encontrado');
  }
});

// Peticion para eliminar respuestas url = /eliminarRespuestas?id=1
app.delete('/eliminarRespuesta', (req, res) => {
  const id = req.query.id;
  model.eliminar(id);
  if (model.eliminar) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Respuesta eliminada con éxito.')
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Id no encontrado');
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});