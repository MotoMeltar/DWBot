//var RETORNO_CARRO = "%0A";
var RETORNO_CARRO = "\n";
var RETORNO_CARRO_HTML = "\n";
var SUMA = "%2B";
var SUMA_HTML = "+";
var RESTA = "%2D";
var RESTA_HTML = "-";
var BOLD = "**";
var idGM = "MotoMeltar";
var nombreBot = "@dwmochilabot";

/**
 * Envía un mensaje al chat de telegram indicado. Usamos POST para que puedan mandarse cadenas más largas.
 * @param id Clave del chat al que mandar el mensaje
 * @param text Mensaje a mandar
 */
function sendText(id,text) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(id),
      text: codeMarkdown(text),
      parse_mode: "Markdown"
    }
  };
  //var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text+"&parse_mode=Markdown";
  //var response = UrlFetchApp.fetch(url);
  Logger.log(JSON.stringify(data));
  var response = UrlFetchApp.fetch('https://api.telegram.org/bot'+tokenString+'/',data);
  Logger.log(response.getContentText());
}

/**
 * formatea el texto a negrita
 * @param string Cadena a mostrar en negrita
 * @return La cadena como negrita en MarkDown
 */
function bold(string) {
  return "*"+string+"*";
}

/**
 * formatea el texto a cursiva
 * @param string Cadena a mostrar en cursiva
 * @return La cadena como cursiva en MarkDown
 */
function cursiva(string) {
  return "_"+string+"_";
}

/**
 * devuelve un enlace en el formato de Telegram
 * @param texto Texto a mostrar en el hipervinculo
 * @param link URL a la que apuntará el hipervinculo
 * @return La cadena del hipervínculo
 */
function link(texto,link) {
  return "["+texto+"]("+link+")";
}


/**
 * Obtiene los parámetros a partir de la linea de comando enviada
 */
function obtenerParametros(text) {
  if (text.indexOf(" ")>-1) {
    var resultados = text.split(" ");
    resultados.shift();
    //Logger.log(resultados);
    return resultados;
  }
  return [];
}

/**
 * Cambia los caracteres de MarkDown por HTML
 */
function codeMarkdown(texto) {
  //Logger.log("PREVIO:"+texto);
  var coded = sustituir(texto,RETORNO_CARRO,RETORNO_CARRO_HTML);
  //Logger.log("SIN RETORNOS:"+coded);
  coded = sustituir(coded,SUMA,SUMA_HTML);
  //Logger.log("SIN SUMAS:"+coded);
  coded = sustituir(coded,RESTA,RESTA_HTML);
  //Logger.log("SIN RESTAS:"+coded);
  return coded;
}

/**
 * Sustituye todas las apariciones de la cadena a sustituir por la cadena sustituidora
 */
function sustituir(texto,cadena_a_sustituir,cadena_sustituidora) {
 
  return texto.split(cadena_a_sustituir).join(cadena_sustituidora);
}

/**
 * Obtiene la primera palabra de una cadena separada por espacios
 */
function getPrimeraPalabra(text) {
  var respuesta = text;
  if (text.indexOf(" ")>-1) {
    respuesta = text.substr(0,text.indexOf(" "));
  }
  return respuesta;
}

/**
 * Comprobamos si el chat es privado o un grupo comparando el tipo de chat recibido
 */
function checkPrivate(type) {
  return (type==='private')
}

/**
 * Comprobamos si la cadena es el comando proporcionado, tanto por si misma como añadiendo la llamada al bot
 */
function esComando(texto, comando) {
  return (texto===comando || texto===(comando+nombreBot));
}

/**
 * De la cadena de una tirada de dados, extraemos el resultado numérico (Se usa * como referencia porque se devuelve en negrita Markdown)
 */
function extraerResultado(respuesta) {
  var fraccionado = respuesta.split("*");
  if (fraccionado.length>2) {
    return fraccionado[3];
  }
  else return null;
}

/**
 * Comprobamos si el resultado es un éxito parcial de Dungeon World (7-9)
 */
function isExitoParcial(resultado) {
  return (resultado <10 && resultado >6);
}

/**
 * Envía una respuesta con un teclado anexado a la misma
 * @param chatId Identificador del chat
 * @param text Texto que precede al teclado
 * @param keyBoard Objeto JSON del teclado
 */
function sendTextKeyboard(chatId,text,keyBoard){

   keyBoard = keyBoard || 0;

  if(keyBoard.inline_keyboard || keyBoard.keyboard){
    Logger.log("mandando teclado");
     var data = {
      method: "post",
      payload: {
         method: "sendMessage",
         chat_id: String(chatId),
         text: text,
         parse_mode: "Markdown",
         reply_markup: JSON.stringify(keyBoard)
       }
     }
    }else{
          Logger.log("mandando mensaje");

      var data = {
        method: "post",
        payload: {
          method: "sendMessage",
          chat_id: String(chatId),
          text: text,
          parse_mode: "HTML"
        }
      }
    }

   UrlFetchApp.fetch('https://api.telegram.org/bot' + tokenString + '/', data);

 }

/**
 * Crea una cadena con todos los parámetros de un array
 * @parametros array que debe conformar la cadena
 */
function mensajeParametros(parametros) {
  var respuesta = "";
  for(n = 0; n < parametros.length; n++) {
     respuesta = respuesta +" "+ parametros[n];
  }
  return respuesta.substr(1);
}

/*
 * Este es el punto de entrada de las llamadas al Bot. Parseamos el objeto data y comenzamos a trabajar con él.
 * Debe crearse en el bot un método doPostData con las acciones que debe hacer por cada bot específico
 */
function doPost(e) {
  // this is where telegram works

  var data = JSON.parse(e.postData.contents);
  Logger.log("---NUEVA LLAMADA---:"+JSON.stringify(data));
  if (data.message && data.message.text.charAt(0)!="/") {
    Logger.log("Ignoramos al no ser un comando:"+data.message.text);
    return;
  }
  
  try {
    var datosLlamada = new DatosLlamada(data);
    Logger.log("Objeto DatosLlamada:"+JSON.stringify(datosLlamada));
    
    doPostData(datosLlamada);
  } catch(e) {
    Logger.log("ERROR:"+e);
    sendText(datosLlamada.id,e);
  }
}