function executeDar(dl) {
  
  var modificador = "";
  var respuesta = "";
  var texto_descriptivo = "";
  //Primer parámetro: Modificador
  if (dl.parametros.length==0 || isNaN(dl.parametros[0])) {
    throw(("El primer parámetro debe ser un número natural: ")+parametros[0]);
  }
  modificador = dl.parametros[0];
  Logger.log("Modificador:"+modificador);
  dl.parametros.shift();
  
  //Segundo parámetro: campo a modificar
  var posicion = posiciones[dl.parametros[0]];
  Logger.log("Posicion: "+JSON.stringify(posicion));
  if (posicion == undefined) {
    throw(_("No encuentro el campo que mencionas: ")+dl.parametros[0]);
  }
  if (posicion.contable == undefined) {
    throw(_("El campo indicado no es contable: ")+dl.parametros[0]);
  }
  dl.parametros.shift();
  
  //Tercer parámetro: Personaje
  var objetivo = "";
  if (dl.parametros.length>0) {
    var nombrePJ = dl.parametros[0];
    Logger.log("parametros tras quitar expresion:"+dl.parametros+" y nombre extraído:"+nombrePJ);
    objetivo = cargaHojaPersonaje(nombrePJ,dl);
  } else {
    throw(_("Falta el alias del personaje a modificar"));
  }
  if (dl.parametros.length>0) {
    texto_descriptivo = " ("+cursiva(dl.parametros.join(" "))+")";
  }
  
  var values = objetivo.getDataRange().getValues();
  var nombrePJ = bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]);
  Logger.log("Nombre del personaje objetivo:"+nombrePJ);

  respuesta = nombrePJ;
  
  if(modificador>-1) {
    respuesta += _(" obtiene ");
  } else {
    respuesta += _(" pierde ");
  }
  
  respuesta += Math.abs(modificador)+" "+posicion.contable+RETORNO_CARRO;
  
  var valor = values[posicion.fila-1][posicion.columna-1];
  var valorMod = eval(Number(valor)+Number(modificador));
  Logger.log("Valor original:|"+valor+"|   Nuevo valor:"+valorMod);
  
  respuesta += _("Ahora tiene ")+valorMod;
  if (dl.isActivo) {
    grabarXPosicion(objetivo, posicion,valorMod);
  } else {
    respuesta += RETORNO_CARRO+cursiva(_("(Fuera de juego, no se graban datos)"));
  }

  Logger.log("RESPUESTA dar: "+respuesta);
  
  sendText(dl.id,sustituir(respuesta,"+",SUMA));
}