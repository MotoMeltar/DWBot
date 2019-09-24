/**
 * Realiza todas las acciones de procesamiento de mensaje.
 */
function procesaCallback(dl) {
    eval(dl.accion)(dl);
}

function disparar_municion(dl) {
  Logger.log("ejecutando callback disparar_municion");

  var respuesta = dl.nombrePJ + " gasta 1 punto de munición.";
  if (dl.hayHojaPJ) {
    var numMunicion = dl.values[posiciones.municion.fila-1][posiciones.municion.columna-1];
    respuesta = bold(dl.values[posiciones.nombre.fila-1][posiciones.nombre.columna-1])+ " gasta 1 punto de munición.";
    if (!isNaN(numMunicion) && numMunicion > 0) {
      numMunicion = numMunicion - 1;
      respuesta += RETORNO_CARRO+" - Le quedan "+bold(numMunicion)+" municiones.";
      if (dl.isActivo)
        grabarXPosicion(dl.hojaPJ, posiciones.municion, numMunicion);
      else
        respuesta += RETORNO_CARRO+cursiva(_("(Fuera de juego, no se graban datos)"));
    }

  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function disparar_menos(dl) {
  Logger.log("ejecutando callback disparar_menos")
  var respuesta = bold(dl.nombrePJ) + " hace un daño reducido.";
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
  if (dl.hayHojaPJ) {
    Logger.log("Envio tirada de daño:"+dl.values[posiciones.danyo.fila-1][posiciones.danyo.columna-1]+"-1d6");
    dl.text = "/daño "+dl.values[posiciones.danyo.fila-1][posiciones.danyo.columna-1]+"-1d6";
    dl.parametros = obtenerParametros(dl.text);
    executeDanyo(dl);
  }
}

function disparar_exponerse(dl) {
  Logger.log("ejecutando callback disparar_exponerse");
    
  respuesta = "¡"+bold(dl.nombrePJ)+ " queda expuesto al peligro!";
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function conjuro_riesgo(dl) {
  Logger.log("ejecutando callback conjuro_riesgo");
  respuesta = "¡"+bold(dl.nombrePJ)+ " queda expuesto al peligro!";
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function conjuro_olvidar(dl) {
  Logger.log("ejecutando callback conjuro_olvidar");
    
  respuesta = "¡"+bold(dl.nombrePJ)+ " olvida el conjuro que ha usado!";
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function conjuro_penalizador(dl) {
  Logger.log("ejecutando callback conjuro_penalizador");
  var respuesta = dl.nombrePJ + " pierde el contacto con su magia.";
  if (dl.hayHojaPJ) {
    Logger.log("Existe personaje");
    var modMagia = dl.values[posiciones.magia.fila-1][posiciones.magia.columna-1];
    var penMagia = dl.values[posiciones.penMagia.fila-1][posiciones.penMagia.columna-1];
    Logger.log("Mod Magia: "+modMagia);
    respuesta = bold(dl.nombrePJ)+ " pierde el contacto con su magia.";
    if (!isNaN(modMagia)) {
      modMagia = modMagia - 1;
      respuesta += RETORNO_CARRO+" - El modificador por magia se reduce a "+modMagia;
      if (dl.isActivo)
        grabarXPosicion(dl.hojaPJ, posiciones.penMagia, penMagia+1);
      else
        respuesta += RETORNO_CARRO+cursiva(_("(Fuera de juego, no se graban datos)"));
    }

  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function levelupChar(dl) {
  Logger.log("ejecutando callback levelup_fue");
  var caracteristica = dl.posiciones[parametros[0]];
    
  respuesta = "¡La "+caracteristica.nombre+" de "+bold(dl.nombrePJ)+ " aumenta!";
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function obtenerNombre(name) {
  var hojaPJ = findSheetByPCName(name);
  if (hojaPJ!="")
    name = valorXPosicion(hojaPJ,posiciones.nombre);
  return name;
}

function TestDispararExponerse() {
  disparar_exponerse(2937540,"MotoMeltar",false);
}

function TestConjuroPenalizador() {
  conjuro_penalizador(2937540,"MotoMeltar",false);
}
