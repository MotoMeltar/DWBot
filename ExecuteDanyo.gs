function executeDanyo(dl) {
  
  var danyo = 0;
  var texto_descriptivo = "";
  var respuesta = Utilities.formatString(_("%s hace una tirada de %s:"),bold(dl.nombrePJ),_(posicion.nombre));
  var isNave = false;
  
  //Primer parámetro: Modificador
  if (dl.parametros.length>0) {
    if (Number.isInteger(dl.parametros[0])) {
      danyo = dl.parametros[0];
      dl.parametros.shift();
    } else {
      throw (_("El primer parámetro debe ser un número de daño."))
    }
  }
  
  //Segundo parámetro: si viene "nave" es una nave;
  if (dl.parametros.length>0) {
    if (dl.parametros[0].toLowerCase()=="nave") {
      isNave = true;
      dl.parametros.shift();
    }
  }
  
  //Resto de parámetros: Objetivo
  if (dl.parametros.length>0) {
    if (dl.parametros[0].charAt(0)=="@") {
      if (isNave) {
        
      } else {
      }
    }
  } else {
    throw (_("No se ha especificado Objetivo."))
  }
}
