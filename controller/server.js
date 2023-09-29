const express = require('express');
const path = require('path');
const model = require('../model/model');
const bodyParser = require('body-parser');
const port = 3000; 
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Manejo de archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname,'..','view')));

// Pagina formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','view/index.html'));
});

// Peticion para eliminar respuestas
// /eliminarRespuestas?id=1
app.delete('/eliminarRespuesta', (req, res) => {
  const id = req.query.id;
  model.borrarRespuesta(id);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Respuesta eliminada con éxito.')
})

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

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});