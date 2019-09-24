var tokenString = "750768171:AAHXEU2MPZbjxLa_-7AdcCjqA36sROQayIg"; // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + tokenString;
var webAppUrl = "https://script.google.com/macros/s/AKfycbwZwHKwHZOkDhT8jH_UgZ4CJxabNtmL8eDlmJkNrUJg9AEKkW5q/exec"; // FILL IN YOUR GOOGLE WEB APP ADDRESS
var arrayMagos = ["Mago"];
var arrayClerigos = ["Explorador","Clérigo","Paladín"];

//Logger = BetterLog.useSpreadsheet('1F1TD6wify7UjbG5Im8sssX3-YiRq8VVRq8gbXZyAedY'); 

var posiciones = { oro: { fila:5, columna: 4, nombre: "Oro", contable: "monedas de Oro"},
                   municion: { fila:15, columna: 11, nombre: "Munición", contable: "munición"},
                   raciones: { fila:14, columna: 11, nombre: "Ración", contable: "raciones"},
                   armadura: { fila:14, columna: 5, nombre: "Armadura", contable: "puntos de Armadura"},
                   pg: { fila:14, columna: 3, nombre: "Puntos de Golpe", contable: "Puntos de Golpe"},
                   pgmax: { fila:14, columna: 4, nombre: "Puntos de golpe máximos", contable: "Puntos de golpe máximos"},
                   px: { fila:5, columna: 2, nombre: "PX", contable: "PX"},
                   nivel: { fila:5, columna: 3, nombre: "Nivel"},
                   clase: { fila:3, columna: 3, nombre: "Clase"},
                   nombre: { fila:2, columna: 3, nombre: "Nombre"},
                  danyo: { fila: 14, columna: 2, nombre: "Daño"},
                  alias: { fila:12, columna: 9, nombre: "Alias"},
                  fue: { fila:7, columna: 4, nombre: "Fuerza", herida: "debilitado", contable: "puntos de Fuerza"},
                  des: { fila:8, columna: 4, nombre: "Destreza", herida: "tembloroso", contable: "puntos de Destreza"},
                  con: { fila:9, columna: 4, nombre: "Constitución", herida: "enfermo", contable: "puntos de Constitución"},
                  int: { fila:10, columna: 4, nombre: "Inteligencia", herida: "aturdido", contable: "puntos de Inteligencia"},
                  sab: { fila:11, columna: 4, nombre: "Sabiduría", herida: "confundido", contable: "puntos de Sabiduría"},
                  car: { fila:12, columna: 4, nombre: "Carisma", herida: "marcado", contable: "puntos de Carisma"},
                  alineamiento:{fila:3, columna: 6, nombre: "Alineamiento"},
                  magia:{fila:54, columna: 2, nombre: "Mod. Magia", contable: "Magia"},
                  penMagia:{fila:54, columna:5, nombre: "Pen. Magia", contable: "Penalizador"},
                  raza:{fila:5, columna: 6, nombre: "Raza"},
                  enjuego: { fila:5, columna: 5, nombre: "En juego"},
                  equipo: { fila:41, columna: 2, nombre: "En juego",columnaUsos: 3, columnaNotas:6, filafin:51}
                 };
var masterTabla = { 
  id: "Master Tabla",
  informacion: { clase:0,nombre:1,alias:2, pg:8, pgmax:7, check: 3, checkAlin: 6 },
  clases: { inicial: 1, final: 11 }
}
  


