function DatosLlamada(data) {  
  this.sheet = null;
  this.isActivo = false;
  this.hojaPJ = "";
  this.values = null;
  this.parametros = [];
  this.chatTitle = "";
  this.isGM = false;
  
  var message = null;
  var from = null;
  
  if (data.callback_query) {
    this.isCallback = true;
    message = data.callback_query.message;
    from = data.callback_query.from;
    this.accion = sustituir(JSON.stringify(data.callback_query.data),'"','');
    this.parametros = obtenerParametros(this.accion)
    if (this.parametros.length>0) {
      this.accion = this.accion.substr(0,this.accion.indexOf(" "));
    }
  } else {
    this.isCallback = false;
    message = data.message;
    from = data.message.from;
    this.text = message.text;
    this.parametros = obtenerParametros(this.text);
  }
  
  this.name = from.username;
  this.id = message.chat.id;
  this.userId = from.id;
  this.chatType = message.chat.type;
  if (from.language_code) {
    I18N.setLocale(from.language_code.substring(0,2));
  } else {
    I18N.setLocale("es");
  }
  
  this.nombrePJ = this.name;
  this.isPrivate = checkPrivate(this.chatType);
  
  
  var ssIdUser = getUserSsId(this.userId);
  
   // Logger.log("SSID USER:"+ssIdUser);

    var log = "Para el usuario "+this.name;

  if (this.isPrivate) {
    this.ssId = ssIdUser;
    log += " en chat privado de SSID: "+this.ssId;
    //Logger.log("Se guarda en this.ssId:"+this.ssId);
  } else {
    this.chatTitle = message.chat.title;

    this.ssId = getChatSsId(this.id);
    log += " en chat público de SSID"
    if (this.ssId!=null) {
      this.isActivo = true;
      log += " (obtenido de la partida):"+this.ssId;
      if (ssIdUser==null) {
        log += " (y se carga en el usuario)";
          cargaArchivoEnProperties(prefijoUsuario+this.name,this.ssId);
      }
    } else {
      this.ssId = ssIdUser;
      log += " (obtenido del usuario):"+this.ssId;
    }
  }

  
  /*if (this.ssId==null) {
    this.ssId = getSsIdFromProperties("DEFAULT");
    if (!this.isPrivate) {
      this.isActivo = true;
    }
  }*/
  
  if (this.ssId!=null) {
    this.sheet = SpreadsheetApp.openById(this.ssId);
    this.hojaPJ = findSheetByPCName(this.name,this.ssId);
    this.hayHojaPJ = this.hojaPJ!="";
    if (this.hayHojaPJ) {
      this.values = this.hojaPJ.getDataRange().getValues();
      this.nombrePJ= this.values[posiciones.nombre.fila-1][posiciones.nombre.columna-1];
      log += " ENCONTRADO PERSONAJE en hoja "+this.sheet.getName();
    } else {
      this.isGM = true;
      log += " NO ENCONTRADO PERSONAJE en hoja "+this.sheet.getName();
    }
  }
  
  
  log("TEXTO:"+this.text);
  Logger.log(log);

}

function getUserSsId(id){
  Logger.log("CLAVE DE USUARIO: user-"+id)
  return getSsIdFromProperties("user-"+id);
}

function getChatSsId(id) {
  return getSsIdFromProperties("chat-"+id);
}

function getSsIdFromProperties(id) {
  return PropertiesService.getScriptProperties().getProperty(id);
}
