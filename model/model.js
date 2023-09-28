const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname,'..','model/datos.txt');

// Crea una nueva respuesta
function nuevaRespuesta(respuesta) {
    datos = leer()
    respuesta.id = datos.autoid++
    datos.respuestas.push(respuesta);
    escribir(datos);
}

// Devuelve todas las respuestas
function respuestas() {
    return JSON.parse(fs.readFileSync(fileName)).respuestas
}

function leer() {
    return JSON.parse(fs.readFileSync(fileName))
}

function escribir(datos) {
    fs.writeFileSync(fileName, JSON.stringify(datos, null, 2))
}

module.exports = {
    respuestas,
    nuevaRespuesta
}