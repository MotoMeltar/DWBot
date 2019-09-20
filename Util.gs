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
var textoChatInactivo = RETORNO_CARRO+cursiva("(Fuera de juego, no se graban datos)");

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
    Logger.log(resultados);
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
 * Indica si el chat es un chat activo de partida
 */
function esChatActivo(id, chat) {
  return (id===chat)
}

/** 
 * Comprueba si el id indicado es el id del GM
 */
function checkGM(id) {
  return (id===idGM)
}

/**
 * Comprobamos si el chat es privado o un grupo comparando el tipo de chat recibido
 */
function checkPrivate(type) {
  Logger.log("Comprobamos si es un chat privado con "+type+" dando de resultado "+(type==='private'));
  return (type==='private')
}

/**
 * Comprobamos si la cadena es el comando proporcionado, tanto por si misma como añadiendo la llamada al bot
 */
function esComando(texto, comando) {
  //Logger.log("comparando "+texto+" con "+comando);
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