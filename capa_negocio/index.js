const http = require('http');
const fs = require('fs');

const qs = require('querystring');

const express = require('express');
const path = require('path');
const port = 3000; 
const app = express();

// Manejo de archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname,'..','capa_presentacion')));
// Pagina formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','capa_presentacion/index.html'));
});
// Peticion para guardar respuestas
app.post('/guardarRespuestas',(req,res)=> {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
//Construye el JSON
  req.on('end', () => {
    const parsedData = qs.parse(body);
    const respuestas = JSON.stringify(parsedData, null, 2);

    // Nombre del archivo donde se guardarán las respuestas
    const fileName = path.join(__dirname,'..','capa_datos/respuestas.txt');
    // Añade las respuestas al final del documento
    fs.appendFile(fileName, respuestas + '\n', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Respuestas guardadas con éxito.');
      }
    });
  });
})
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});