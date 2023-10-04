document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/peticion/respuesta'+window.location.search)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
      })
      .then((data) => {
        // Llenar el formulario con los datos recibidos
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('edad').value = data.edad;
        document.getElementById('p1').value = data.p1;
        document.getElementById('p2').value = data.p2;
        document.getElementById('p3').value = data.p3;
        document.getElementById('id').value = data.id;
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  });
  
  function limpiarFormulario() {
    document.getElementById('miFormulario').reset();
  }