function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function getUpdates() {
  var url = telegramUrl + "/getUpdates";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function getWebhook() {
  var url = telegramUrl + "/getWebhook";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  var params = JSON.stringify(e);
  return HtmlService.createHtmlOutput(params);
}
/*function doGet(e) {
  var params = JSON.stringify(e);
  var html = HtmlService.createHtmlOutput(params);
  html = html.evaluate();
  html.setSandboxMode(HtmlService.SandboxMode.EMULATED);
  return html;
}*/
/**
 * Realiza todas las acciones de procesamiento de mensaje.
 */
//function procesaMensaje(data,text,id,name,isGM,isPrivate) {
function procesaMensaje(dl) {
  
  var comando = getPrimeraPalabra(dl.text).toLowerCase();
  Logger.log("COMANDO: "+comando);
  if (esComando(comando,"/status")) {
    Logger.log("Ejecutando comando de status");
    executeStatus(dl);
  } else if (esComando(comando,"/tira") || esComando(comando,"/roll")) {
    Logger.log("Ejecutando comando de Tirada");
    executeRoll(dl);
  } else if (esComando(comando,"/fue")) {
    Logger.log("Ejecutando comando de Tirada Fuerza");
    executeCharRoll(dl, posiciones.fue);
  } else if (esComando(comando,"/des")) {
    Logger.log("Ejecutando comando de Tirada Destreza");
    executeCharRoll(dl, posiciones.des);
  } else if (esComando(comando,"/con")) {
    Logger.log("Ejecutando comando de Tirada Constitucion");
    executeCharRoll(dl, posiciones.con);
  } else if (esComando(comando,"/int")) {
    Logger.log("Ejecutando comando de Tirada Inteligencia");
    executeCharRoll(dl, posiciones.int);
  } else if (esComando(comando,"/sab")) {
    Logger.log("Ejecutando comando de Tirada Sabiduria");
    executeCharRoll(dl, posiciones.sab);
  } else if (esComando(comando,"/car")) {
    Logger.log("Ejecutando comando de Tirada Carisma");
    executeCharRoll(dl, posiciones.car);
  } else if (esComando(comando,"/disparar")) {
    Logger.log("Ejecutando comando de Tirada Disparar");
    executeParcialTeclado(dl, " dispara una flecha.", posiciones.des, keyboard.disparar);
  } else if (esComando(comando,"/conjuro")) {
    Logger.log("Ejecutando comando de Tirada Conjuro");
    executeParcialTeclado(dl, " invoca un conjuro.", posiciones.magia, keyboard.conjuro);
  } else if (esComando(comando,"/acampar")) {
    Logger.log("Ejecutando comando Acampar");
    executeAcampar(dl);
  } else if (esComando(comando,"/daño")) {
    Logger.log("Ejecutando comando Daño");
    executeDanyo(dl);
  } else if (esComando(comando,"/ayuda")) {
    Logger.log("Ejecutando comando Ayuda");
    executeAyuda(dl);
  } else if (esComando(comando,"/mov")) {
    Logger.log("Ejecutando comando Mostrar Movimiento");
    executeMov(dl);
  } else if (esComando(comando,"/vida")) {
    Logger.log("Ejecutando comando Mostrar Vida");
    executeVida(dl);
  } else if (esComando(comando,"/equipo")) {
    Logger.log("Ejecutando comando Mostrar Equipo");
    executeEquipo(dl);
  } else if (esComando(comando,"/levelup")) {
    Logger.log("Ejecutando comando Level Up");
    executeLevelUp(dl);
  } else if (dl.isGM) {
    Logger.log("Entramos en comandos de GM");
    if (esComando(comando,"/curar") || esComando(comando,"/cura")) {
      Logger.log("Ejecutando comando Curar");
      executeCurar(dl);
    } else if (esComando(comando,"/herir")) {
      Logger.log("Ejecutando comando Herir");
      executeHerir(dl);
    } else if (esComando(comando,"/dar")) {
      Logger.log("Ejecutando comando Dar");
      executeDar(dl);
    } else if (esComando(comando,"/archivo")) {
      Logger.log("Ejecutando comando Archivo");
      executeArchivo(dl);
    } else if (esComando(comando,"/partida")) {
      Logger.log("Ejecutando comando Partida");
      executePartida(dl);
    }
  }
}

function executeVida(dl) {
  var name = dl.name;
  var id = dl.id;
  
  if (dl.ssId!=null && dl.ssId!="") {
    var allsheets = SpreadsheetApp.openById(dl.ssId).getSheets();
    respuesta = _("Resumen de puntos de vida:");
    for (var currentSheet in allsheets) {
      try {
      var values = allsheets[currentSheet].getDataRange().getValues();
      Logger.log("enjuego:"+values[posiciones.enjuego.fila-1][posiciones.enjuego.columna-1]+" "+JSON.stringify(posiciones.pg)+" "+JSON.stringify(values[posiciones.pg.fila-1]));
      if (values[posiciones.enjuego.fila-1][posiciones.enjuego.columna-1]===true) {
         //respuesta += RETORNO_CARRO+"- "+bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1])
         //  +" PG:"+values[posiciones.pg.fila-1][posiciones.pg.columna-1]+"/"+values[posiciones.pgmax.fila-1][posiciones.pgmax.columna-1];
        respuesta += RETORNO_CARRO+Utilities.formatString(_("- %s PG:%s/%s"), bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]),
                                            values[posiciones.pg.fila-1][posiciones.pg.columna-1],values[posiciones.pgmax.fila-1][posiciones.pgmax.columna-1]);
        
      }
      }catch (e) {
        Logger.info("Hoja sin dato");
      }
    }

  } else {
    respuesta = _("No hay ninguna ficha asignada al chat ni al usuario.");
  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(id,respuesta);
}

