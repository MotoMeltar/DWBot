var prefijoUsuario = "user-";
var prefijoChat = "chat-";

function executeArchivo(dl) {
  Logger.log("Ejecutando comando /archivo");
  if (dl.parametros.length == 0) {
    if (dl.ssId==null) {
      sendText(dl.id,_("No tienes ninguna Hoja de Personaje vinculada a este usuario.")+RETORNO_CARRO+
               "Usa /archivo (ID o la URL de la hoja de personaje en google spreadsheets) para asociar una a tu usuario, o /ayuda para aprender como crear una.");
    } else {
      sendText(dl.id,Utilities.formatString(_("El archivo por defecto para tu usuario está [aquí](%s)"),getSheetURL(idSheet)));

    }
    return;
  }
  var idSheet = recoverSheetID(dl.parametros[0]);
  var respuesta = "";
  if (idSheet!=null) {
    cargaArchivoEnProperties(prefijoUsuario+dl.userId,idSheet);
    respuesta = Utilities.formatString(_("El archivo por defecto para tu usuario está [aquí](%s)"),getSheetURL(idSheet));
  } else {
    respuesta = Utilities.formatString(_("No he podido obtener una hoja de cálculo accesible desde %s"),dl.parametros[0]);
  }
   sendText(dl.id,respuesta);

}

function executePartida(dl) {
  Logger.log("Ejecutando comando /partida");
  var ssIdPartida = ""
  if (dl.isPrivate) {
    sendText(dl.id,_("Solo pueden declararse chats de grupo como Partidas activas."));
    return;
  }
  if (dl.parametros.length == 0) {
    //ssIdPartida = createNewFile(dl.chatTitle);
    sendText(dl.id,_("Es necesario indicar un ID o URL a un Google Spreadsheet correctamente formateado para comenzar una partida."));
    return;
  } else {
    ssIdPartida = recoverSheetID(dl.parametros[0]);
  }
  
  if (ssIdPartida!=null) {
    cargaArchivoEnProperties(prefijoChat+dl.id,ssIdPartida);
    respuesta = Utilities.formatString(_("Para la partida %s se usará el archivo enlazado [aquí](%s)"),bold(dl.chatTitle),getSheetURL(ssIdPartida));
  } else {
    respuesta = _("La Hoja de cálculo con el ID o URL indicada no existe o no tiene el acceso Público.");
  }
  Logger.log("RESPUESTA PARTIDA:"+respuesta);
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