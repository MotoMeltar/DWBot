function executeFijar(dl) {
  
  var respuesta = "";
  var texto_descriptivo = "";
  //Primer parámetro: Valor
  var valor = dl.parametros[0];
  Logger.log("Valor:"+valor);
  
  //Segundo parámetro: campo a modificar
  var posicion = posiciones[dl.parametros[1]];
  Logger.log("Posicion: "+JSON.stringify(posicion));
  if (posicion == undefined) {
    throw(dl.id,_("No encuentro el campo que mencionas: ")+dl.parametros[0]);
  }
  
  //Tercer parámetro: Personaje
  var objetivo = cargaHojaPersonajeObligatorio(2,dl);

  if (dl.parametros.length>3) {
    texto_descriptivo = " ("+cursiva(dl.parametros.slice(2).join(" "))+")";
  }
  
  var values = objetivo.getDataRange().getValues();
  var nombrePJ = bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]);
  Logger.log("Nombre del personaje objetivo:"+nombrePJ);

  respuesta = Utilities.formatString(_("El valor de %s del personaje %s es ahora %s."),cursiva(posicion.nombre),nombrePJ,valor)+texto_descriptivo;
    
  Logger.log("Valor original:|"+values[posicion.fila-1][posicion.columna-1]+"|   Nuevo valor:"+valor);
  
  if (dl.isActivo) {
    grabarXPosicion(objetivo, posicion,valor);
  } else {
    respuesta += RETORNO_CARRO+cursiva(_("(Fuera de juego, no se graban datos)"));
  }

  Logger.log("RESPUESTA fijar: "+respuesta);
  
  sendText(dl.id,respuesta);
}