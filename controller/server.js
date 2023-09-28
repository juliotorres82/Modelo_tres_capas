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

// Peticion para guardar respuestas
app.post('/guardarRespuestas',(req,res)=> {
  const respuesta = {
    id: 0,
    nombre: req.body.nombre
  }
  model.nuevaRespuesta(respuesta)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Respuestas guardadas con éxito.');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});