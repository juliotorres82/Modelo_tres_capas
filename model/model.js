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

//Actualizar la respuesta
function actualizar(id, nuevaRespuesta){
    const datos = leer();
    const respuestas = datos.respuestas;

    //indice que coincida con la posición del id solicitado
    const indice = respuestas.findIndex(respuesta => respuesta.id === id -1);

    //Si existe el id actualiza
    if (indice !== -1) {
        // Actualizar la respuesta reemplazando a las anteriores
        respuestas[indice] = { ...respuestas[indice], ...nuevaRespuesta };
        escribir(datos);
        return respuestas[indice];  // Devolver la respuesta actualizada
    } else {
        throw new Error('No se encuentra la respuesta');
    }
}

//Eliminar respuesta
/*
function eliminar(id) {
    const datos = leer();
    const respuestas = datos.respuestas;

    // indice que coincida con la posición del id solicitado
    const indice = respuestas.findIndex(respuesta => respuesta.id === id - 1);

    //Si existe id lo borra
    if (indice !== -1) {
        // Elimina la respuesta en el índice encontrado
        respuestas.splice(indice, 1); //inicia en la posicion del indice y borra solo un elemento
        escribir(datos);
        return 'Respuesta eliminada exitosamente';
    } else {
        throw new Error('No se encuentra la respuesta con el ID especificado');
    }
}
*/

module.exports = {
    respuestas,
    nuevaRespuesta,
    actualizar
}