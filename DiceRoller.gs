var rexp = '\([0-9]+)[d]([0-9]+)';
             

/**
 * Devuelve el resultado de lanzar 1D6
 */
function tiraD6() {
   return Math.floor(Math.random() * 6) + 1;
}

/**
 * Devuelve el resultado de lanzar 1 dado de cualquier número de caras
 * @param caras Número de caras del dado
 */
function tiraDX(caras) {
   return Math.floor(Math.random() * caras) + 1;
}

/**
 * Devuelve el resultado de lanzar X dados de cualquier número de caras
 * @param tiradas Número de dados a tirar
 * @param caras Número de caras del dado
 */
function tiraYDX(tiradas,caras) {
  Logger.log("Tirando "+tiradas+"d"+caras);
  var respuesta = " ( ";
  for (i=0;i<tiradas;i++) {
    respuesta += tiraDX(caras);
    if (i<tiradas-1) {
      respuesta += " + ";
    }
  }
  respuesta += " ) ";
  Logger.log("respuesta tiraYDX: "+respuesta);
  return respuesta;
}

/**
 * Realiza una tirada de habilidad de Dungeon World (2d6 + modificador)
 * @param name Nombre del personaje
 * @id identificador del chat
 * @modificador Modificador de característica a aplicar a la tirada
 */
function tiraDW(modificador, texto_descriptivo, texto_accion, dl) {
  
  var dado1 = tiraD6();
  var dado2 = tiraD6();
  if (isNaN(modificador)) {
    modificador = 0;
  }
  var texto_modificador = "";
  var respuesta = "";
  var resultado = dado1+dado2;
  if (modificador!=0) {
    texto_modificador = " "+SUMA+" ("+modificador+")";
    resultado = resultado + parseInt(modificador);
  }
  
  var nombrePJ = bold(dl.name);
  var hayficha = dl.hojaPJ!="";
  if (hayficha) {
    nombrePJ = bold(valorXPosicion(dl.hojaPJ, posiciones.nombre));
  } 
  var texto_experiencia = "";
  if (resultado<7) {
      var cadena = Utilities.formatString(_("¡%s obtiene un PX!"),nombrePJ);
      texto_experiencia = RETORNO_CARRO+bold(cadena);
      if (hayficha) {
        var px = valorXPosicion(dl.hojaPJ, posiciones.px);
        Logger.log("PX ANTIGUOS:"+px);
        if (dl.isActivo) 
          grabarXPosicion(dl.hojaPJ, posiciones.px,px+1);
        texto_experiencia = texto_experiencia+RETORNO_CARRO+_("PX totales:")+valorXPosicion(dl.hojaPJ, posiciones.px);
        if (!dl.isActivo)
          texto_experiencia += RETORNO_CARRO+cursiva(_("(Fuera de juego, no se graban datos)"));
      }
  }
  respuesta = nombrePJ + texto_accion+" "+texto_descriptivo+": "+RETORNO_CARRO+
      dado1+ " "+SUMA+" " + dado2 + texto_modificador+RETORNO_CARRO+
      " = " + bold(resultado)+texto_experiencia;
  Logger.log("RESPUESTA tiraDADOS: "+respuesta);
  return respuesta;
}

function tiraDados(expresion){
  Logger.log("Tirada de dados en Expresión: "+expresion);

  var cadenaDados = ""
  var dados = null;
                                        
  while(expresion.toLowerCase().match(rexp)!=null) {
    dados = expresion.toLowerCase().match(rexp);
  
    Logger.log("dados: "+dados);
    cadenaDados = tiraYDX(dados[1],dados[2]);
    expresion = expresion.toLowerCase().replace(dados[0],cadenaDados);
    debugger;
    Logger.log("Tras el loop la expresion es "+expresion+" y hará otro loop: "+expresion.toLowerCase().match('\([1-9]\d*)?[d]([1-9]\d*)([\x][1-9]\d*)?')!=null);
  }
  Logger.log("Respuesta tiraDados: "+expresion);
  Logger.log("Total: "+eval(expresion));
  return expresion;
    //expression.toLowerCase().replace(/(\d+)(d\d+)?/g, tiraXd& () {

}

function tiraDanyo(expresion, objetivo, texto_descriptivo, dl) {
  
  var nombrePJ = dl.name;
  var danyoPJ = "";
  var values = null;
  var hojaPJ = null;
  if (objetivo!="" && dl.isGM) {
    values = objetivo.getDataRange().getValues();
    nombrePJ = bold(values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]);
    Logger.log("Nombre del personaje objetivo:"+nombrePJ);

  } else {
    
    if (dl.hayHojaPJ) {
      nombrePJ = bold(dl.values[posiciones.nombre.fila-1][posiciones.nombre.columna-1]);
      danyoPJ = dl.values[posiciones.danyo.fila-1][posiciones.danyo.columna-1];
    } else {
      nombrePJ = bold(nombrePJ);
    }
  }

  var tirada = "";
  if (expresion == null || expresion == "" ) {
    if (dl.hayHojaPJ) {
      tirada = tiraDados(danyoPJ);
      expresion = danyoPJ;
    } else {
      return _("No se encuentra hoja de personaje para Alias:")+name;
    }
  } else {
    tirada = tiraDados(expresion);
  }
  var resultado = eval(tirada)
  var respuesta = "";
  
  if (objetivo!="") {
    var armadura = values[posiciones.armadura.fila-1][posiciones.armadura.columna-1];
    var diferencia = Number(resultado)-Number(armadura);
    if (diferencia<0) {
      diferencia = 0;
    }
    var pgActuales = Number(values[posiciones.pg.fila-1][posiciones.pg.columna-1])-diferencia;
    Logger.log("Armadura: "+armadura+"  pg:"+pgActuales);
    if (pgActuales<0) 
      pgActuales = 0;
    respuesta = nombrePJ +texto_descriptivo+": "+expresion+RETORNO_CARRO+
      tirada+RETORNO_CARRO+
        " = " + bold(resultado) + " "+RESTA +" "+_("Armadura")+":"+armadura+"  TOTAL: "+diferencia+RETORNO_CARRO+
          Utilities.formatString(_("A %s le quedan %s PG."),nombrePJ,pgActuales);
    Logger.log(respuesta);
    if (pgActuales == 0) 
      respuesta += RETORNO_CARRO+bold(Utilities.formatString(_("¡%s ha CAIDO!"),nombrePJ)); 
    if (dl.isActivo) {
      grabarXPosicion(objetivo, posiciones.pg,pgActuales);
    } else {
      respuesta += RETORNO_CARRO+cursiva(_("(Fuera de juego, no se graban datos)"));
    }
  } else {
    respuesta = nombrePJ +texto_descriptivo+": "+expresion+RETORNO_CARRO+
      tirada+RETORNO_CARRO+
        " = " + bold(resultado);
  }
  Logger.log("RESPUESTA tiraDADOS: "+respuesta);
  return respuesta;
}


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