function executeMov(dl) {
  
  var movimiento = cargaMovimiento(dl.parametros[0]);
  Logger.log("Movimiento: "+JSON.stringify(movimiento));
  var respuesta = "";
  if (movimiento == undefined) {
    var movimientos = Object.keys(cargaTodosMovimiento());
    Logger.log("Movimientos disponibles: "+JSON.stringify(movimientos));

    respuesta = _("Los movimientos que puedes consultar son:");
    for(var i=0;i<movimientos.length;i++){
      var key = movimientos[i];
      respuesta += RETORNO_CARRO+" - "+key;
    }
  } else {
    respuesta += bold(movimiento.nombre)+RETORNO_CARRO;
    if (movimiento.condicion!="")
      respuesta += movimiento.condicion+RETORNO_CARRO;
    if (dl.parametros.length>1) {
      if (parseInt(parametros[1])>9) {
        respuesta += movimiento.total+RETORNO_CARRO;
      } else if (parseInt(parametros[1])>6) {
        respuesta += movimiento.parcial+RETORNO_CARRO;
      } else {
        respuesta += movimiento.fracaso+RETORNO_CARRO;
      }
    } else {
      if (movimiento.total!="")
        respuesta += movimiento.total+RETORNO_CARRO
      if (movimiento.parcial!="")
        respuesta += movimiento.parcial+RETORNO_CARRO
      if (movimiento.fracaso!="")
        respuesta+=movimiento.fracaso+RETORNO_CARRO;
    }
    respuesta+=movimiento.texto;
  }
                         
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

function executeStatus(dl) {
  var hojaPJ = "";
  var nombrePJ = name;
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
      sendText(id,_("No se encuentra hoja de personaje para Alias:")+nombrePJ);
      return;
    }
  } else {
    hojaPJ = dl.hojaPJ;
  }
  Logger.log("Buscando hoja para "+nombrePJ+" y encontramos:"+hojaPJ);
  var respuesta = _("No se encuentra hoja de personaje para Alias:")+name;
  if (hojaPJ!="") {
    var values = hojaPJ.getDataRange().getValues();
    var respuesta = Utilities.formatString(_("%s (%s) tiene:"), bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]),
                                           values[posiciones.clase.fila-1][posiciones.clase.columna-1])+RETORNO_CARRO;
    respuesta += Utilities.formatString(_(" - %s PX, "),values[posiciones.px.fila-1][posiciones.px.columna-1])+statusField(values,posiciones.nivel)
        +", "+statusField(values,posiciones.danyo)+RETORNO_CARRO;
    respuesta += _(" - PG: ")+values[posiciones.pg.fila-1][posiciones.pg.columna-1]+"/"+values[posiciones.pgmax.fila-1][posiciones.pgmax.columna-1]+ RETORNO_CARRO +
        " - "+statusField(values,posiciones.oro)+", "+statusFieldPlural(values,posiciones.raciones)+", "+statusField(values,posiciones.municion);
        
    respuesta += RETORNO_CARRO +" - "+ statusChar(values,posiciones.fue)+", "+statusChar(values,posiciones.con)+", "+statusChar(values,posiciones.des);
    respuesta += RETORNO_CARRO +" - "+ statusChar(values,posiciones.int)+", "+statusChar(values,posiciones.sab)+", "+statusChar(values,posiciones.car);
    respuesta += RETORNO_CARRO+" - "+bold(_("Alineamiento"))+": "+values[posiciones.alineamiento.fila-1][posiciones.alineamiento.columna-1]+" ("+cursiva(values[posiciones.alineamiento.fila-1][posiciones.alineamiento.columna])+")";
    if (!dl.isPrivate) {
      respuesta += RETORNO_CARRO+Utilities.formatString(cursiva(_("puedes usar este comando abriéndome un canal %s")), link(_("privado"),"https://telegram.me/DWMochilaBot"));
    }
  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}

  function statusChar(values,posicion) {
    var textoCharStatus = _(posicion.nombre)+": "+ values[posicion.fila-1][posicion.columna-2] +" ("+ values[posicion.fila-1][posicion.columna-1]+")"  ;
    if (values[posicion.fila-1][posicion.columna]) {
      textoCharStatus +=", "+cursiva(_(posicion.herida));
    }
    return textoCharStatus;
  }

  function statusField(values,posicion) {
    var textoFieldStatus = _(posicion.nombre)+": "+ values[posicion.fila-1][posicion.columna-1] ;
    return textoFieldStatus;
  }

  function statusFieldPlural(values,posicion) {
    Logger.log(posicion.nombre+","+values[posicion.fila-1][posicion.columna-1]);
    var textoFieldStatus = I18N.ngettext(posicion.nombre, values[posicion.fila-1][posicion.columna-1])+": "+ values[posicion.fila-1][posicion.columna-1] ;
    return textoFieldStatus;
  }

