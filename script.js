; (function () {
  "use strict"

  var juego = {
    palabra: "ALURA",
    estado: 1,
    adivinado: ["A", "L"],
    errado: ["B", "J", "K", "C"]
  }

  var $html = {
    muneco: document.getElementById("muneco"),
    adivinado: document.querySelector(".adivinado"),
    errado: document.querySelector(".errado")
  }
  function dibujar(juego) {
    // Actualizar la imagen del muneco
    var $elem
    $elem = $html.muneco
    $elem.src = "img/imagen-0" + juego.estado + ".png"

    // Letras adivinadas
    var palabra = juego.palabra
    var adivinado = juego.adivinado
    $elem = $html.adivinado
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
    for (let letra of errado) {
      let $span = document.createElement("span")
      let $txt = document.createTextNode(letra)
      $span.setAttribute("class", "letra-2")
      $span.appendChild($txt)
      $elem.appendChild($span)
    }
  }

  console.log(juego);
  dibujar(juego);

}())