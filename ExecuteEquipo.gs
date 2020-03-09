function executeEquipo(dl) {
  var hojaPJ = "";
  var nombrePJ = dl.name;
  if (dl.parametros.length>0) {
    nombrePJ = dl.parametros[0];
    Logger.log("parametros tras quitar expresion:"+dl.parametros+" y nombre extraído:"+nombrePJ);
    hojaPJ = findSheetByPCName(nombrePJ,dl.ssId);
    var hayficha = hojaPJ!="";
    if (hayficha) {
      objetivo = hojaPJ;
      Logger.log("hoja objetivo:"+valorXPosicion(hojaPJ,posiciones.nombre));
      dl.parametros.shift();
    } else {
      throw(_("No se encuentra hoja de personaje para Alias:")+nombrePJ);
    }
  } else {
    hojaPJ = dl.hojaPJ;
  }
  Logger.log("Buscando hoja para "+nombrePJ+" y encontramos:"+hojaPJ);
  var respuesta = _("No se encuentra hoja de personaje para Alias:")+dl.name;
  if (hojaPJ!="") {
    var values = hojaPJ.getRange(posiciones.equipo.fila, posiciones.equipo.columna, (posiciones.equipo.filafin-posiciones.equipo.fila), posiciones.equipo.columnaNotas).getValues();
    var respuesta = bold(valorXPosicion(hojaPJ,posiciones.nombre))+ " tiene en su inventario:";

    for (var row in values) {
      if (values[row]!=undefined && values[row][0].trim()!="") {
        respuesta += RETORNO_CARRO+" - "+bold(values[row][0]);
        if (values[row][1]!="") {
          respuesta += " ("+cursiva(values[row][1]+" usos")+")";
        }
        respuesta += ":"+values[row][4];
      }
    }
    if (!dl.isPrivate) {
      respuesta += RETORNO_CARRO+Utilities.formatString("puedes usar este comando abriéndome un canal %s", link(_("privado"),"https://telegram.me/DWMochilaBot"));
    }
  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}