function executeAcampar(dl) {

  var respuesta = _("No se encuentra hoja de personaje para Alias:")+dl.name;
  if (dl.hayHojaPJ) {
    Logger.log("Existe hoja de personaje");
    var numRaciones = dl.values[posiciones.raciones.fila-1][posiciones.raciones.columna-1];
    respuesta = bold(dl.nombrePJ)+ _(" acampa:");
    if (!isNaN(numRaciones) && numRaciones > 0) {
      Logger.log("El personaje tiene raciones");
      numRaciones = numRaciones - 1;
      if (dl.isActivo)
        grabarXPosicion(dl.hojaPJ, posiciones.raciones, numRaciones);
      respuesta += RETORNO_CARRO+Utilities.formatString(I18N.ngettext(" - Le queda %s ración.",numRaciones),numRaciones);
      var pg = dl.values[posiciones.pg.fila-1][posiciones.pg.columna-1];
      var pgmax = dl.values[posiciones.pgmax.fila-1][posiciones.pgmax.columna-1];
      Logger.log(" PG: "+pg+"/"+pgmax);
      if (pg<pgmax) {
        var curacion = Math.floor(pgmax/2);
        if (curacion>(pgmax-pg)) {
          curacion = pgmax-pg;
        }
        Logger.log("Curacion: "+curacion);
        if (dl.isActivo)
          grabarXPosicion(dl.hojaPJ, posiciones.pg, pg+curacion);
        respuesta += RETORNO_CARRO +Utilities.formatString(_(" - Se cura %s PG para un total de %s."),curacion,(pg+curacion));
      }
      
      if (!isNaN(dl.values[posiciones.penMagia.fila-1][posiciones.penMagia.columna-1]) && (dl.values[posiciones.penMagia.fila-1][posiciones.penMagia.columna-1]>0) ) {
        respuesta += RETORNO_CARRO +_(" - Recupera su conexión con la magia.");
        if (dl.isActivo) {
          grabarXPosicion(dl.hojaPJ, posiciones.penMagia, "0");
        }
      }
      
      var px = dl.values[posiciones.px.fila-1][posiciones.px.columna-1];
      var nivel = dl.values[posiciones.nivel.fila-1][posiciones.nivel.columna-1];
      Logger.log(" PX: "+px+" NIVEL: "+nivel);
      if (px>(nivel+6)) {
        respuesta += RETORNO_CARRO+" - "+bold(Utilities.formatString(_("¡Puede subir a nivel %s!"),nivel+1));
      }
      
      Logger.log(respuesta);
      
      if (!dl.isActivo)
        respuesta += textoChatInactivo;
    } else {
      respuesta += _("No tiene raciones.");
    }
  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}


function mensajeParametros(parametros) {
  var respuesta = "";
  for(n = 0; n < parametros.length; n++) {
     respuesta = respuesta +" "+ parametros[n];
  }
  return respuesta.substr(1);
}

function executeCharRoll(dl, posicion) {

  var texto_accion = " hace una tirada de "+posicion.nombre;
  var modificador = 0;
  var texto_descriptivo = "";
  var respuesta = "";
  if (dl.parametros.length>0) {
    if (!isNaN(dl.parametros[0])) {
      modificador = dl.parametros[0];
      if (dl.parametros.length>1) {
        dl.parametros.shift();
      }
    }
  }
  if (dl.parametros.length>0) {
    texto_descriptivo = "("+cursiva(mensajeParametros(dl.parametros))+")";
  }
  Logger.log(dl.hayHojaPJ)
  //if (modificador===0) {
    if (dl.hayHojaPJ) {
      modificador = valorXPosicion(dl.hojaPJ,posicion)+modificador;
      Logger.log("VALOR DE CARACTERISTICA + MODIFICADOR: "+modificador);
    }
  //}

  respuesta = tiraDW(modificador, texto_descriptivo, texto_accion, dl);
  sendText(dl.id,respuesta);
}

function executeDar(dl) {
  
  var modificador = "";
  var respuesta = "";
  var texto_descriptivo = "";
  var texto_alineamiento = "";
  //Primer parámetro: Modificador
  if (dl.parametros.length==0 || isNaN(dl.parametros[0])) {
    sendText(id,"El primer parámetro debe ser un número natural:"+parametros[0]);
    return;
  }
  modificador = dl.parametros[0];
  Logger.log("Modificador:"+modificador);
  dl.parametros.shift();
  
  //Segundo parámetro: campo a modificar
  var posicion = posiciones[dl.parametros[0]];
  Logger.log("Posicion: "+JSON.stringify(posicion));
  if (posicion == undefined) {
    sendText(dl.id,"No encuentro el campo que mencionas: "+dl.parametros[0]);
    return;
  }
  if (posicion.contable == undefined) {
    sendText(dl.id,"El campo indicado no es contable: "+dl.parametros[0]);
    return;
  }
  dl.parametros.shift();
  
  //Tercer parámetro: Personaje
  var objetivo = "";
  if (dl.parametros.length>0) {
    var nombrePJ = dl.parametros[0];
    Logger.log("parametros tras quitar expresion:"+dl.parametros+" y nombre extraído:"+nombrePJ);
    var hojaPJ = findSheetByPCName(nombrePJ,dl.ssId);
    var hayficha = hojaPJ!="";
    if (hayficha) {
      objetivo = hojaPJ;
      Logger.log("hoja objetivo:"+valorXPosicion(hojaPJ,posiciones.nombre));
      dl.parametros.shift();
    } else {
      sendText(dl.id,"No se encuentra hoja de personaje para Alias:"+nombrePJ);
      return;
    }
  } else {
      sendText(dl.id,"Falta el alias del personaje a modificar");
      return;
    }
  if (dl.parametros[0]=="al") {
    texto_alineamiento=marcarAlineamiento(nombrePJ, hojaPJ);
    dl.parametros.shift();
  }
  if (dl.parametros.length>0) {
    texto_descriptivo = " ("+cursiva(mensajeParametros(dl.parametros))+")";
  }
  
  var values = objetivo.getDataRange().getValues();
  var nombrePJ = bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]);
  Logger.log("Nombre del personaje objetivo:"+nombrePJ);

  respuesta = nombrePJ;
  
  if(modificador>-1) {
    respuesta += " obtiene ";
  } else {
    respuesta += " pierde ";
  }
  
  respuesta += Math.abs(modificador)+" "+posicion.contable+RETORNO_CARRO;
  
  var valor = values[posicion.fila-1][posicion.columna-1];
  var valorMod = eval(Number(valor)+Number(modificador));
  Logger.log("Valor original:|"+valor+"|   Nuevo valor:"+valorMod);
  
  respuesta += "Ahora tiene "+valorMod;
  respuesta += texto_alineamiento;
  if (dl.isActivo) {
    grabarXPosicion(objetivo, posicion,valorMod);
  } else {
    respuesta += textoChatInactivo;
  }

  Logger.log("RESPUESTA dar: "+respuesta);
  
  sendText(dl.id,sustituir(respuesta,"+",SUMA));
}

