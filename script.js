; (function () {
  "use strict"

  var palabras = [
    "ALURA",
    "SQL",
    "JAVA",
    "PROGRAMAR",
    "ORACLE",
    "PYTHON"
  ]

  var juego = null

  var $html = {
    muneco: document.getElementById("muneco"),
    adivinado: document.querySelector(".adivinado"),
    errado: document.querySelector(".errado")
  }

  function dibujar(juego) {
    // Actualizar la imagen del muneco
    var $elem
    $elem = $html.muneco

    var estado = juego.estado
    if (estado === 8) {
      estado = juego.previo
    }

    $elem.src = "img/imagen-0" + estado + ".png"

    // Letras adivinadas
    var palabra = juego.palabra
    var adivinado = juego.adivinado
    $elem = $html.adivinado
    $elem.innerHTML = ""
    for (let letra of palabra) {
      let $span = document.createElement("span")
      let $txt = document.createTextNode("")
      if (adivinado.indexOf(letra) >= 0) {
        $txt.nodeValue = letra
      }
      $span.setAttribute("class", "letra-1")
      $span.appendChild($txt)
      $elem.appendChild($span)
    }

    // Letras erradas
    var errado = juego.errado
    $elem = $html.errado
    $elem.innerHTML = ""
    for (let letra of errado) {
      let $span = document.createElement("span")
      let $txt = document.createTextNode(letra)
      $span.setAttribute("class", "letra-2")
      $span.appendChild($txt)
      $elem.appendChild($span)
    }
  }

  function adivinar(juego, letra) {
    var estado = juego.estado
    if (estado === 1 || estado === 8) {
      return
    }

    var adivinado = juego.adivinado
    var errado = juego.errado
    if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
      return
    }

    var palabra = juego.palabra
    if (palabra.indexOf(letra) >= 0) {
      let ganado = true
      for (let l of palabra) {
        if (adivinado.indexOf(l) < 0 && l !== letra) {
          ganado = false
          juego.previo = juego.estado
          break
        }
      }
      if (ganado) {
        juego.estado = 8
      }
      adivinado.push(letra)
    } else {
      juego.estado--
      errado.push(letra)
    }
  }

  window.onkeypress = function adivinarLetra(e) {
    var letra = e.key
    letra = letra.toUpperCase()
    if (/[^A-ZÑ]/.test(letra)) {
      return
    }
    adivinar(juego, letra)
    var estado = juego.estado
    if (estado === 8) {
      let palabra = juego.palabra
      alert("¡Felicitaciones, Has ganado! La palabra era: " + palabra)
    } else if (estado === 1) {
      let palabra = juego.palabra
      alert("Has perdido, la palabra era: " + palabra)
    }
    dibujar(juego)
  }

  window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinado = []
    juego.errado = []
    dibujar(juego)
  }

  function palabraAleatoria() {
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]
  }

  nuevoJuego();

}())