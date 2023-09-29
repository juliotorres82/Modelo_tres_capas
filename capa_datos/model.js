
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname,'..','capa_datos/datos.txt');

function leer() {
    return JSON.parse(fs.readFileSync(fileName));
}

function escribir(datos) {
    fs.writeFileSync(fileName, JSON.stringify(datos, null, 2));
}

// Devuelve todas las respuestas
function respuestas() {
    return leer().respuestas;
}

// Crea una nueva respuesta
function nuevaRespuesta(respuesta) {
    datos = leer();
    respuesta.id = datos.autoid++;
    datos.respuestas.push(respuesta);
    escribir(datos);
}

// Actualiza una respuesta 
function actualizar(nuevaRespuesta){
    const datos = leer();
    const respuestas = datos.respuestas;
    
    //indice que coincida con la posición del id solicitado
    const indice = respuestas.findIndex(respuesta => respuesta.id == nuevaRespuesta.id);

    //Si existe el id actualiza
    if (indice != -1) {
        // Actualizar la respuesta reemplazando a las anteriores
        respuestas[indice] = nuevaRespuesta
        escribir(datos);
        return true;  
    } else {
        return false;
    }
}

// Elimina una respuesta
function eliminar(id) {
    const datos = leer();
    const respuestas = datos.respuestas;

    // indice que coincida con la posición del id solicitado
    const indice = respuestas.findIndex(respuesta => respuesta.id == id);

    //Si existe id lo borra
    if (indice !== -1) {
        // Elimina la respuesta en el índice encontrado
        respuestas.splice(indice, 1); //inicia en la posicion del indice y borra solo un elemento
        escribir(datos);
        return true;
    } else {
        return false;
    }
}

module.exports = {
    respuestas,
    nuevaRespuesta,
    actualizar,
    eliminar
}