// TODO: CAMBIAR A MARCAR EN LA FICHA
function marcarAlineamiento(name) {
  var respuesta = ""
  name = name.replace("@","");
  var hojaMaster = SpreadsheetApp.openById(dl.ssId).getSheetByName(masterTabla.id);
  if (hojaMaster!="") {
    var values = hojaMaster.getDataRange().getValues();
    Logger.log("VALUES:"+JSON.stringify(values));
    for(var i=masterTabla.clases.inicial;i<masterTabla.clases.final+1;i++){
      Logger.log("Comparando "+values[masterTabla.informacion.alias][i]+" con "+name);
      if (values[masterTabla.informacion.alias][i]===name) {
        Logger.log("Encontrado check alineamiento para: "+values[masterTabla.informacion.nombre][i]+" con valor:"+values[masterTabla.informacion.checkAlin][i]+" en la posicion "+masterTabla.informacion.checkAlin+","+i);
        if (values[masterTabla.informacion.checkAlin][i]==true) {
          Logger.log("El alineamiento ya ha sido marcado");
          respuesta = RETORNO_CARRO+"El alineamiento ya había sido marcado"
        } else {
          Logger.log("MARCAMOS la casilla de alineamiento");

          respuesta = RETORNO_CARRO+cursiva("Se ha cumplido el alineamiento esta aventura");
          hojaMaster.getRange(masterTabla.informacion.checkAlin+1, i+1, 1, 1).setValue("TRUE");
        }        
        return respuesta;
      }
    }
  }
}

