var prefijoUsuario = "user-";
var prefijoChat = "chat-";

function executeArchivo(dl) {
  Logger.log("Ejecutando comando /archivo");
  if (dl.parametros.length == 0) {
    if (dl.ssId==null) {
      sendText(dl.id,"No tienes ninguna Hoja de Personaje vinculada a este usuario."+RETORNO_CARRO+
               "Usa /archivo (ID o la URL de la hoja de personaje en google spreadsheets) para asociar una a tu usuario, o /ayuda para aprender como crear una.");
    } else {
      sendText(dl.id,"El archivo por defecto para tu usuario está "+link("aquí",getSheetURL(idSheet)));

    }
    return;
  }
  var idSheet = recoverSheetID(dl.parametros[0]);
  var respuesta = "";
  if (idSheet!=null) {
    cargaArchivoEnProperties(prefijoUsuario+dl.userId,idSheet);
    respuesta = "El archivo por defecto para tu usuario está "+link("aquí",getSheetURL(idSheet));
  } else {
    respuesta = "No he podido obtener una hoja de cálculo accesible desde "+dl.parametros[0];
  }
   sendText(dl.id,respuesta);

}

function executePartida(dl) {
  Logger.log("Ejecutando comando /partida");
  var ssIdPartida = ""
  if (dl.isPrivate) {
    sendText(dl.id,"Solo pueden declararse chats de grupo como Partidas activas.");
    return;
  }
  if (dl.parametros.length == 0) {
    ssIdPartida = createNewFile(dl.chatTitle);
  } else {
    ssIdPartida = recoverSheetID(dl.parametros[0]);
  }
  
  if (ssIdPartida!=null) {
    cargaArchivoEnProperties(prefijoChat+dl.id,ssIdPartida);
    respuesta = "Para la partida "+bold(dl.chatTitle)+" se usará el archivo enlazado "+link("aquí",getSheetURL(ssIdPartida));
  } else {
    if (dl.parametros.length > 0) {
      respuesta = "No he podido obtener una hoja de cálculo accesible desde "+dl.parametros[0];
    } else {
      respuesta = "No se ha podido crear un nuevo archivo de datos";
    }
  }
   sendText(dl.id,respuesta);

}

function recoverSheetID(parametro) {
  Logger.log("Comprobando validez de  parámetro:"+parametro);
   var id  = null;
  try {
    id  = SpreadsheetApp.openByUrl(parametro).getId();
  } catch (e) {
    try {
    Logger.log("La ID no es una URL válida")
    id = SpreadsheetApp.openById(parametro).getId();
    } catch (e) {
      Logger.log("La ID no es una ID existente")
      }
  }
  Logger.log("Devolviendo ID: "+id);
  return id;
}

function cargaArchivoEnProperties(id,idSheet) {
  PropertiesService.getScriptProperties().setProperty(id, idSheet);
}

function createNewFile(titulo){
  var idPlantilla = "### File ID ###";
  var file = DriveApp.getFileById(idPlantilla).makeCopy(); 
  file.setName(titulo);
  return file.getId();
}