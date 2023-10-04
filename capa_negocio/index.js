const express = require('express');
const path = require('path');
const model = require('../capa_datos/model');
const bodyParser = require('body-parser');
const port = 3000; 
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manejo de archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname,'..','/capa_presentacion')));

// Pagina respuestas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','capa_presentacion/pagRespuestas.html'));
});

// Pagina formulario
app.get('/formulario', (req, res) => {
  res.sendFile(path.join(__dirname,'..','capa_presentacion/pagFormulario.html'));
});

// Pagina actualizar
app.get('/actualizar', (req, res) => {
  res.sendFile(path.join(__dirname,'..','capa_presentacion/pagActualizar.html'));
});

// Peticion que devuelve todas las respuestas
app.get('/peticion/respuestas', (req, res) => {
  res.json(model.respuestas());
});

// Peticion para buscar una respuesta por id
app.get('/peticion/respuesta', (req, res) => {
  res.json(model.respuesta(req.query.id));
});

// Peticion para guardar respuestas
app.post('/peticion/guardar',(req,res) => {
  const respuesta = {
    id: 0,
    nombre: req.body.nombre,
    edad: req.body.edad,
    p1: req.body.p1,
    p2: req.body.p2,
    p3: req.body.p3
  }
  model.nuevaRespuesta(respuesta);
  res.redirect('http://localhost:3000/');
});

// Peticion para actualizar la respuesta
app.post('/peticion/actualizar',(req,res) => {
  const respuesta = {
    id: parseInt(req.body.id),
    nombre: req.body.nombre,
    edad: req.body.edad,
    p1: req.body.p1,
    p2: req.body.p2,
    p3: req.body.p3
  }
  if (model.actualizar(respuesta)) {
    res.redirect('http://localhost:3000/');
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Id no encontrado');
  }
});

// Peticion para eliminar respuestas url = /peticion/eliminar?id=1
app.get('/peticion/eliminar', (req, res) => {
  const id = req.query.id;
  if (model.eliminar(id)) {
    res.redirect('http://localhost:3000/');
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Id no encontrado');
  }
  
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});