function executeCurar(dl) {
  
  var curacion = "";
  var respuesta = "";
  var texto_descriptivo = "";
  if (dl.parametros.length==0 || isNaN(dl.parametros[0])) {
    sendText(dl.id,"La cantidad de daño a curar debe ser un número:"+dl.parametros[0]);
    return;
  }
  curacion = dl.parametros[0];
  Logger.log("Cantidad de curacion:"+curacion);
  dl.parametros.shift();
  var objetivo = "";
  if (dl.parametros.length>0) {
    var nombrePJ = dl.parametros[0];
    Logger.log("parametros tras quitar expresion:"+dl.parametros+" y nombre extraído:"+nombrePJ);
    var hojaPJ = findSheetByPCName(nombrePJ,dl.ssId);
    var hayficha = hojaPJ!="";
    if (hayficha) {
      objetivo = hojaPJ;
      Logger.log("hoja objetivo:"+valorXPosicion(hojaPJ,posiciones.nombre));
      dl.parametros.shift();
    } else {
      sendText(dl.id,"No se encuentra hoja de personaje para Alias:"+nombrePJ);
      return;
    }
  }
  if (dl.parametros.length>0) {
    texto_descriptivo = " ("+cursiva(mensajeParametros(dl.parametros))+")";
  }

  respuesta = curar(curacion, objetivo, texto_descriptivo, dl);
  
  sendText(dl.id,sustituir(respuesta,"+",SUMA));
}

