let preguntas;


fetch('./assets/preguntas_cultura_general.json')
  .then(response => response.json())
  .then(preguntasJson => {
    preguntas = preguntasJson;
  });


let preguntaActual = 0;  // número de pregunta actual
let puntuacion = 0;    // número de respuestas correctas
let mostrarBotonEmpezar = true;

// Mostrar la pregunta actual
function mostrarPregunta() {

  if (mostrarBotonEmpezar) {
    document.getElementById("botonEmpezar").hidden = true;
    mostrarBotonEmpezar = false;
  }
  const p = preguntas[preguntaActual];
  document.getElementById("pregunta").textContent = p.pregunta

  // Obtenemos el elemento donde
  //mostraremos las opciones
  const elementoOpciones = document.getElementById("opciones");
  //Vaciamos el elemneto
  elementoOpciones.innerHTML = "";

  //Numero de opciones que tenemos
  //Se va a ejecutar tantas veces como opciones tengamos
  for (let i = 0; i < p.opciones.length; i = i + 1) {
    // Creamos un elemento de tipo boton
    const btn = document.createElement("button");
    //Asignamos el texto de una de las opciones a el boton de la opción
    btn.textContent = p.opciones[i];
    btn.onclick = function() {
      comprobarRespuesta(i);
    }
    elementoOpciones.appendChild(btn);
  }
}

// Comprobar si la respuesta es correcta
function comprobarRespuesta(respuestaUsuario) {
  const correcta = preguntas[preguntaActual].respuestaCorrecta;

  if (respuestaUsuario === correcta) {
    const audio = new Audio('assets/sonidoAcierto.mp3');
    audio.play();
    alert("¡Correcto!");
    puntuacion += 1
  } else {
    const audio = new Audio('assets/sonidoFallo.mp3');
    audio.play();
    alert("No es correcto")
  }
  siguientePregunta();
}

// Pasar a la siguiente pregunta o mostrar la puntuación
function siguientePregunta() {
  preguntaActual = preguntaActual + 1;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    document.getElementById("pregunta").textContent = "Juego Terminado";
    document.getElementById("opciones").innerHTML = "";
    document.getElementById("puntuacion").textContent = "Tu puntuacion ha sido: " + puntuacion;
  }
}