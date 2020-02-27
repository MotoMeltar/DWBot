function executeLevelUp(name, id) {
  var nombrePJ = name;
  var hojaPJ = findSheetByPCName(nombrePJ);
  if (hojaPJ!="") {
    var values = hojaPJ.getDataRange().getValues();
      var px = values[posiciones.px.fila-1][posiciones.px.columna-1];
      var nivel = values[posiciones.nivel.fila-1][posiciones.nivel.columna-1];
      if (puedeSubir(px,nivel)) {
        var mensaje = "¡"+bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1])+ " sube al nivel"+bold(nivel+1)+"!";
        sendText(id,mensaje);

        var mensajeCaracteristica = "Elige una característica que aumentar:"+RETORNO_CARRO;
        for(var i=posiciones.fue.fila-1;i<posiciones.car.fila;i++){
          Logger.log("FILA: "+i);
          mensajeCaracteristica = mensajeCaracteristica+bold(values[i][posiciones.fue.columna-3])+":"+values[i][posiciones.fue.columna-2]+" ("+values[i][posiciones.fue.columna-1]+")"+RETORNO_CARRO;
        }
          
        var textoEncoded = codeMarkdown(mensajeCaracteristica);
        sendTextKeyboard(id,textoEncoded,keyboard.level_up_caracteristica);
        
      } else {
        var pxFaltantes = 7+nivel-px;
        sendText(id,bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1])+" no tiene suficientes px para subir de nivel."+RETORNO_CARRO+
                 "Necesita "+cursiva(pxFaltantes)+" px más para llegar a nivel "+bold(nivel+1));
      }

  } else {
    var respuesta = "No hay ningún personaje para el alias de Telegram "+name;
    Logger.log("RESPUESTA (No hay personaje): "+respuesta);
    sendText(id,respuesta);
  }

}

/**
 * Comprueba si el personaje puede subir de nivel
 * @param px Número de puntos de experiencia actuales del personaje
 * @param nivel Nivel actual del personaje
 */
function puedeSubir(px,nivel) {
  if (px>nivel+6) {
    return true;
  }
  return false;
}