function curar(curacion, objetivo, texto_descriptivo,dl) {
  
  var values = objetivo.getDataRange().getValues();
  var nombrePJ = bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]);
  Logger.log("Nombre del personaje objetivo:"+nombrePJ);

  var respuesta = "";
  
  var pgActuales = values[posiciones.pg.fila-1][posiciones.pg.columna-1];
  var pgMax = values[posiciones.pgmax.fila-1][posiciones.pgmax.columna-1];
  var diferencia = pgMax-pgActuales;
  if (curacion>diferencia)
    curacion = diferencia;
  Logger.log("PG: "+pgActuales+"/"+pgMax+" pasan a "+eval(pgActuales+curacion));
  pgActuales = parseInt(pgActuales)+parseInt(curacion);
  respuesta = nombrePJ + " recupera "+curacion+" PG, para un total de "+pgActuales+"/"+pgMax;
    if (dl.isActivo) {
      grabarXPosicion(objetivo, posiciones.pg,pgActuales);
    } else {
      respuesta += textoChatInactivo;
    }

  Logger.log("RESPUESTA curar: "+respuesta);
  return respuesta;
}

function executeHerir(dl) {
  
  var curacion = "";
  var respuesta = "";
  var texto_descriptivo = "";

  var objetivo = "";
  if (dl.parametros.length>0) {
    var nombrePJ = dl.parametros[0];
    Logger.log("parametros tras quitar expresion:"+dl.parametros+" y nombre extraído:"+nombrePJ);
    var hojaPJ = findSheetByPCName(nombrePJ,dl.ssId);
    var hayficha = hojaPJ!="";
    if (hayficha) {
      objetivo = hojaPJ;
      nombrePJ = valorXPosicion(hojaPJ,posiciones.nombre);
      Logger.log("hoja objetivo:"+nombrePJ);
      dl.parametros.shift();
    } else {
      sendText(dl.id,"No se encuentra personaje para el alias"+nombrePJ);
      return;
    }
  }
  var posicion = "";
  if (dl.parametros.length>0) {
    var herida = dl.parametros[0].toLowerCase();
    if (herida==posiciones.fue.nombre.toLowerCase() || herida == posiciones.fue.herida.toLowerCase()) {
      posicion = posiciones.fue;
    } else if (herida==posiciones.des.nombre.toLowerCase() || herida == posiciones.des.herida.toLowerCase()) {
      posicion = posiciones.des;
    } else if (herida==posiciones.con.nombre.toLowerCase() || herida == posiciones.con.herida.toLowerCase()) {
      posicion = posiciones.con;
    } else if (herida==posiciones.int.nombre.toLowerCase() || herida == posiciones.int.herida.toLowerCase()) {
      posicion = posiciones.int;
    } else if (herida==posiciones.sab.nombre.toLowerCase() || herida == posiciones.sab.herida.toLowerCase()) {
      posicion = posiciones.sab;
    } else if (herida==posiciones.car.nombre.toLowerCase() || herida == posiciones.car.herida.toLowerCase()) {
      posicion = posiciones.car;
    }  else {
      sendText(dl.id,"El nombre del atributo o condición a aplicar no se encuentra.");
      return;
    }
    dl.parametros.shift();
  } else {
    sendText(dl.id,"Es necesario un atributo o herida que aplicar");
    return;
  }
  if (dl.parametros.length>0) {
    texto_descriptivo = " ("+cursiva(mensajeParametros(dl.parametros))+")";
  }

  respuesta = bold(nombrePJ)+" está ahora "+bold(posicion.herida);
  if (dl.isActivo) {
     objetivo.getRange(posicion.fila, posicion.columna+1, 1, 1).setValue("TRUE")
  } else {
    respuesta += textoChatInactivo;
  }
  sendText(dl.id,sustituir(respuesta,"+",SUMA));
}

