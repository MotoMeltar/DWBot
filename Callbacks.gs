/**
 * Realiza todas las acciones de procesamiento de mensaje.
 */
function procesaCallback(dl) {
    eval(dl.accion)(dl);
}

function disparar_municion(dl) {
  Logger.log("ejecutando callback disparar_municion");

  var respuesta = dl.nombrePJ + _(" gasta 1 punto de munición.");
  if (dl.hayHojaPJ) {
    var numMunicion = dl.values[posiciones.municion.fila-1][posiciones.municion.columna-1];
    respuesta = bold(dl.values[posiciones.nombre.fila-1][posiciones.nombre.columna-1])+ _(" gasta 1 punto de munición.");
    if (!isNaN(numMunicion) && numMunicion > 0) {
      numMunicion = numMunicion - 1;
      respuesta += RETORNO_CARRO+Utilities.formatString(I18N.ngettext(" - Le queda %s munición.",numMunicion),numMunicion);
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
  var respuesta = bold(dl.nombrePJ) + _(" hace un daño reducido.");
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
    
  respuesta = Utilities.formatString(_("¡%s queda expuesto al peligro!"),bold(dl.nombrePJ));
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function conjuro_riesgo(dl) {
  Logger.log("ejecutando callback conjuro_riesgo");
  respuesta =  Utilities.formatString(_("¡%s queda expuesto al peligro!"),bold(dl.nombrePJ));
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function conjuro_olvidar(dl) {
  Logger.log("ejecutando callback conjuro_olvidar");
    
  respuesta = Utilities.formatString(_("¡%s olvida su conjuro!"),bold(dl.nombrePJ));
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function conjuro_penalizador(dl) {
  Logger.log("ejecutando callback conjuro_penalizador");
  var respuesta = Utilities.formatString(_("¡%s pierde el contacto con la magia!"),bold(dl.nombrePJ));
  if (dl.hayHojaPJ) {
    Logger.log("Existe personaje");
    var modMagia = dl.values[posiciones.magia.fila-1][posiciones.magia.columna-1];
    var penMagia = dl.values[posiciones.penMagia.fila-1][posiciones.penMagia.columna-1];
    Logger.log("Mod Magia: "+modMagia);
    if (!isNaN(modMagia)) {
      modMagia = modMagia - 1;
      respuesta += RETORNO_CARRO+Utilities.formatString(_(" - El modificador por magia se reduce a %s"),modMagia);
      if (dl.isActivo)
        grabarXPosicion(dl.hojaPJ, posiciones.penMagia, penMagia+1);
      else
        respuesta += RETORNO_CARRO+cursiva(_("(Fuera de juego, no se graban datos)"));
    }

  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function musica_curar(dl) {
  Logger.log("ejecutando callback musica_curar");
  respuesta =  Utilities.formatString(_("%s cura a su compañero %s pg."),bold(dl.nombrePJ), tiraDX(8));
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function musica_danyo(dl) {
  Logger.log("ejecutando callback musica_danyo");
  respuesta =  Utilities.formatString(_("%s aumenta el daño de un compañero en +1d4."),bold(dl.nombrePJ));
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function musica_encantamiento(dl) {
  Logger.log("ejecutando callback musica_encantamiento");
  respuesta =  Utilities.formatString(_("%s libera a un compañero de un encantamiento."),bold(dl.nombrePJ));
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function musica_ayudar(dl) {
  Logger.log("ejecutando callback musica_ayudar");
  respuesta =  Utilities.formatString(_("%s hace que la próxima ayuda de un compañero a otro otorgue un +2."),bold(dl.nombrePJ));
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
