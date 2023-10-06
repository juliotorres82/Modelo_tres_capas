const respuestasContainer = document.getElementById('respuestas');

// Realiza una solicitud GET a http://localhost:3000/respuestas
fetch('https://servicio-web-nck9.onrender.com/peticion/respuestas')
  .then((response) => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json();
  })
  .then((respuestas) => {
    // Genera las tarjetas de respuestas
    respuestas.forEach((respuesta) => {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');
      card.innerHTML = `
        <div class="card-body">
          <h3 class="card-title">${respuesta.nombre}</h3>
          <p class="card-text">Edad: ${respuesta.edad}</p>
          <p class="card-text">¿Cuántas porciones de frutas consumes al día? ${respuesta.p1}</p>
          <p class="card-text">¿Cuál es tu fruta favorita? ${respuesta.p2}</p>
          <p class="card-text">¿Con qué frecuencia comes frutas frescas? ${respuesta.p3}</p>
          <button class="btn btn-primary"><a style="text-decoration: none; color: inherit;" href="https://servicio-web-nck9.onrender.com/actualizar?id=${respuesta.id}" data-method="GET">Editar</a></button>
          <button class="btn btn-danger"><a style="text-decoration: none; color: inherit;" href="https://servicio-web-nck9.onrender.com/peticion/eliminar?id=${respuesta.id}" data-method="GET">Eliminar</a></button>
        </div>
      `;
      respuestasContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });
