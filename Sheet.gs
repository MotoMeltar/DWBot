//var ssId = "1YLm9s-30ZzjwoHCNfdYfn4EfkuWOb0P9ah53Io8DZ5A"; // FILL IN THE ID OF YOUR SPREADSHEET


/** 
 * Devuelve el ID de la hoja a la que apunta el Bot
 */
function getSheetID(urlSheet) {
  var id  = SpreadsheetApp.openByUrl(urlSheet);
  Logger.log("ID: "+ id.getId().toString());
  Logger.log("NOMBRE: "+ id.getName());

  return id;
}

/**
 * Devuelve la URL de una hoja Excel de google a partir de su ID
 */
/** 
 * Devuelve el ID de la hoja a la que apunta el Bot
 */
function getSheetURL(id) {
  return "https://docs.google.com/spreadsheets/d/"+id+"/edit#gid=0";
}

function appendRow(id, name, text, answer) {
  var sheetName = sheet.getSheetByName("DATOS");
  sheetName.appendRow([new Date(),id,name,text,answer])
}

/**
 * Devuelve la hoja del personaje a partir de su alias de telegram
 * @param name Alias de telegram del personaje
 */
function findSheetByPCName(name,ssId) {
  name = name.replace("@","");
  var hojas = SpreadsheetApp.openById(ssId).getSheets();
  for(n = 0; n < hojas.length; n++) {
     if (valorXPosicion(hojas[n],posiciones.alias)==name) {
       Logger.log("Hoja encontrada:"+hojas[n].getSheetName()+" para nombre:"+name);
        return hojas[n];//.getSheetName();
     }
  }
  return "";
}

/**
 * Devuelve la hoja del personaje a partir de su alias de telegram
 * @param name Alias de telegram del personaje
 */
function findSheetByPCNameWithFile(name,dl) {
  name = name.replace("@","");
  var hojas = dl.sheet.getSheets();
  for(n = 0; n < hojas.length; n++) {
     if (valorXPosicion(hojas[n],posiciones.alias)==name) {
       Logger.log("Hoja encontrada:"+hojas[n].getSheetName()+" para nombre:"+name);
        return hojas[n];//.getSheetName();
     }
  }
  return "";
}

/** 
 * Devuelve el valor de la celda a partir de la posición
 * @param hoja Hoja Excel que se está consultando
 * @param posición Objeto con la posición a consultar (fila y columna)
 */
function valorXPosicion(hoja, posicion) {
  return hoja.getRange(posicion.fila, posicion.columna, 1, 1).getValue();

}

/** 
 * Graba un valor en la celda de la hoja Excel de la posición indicada
 * @param hoja Hoja Excel que se está actualizando
 * @param posición Objeto con la posición a consultar (fila y columna)
 * @param valor Contenido a grabar en la celda
 */
function grabarXPosicion(hoja, posicion, valor) {
  hoja.getRange(posicion.fila, posicion.columna, 1, 1).setValue(valor)
}

/**
 * Carga una ficha de otro personaje suministrado por parámetro
 * @param username Nombre del usuario en Telegram
 * @param dl Objeto con los datos de la llamada.
 */
function cargaHojaPersonaje(username,dl) {
  if (dl.ssId!=null) {
    hojaPJ = findSheetByPCNameWithFile(username,dl);
    var hayficha = hojaPJ!="";
    if (hayficha) {
      Logger.log("hoja objetivo:"+valorXPosicion(hojaPJ,posiciones.nombre));
      dl.parametros.shift();
    } else {
      throw( Utilities.formatString(_("No se encuentra hoja de personaje para Alias:%s en el archivo %s"),bold(username),cursiva(dl.sheet.getName())));
    }
  } else {
    throw( Utilities.formatString(_("No se encuentra hoja de personaje para Alias:%s ya que no encuentro ningún archivo relacionado con él."),bold(username)));
  }

  return hojaPJ;
}

/**
 * Carga una ficha de otro personaje suministrado por parámetro
 * @param username Nombre del usuario en Telegram
 * @param dl Objeto con los datos de la llamada.
 */
function cargaHojaPersonajeObligatorio(posicion,dl) {
  var objetivo = "";
  if (dl.parametros.length>posicion) {
    var nombrePJ = dl.parametros[posicion];
    Logger.log("parametros tras quitar expresion:"+dl.parametros+" y nombre extraído:"+nombrePJ);
    objetivo = cargaHojaPersonaje(nombrePJ,dl);
  } else {
      throw(_("Falta el alias del personaje a modificar"));
  }

  return objetivo;
}