function executeDanyo(dl) {
  
  var expresion = "";
  var respuesta = "";
  var texto_descriptivo = " tira daño";
  if (dl.parametros.length>0 && dl.parametros[0].toLowerCase().match(rexp)!=null) {
      expresion = dl.parametros[0];
      if (dl.parametros.length>1) {
        dl.parametros.shift();
      }
  }
  var objetivo = "";
  if (dl.parametros.length>0 && dl.isGM) {
    var nombrePJ = dl.parametros[0];
    Logger.log("parametros tras quitar expresion:"+dl.parametros+" y nombre extraído:"+nombrePJ);
    var hojaPJ = findSheetByPCName(nombrePJ,dl.ssId);
    var hayficha = hojaPJ!="";
    if (hayficha) {
      objetivo = hojaPJ;
      Logger.log("hoja objetivo:"+valorXPosicion(hojaPJ,posiciones.nombre));
      dl.parametros.shift();
      texto_descriptivo = " sufre daño";
    }
  } 
  if (dl.parametros.length>0) {
    texto_descriptivo += " ("+cursiva(mensajeParametros(dl.parametros))+")";
  }

  respuesta = tiraDanyo(expresion, objetivo, texto_descriptivo, dl);
  
  sendText(dl.id,sustituir(respuesta,"+",SUMA));
}

function executeParcialTeclado(dl, texto_accion, posicion, teclado) {
  
  var modificador = 0;
  var texto_descriptivo = "";
  var respuesta = "";
  if (dl.parametros.length>0) {
    if (!isNaN(dl.parametros[0])) {
      modificador = dl.parametros[0];
      if (dl.parametros.length>1) {
        dl.parametros.shift();
      }
    }
  }
  if (dl.parametros.length>0) {
    texto_descriptivo = "("+cursiva(mensajeParametros(dl.parametros))+")";
  }
  
  if (modificador===0) {
    if (dl.hayHojaPJ) {
      modificador = valorXPosicion(dl.hojaPJ,posicion);
      Logger.log("VALOR DE POSICION: "+modificador);
    }
  }

  respuesta = tiraDW(modificador, texto_descriptivo, texto_accion, dl);
  var resultado = extraerResultado(respuesta);

  Logger.log("RESPUESTA: "+respuesta+" con resultado:"+resultado);

  
  if (resultado!=null && isExitoParcial(resultado)) {
    var textoEncoded = codeMarkdown(respuesta);
    sendTextKeyboard(dl.id,textoEncoded,teclado);
  } else {
    sendText(dl.id,respuesta);
  }
  
}

function executeRoll(dl) {
  
  var texto_accion = " tira los dados";
  var modificador = 0;
  var texto_descriptivo = "";
  var respuesta = "";
  var isExpresion = false;
  var expresion = "";
  if (dl.parametros.length>0) {
    if (dl.parametros[0].toLowerCase().match(rexp)!=null) {
      isExpresion = true;
      expresion = dl.parametros[0];
      texto_descriptivo = " tira dados";
      if (dl.parametros.length>1) {
        dl.parametros.shift();
      }
    } else if (!isNaN(dl.parametros[0])) {
      modificador = dl.parametros[0];
      if (dl.parametros.length>1) {
        dl.parametros.shift();
      }
    }
  }
  if (dl.parametros.length>0) {
    texto_descriptivo += "("+cursiva(mensajeParametros(dl.parametros))+")";
  }
  
  if (isExpresion) {
    respuesta = tiraDanyo(expresion, "", texto_descriptivo, dl);
    respuesta = sustituir(respuesta,"+",SUMA);

  } else {
    respuesta = tiraDW(modificador, texto_descriptivo, texto_accion, dl)
  }
  sendText(dl.id,respuesta);
}

/*
 * Este es el punto de entrada de las llamadas al Bot. Parseamos el objeto data y comenzamos a trabajar con él.
 */
function doPost(e) {
  // this is where telegram works

  var data = JSON.parse(e.postData.contents);
  try {
  doPostData(data);
  } catch(e) {
    Logger.log("ERROR:"+e);
  }
}

function doPostData(data) {
  var datosLlamada = new DatosLlamada(data);
  
  //Logger.log("Objeto DatosLlamada:"+JSON.stringify(datosLlamada));

  
  if (datosLlamada.isCallback) {
    procesaCallback(datosLlamada);

  } else {
    
    procesaMensaje(datosLlamada);
  }

}