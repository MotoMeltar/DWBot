var tokenString = "750768171:AAHXEU2MPZbjxLa_-7AdcCjqA36sROQayIg"; // FILL IN YOUR OWN TOKEN
var webAppUrl = "https://script.google.com/macros/s/AKfycbwZwHKwHZOkDhT8jH_UgZ4CJxabNtmL8eDlmJkNrUJg9AEKkW5q/exec"; // FILL IN YOUR GOOGLE WEB APP ADDRESS

Logger = BetterLog.useSpreadsheet('1Ex5UIrWedt3_bFswREnJcip8CKmzi7JziMdu8ffUyT4'); 

var posiciones = { nombre: { fila:3, columna: 6, nombre: "Nombre"},
                  apodo: { fila:3, columna: 7, nombre: "Apodo"},
                  alias: { fila:3, columna: 8, nombre: "Telegram"},
                  destino: { fila:3, columna: 9, nombre: "Puntos de Destino"},
                  destinomax: { fila:3, columna: 10, nombre: "Puntos de Destino Máximos"},
                  concepto: { fila:6, columna: 3, nombre: "Concepto"},
                  enjuego: { fila:5, columna: 5, nombre: "En juego"},
                  decomPosi: { fila:7, columna: 4, nombre: "Decompresión Positiva"},
                  decomNega: { fila:8, columna: 4, nombre: "Decompresión Negativa"},
                  relacion1: { fila:9, columna: 3, nombre: "Relación"},
                  relacion2: { fila:10, columna: 3, nombre: "Relación"},
                  adicional: { fila:11, columna: 3, nombre: "Adicional"},
                  proezas: { fila:13, columna: 2, nombre: "Proezas",columnaNotas:3, filafin:18},
                  skills: {
                    artilleria: { fila:20, columna: 3, nombre: "Artillería"},
                    pilotar: { fila:21, columna: 3, nombre: "Pilotar"},
                    tactica: { fila:22, columna: 3, nombre: "Táctica"},
                    tecnologia: { fila:23, columna: 3, nombre: "Tecnología"},
                    atletismo: { fila:20, columna: 5, nombre: "Atletismo"},
                    disparar: { fila:21, columna: 5, nombre: "Disparar"},
                    pelear: { fila:22, columna: 5, nombre: "Pelear"},
                    notar: { fila:23, columna: 5, nombre: "Notar"},
                    sigilo: { fila:24, columna: 5, nombre: "Sigilo"},
                    compenetracion: { fila:20, columna: 7, nombre: "Compenetración"},
                    disciplina: { fila:21, columna: 7, nombre: "Disciplina"},
                    empatia: { fila:22, columna: 7, nombre: "Empatia"},
                    investigar: { fila:23, columna: 7, nombre: "Investigar"},
                    provocar: { fila:24, columna: 7, nombre: "Provocar"}
                  },
                  consecuencias: { fila:20, columna: 8, nombre: "Consecuencias",columnaNotas:9, filafin:24}

                 };	

function doGet(e) {
  var params = JSON.stringify(e);
  return HtmlService.createHtmlOutput(params);
}

function procesaMensaje(dl) {
  Logger.log(JSON.stringify(dl));
  var comando = getPrimeraPalabra(dl.text).toLowerCase();
  Logger.log("COMANDO: "+comando);
  if (esComando(comando,"/estado") || esComando(comando,"/status")) {
    Logger.log("Ejecutando comando de status");
    executeStatus(dl);
  } else if (esComando(comando,"/ayuda") || esComando(comando,"/help")) {
    Logger.log("Ejecutando comando Ayuda");
    executeAyuda(dl);
  } else if (esComando(comando,"/archivo") || esComando(comando,"/file")) {
    Logger.log("Ejecutando comando Archivo");
    executeArchivo(dl);
  } else if (dl.isGM) {
    Logger.log("Entramos en comandos de GM");
    if (esComando(comando,"/dar") || esComando(comando,"/give")) {
      Logger.log("Ejecutando comando Dar");
      executeDar(dl);
    } else if (esComando(comando,"/partida") || esComando(comando,"/game")) {
      Logger.log("Ejecutando comando Partida");
      executePartida(dl);
    } else if (esComando(comando,"/fijar") || esComando(comando,"/set")) {
      Logger.log("Ejecutando comando Fijar");
      executeFijar(dl);
    }
  }
}

function executeStatus(dl) {
  var hojaPJ = dl.hojaPJ;
  var nombrePJ = dl.name;
  if (dl.parametros.length>0) {
    nombrePJ = dl.parametros[0];
    hojaPJ = cargaHojaPersonaje(nombrePJ,dl);
  }
  
    
  Logger.log("Buscando hoja para "+nombrePJ+" y encontramos:"+hojaPJ);
  if (hojaPJ!="") {
    var values = hojaPJ.getDataRange().getValues();
  
  /*
  [nombre] "[apodo]", Destino: [Destino actual]/[Destino máximo]
**ASPECTOS**
Concepto: [concepto]
Descompresión: [descompresion positiva]/[descompresión negativa]
Relación con [objetivo relacion 1]: [relacion 1]
Relación con [objetivo relacion 2]: [relacion 2]
Adicional: [Adicional]
**PROEZAS**
[Listado de proezas]
**HABILIDADES**
+4: [habilidades +4]
+3: [habilidades +3]
+2: [habilidades +2]
+1: [habilidades +1]
**CONSECUENCIAS**
[Consecuencias]
*/
  
    var respuesta = Utilities.formatString(_('%s "%s", Destino: %s/%s'),
                                           values[posiciones.nombre.fila-1][posiciones.nombre.columna-1],
        values[posiciones.apodo.fila-1][posiciones.apodo.columna-1],values[posiciones.destino.fila-1][posiciones.destino.columna-1],
                                           values[posiciones.destinomax.fila-1][posiciones.destinomax.columna-1])+RETORNO_CARRO;
    respuesta += bold(_("ASPECTOS"))+RETORNO_CARRO;
    respuesta += _("Concepto: ")+values[posiciones.concepto.fila-1][posiciones.concepto.columna-1]+RETORNO_CARRO;
    respuesta += Utilities.formatString(_("Descompresión: %s/%s"),values[posiciones.decomPosi.fila-1][posiciones.decomPosi.columna-1],
      values[posiciones.decomNega.fila-1][posiciones.decomNega.columna-1])+RETORNO_CARRO;
    respuesta += Utilities.formatString(_("Relación con %s: %s"),values[posiciones.relacion1.fila-1][posiciones.relacion1.columna-2],
      values[posiciones.relacion1.fila-1][posiciones.relacion1.columna-1])+RETORNO_CARRO;
    respuesta += Utilities.formatString(_("Relación con %s: %s"),values[posiciones.relacion2.fila-1][posiciones.relacion2.columna-2],
      values[posiciones.relacion2.fila-1][posiciones.relacion2.columna-1])+RETORNO_CARRO;
    respuesta += _("Adicional: ")+values[posiciones.adicional.fila-1][posiciones.adicional.columna-1]+RETORNO_CARRO;

    var proezas = hojaPJ.getRange(posiciones.proezas.fila, posiciones.proezas.columna, (posiciones.proezas.filafin-posiciones.proezas.fila), posiciones.proezas.columnaNotas).getValues();
    for (var row in proezas) {
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
  } else {
    var logError = _("No se encuentra hoja de personaje para Alias:")+nombrePJ;
    if (dl.ssId!=null) {
      logError += " en la hoja "+dl.sheet.getName();
    } else {
      logError += " ya que no encuentro ningún archivo relacionado con él.";
    }
    throw (logError);
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

function executeCharRoll(dl, posicion) {

  var texto_accion = Utilities.formatString(_(" hace una tirada de %s"),_(posicion.nombre));
  var modificador = 0;
  var texto_descriptivo = "";
  var respuesta = "";
  var esHerc = false;
  if (dl.parametros.length>0) {
    if (!isNaN(dl.parametros[0])) {
      modificador = dl.parametros[0];
      texto_descriptivo += " ["+modificador+"]";
      dl.parametros.shift();
    }
  }
  if (dl.parametros.length>0) {
    if (dl.parametros[0] == 'herc') {
      esHerc = true;
      dl.parametros.shift();
    }
  }
  if (dl.parametros.length>0) {
    texto_descriptivo += " ("+cursiva(dl.parametros.join(" "))+")";
  }
  Logger.log(dl.hayHojaPJ)
  //if (modificador===0) {
    if (dl.hayHojaPJ) {
      modificador = parseInt(valorXPosicion(dl.hojaPJ,posicion))+parseInt(modificador);
      Logger.log("VALOR DE CARACTERISTICA + MODIFICADOR: "+modificador);
    }
  //}

  if (esHerc) {
    respuesta = tiraHerc(modificador, texto_descriptivo, texto_accion, dl);
  } else {
    respuesta = tiraDW(modificador, texto_descriptivo, texto_accion, dl);
  }
  sendText(dl.id,respuesta);
}

function doPostData(datosLlamada) {
 
    
    if (datosLlamada.isCallback) {
      procesaCallback(datosLlamada);
      
    } else {
      
      procesaMensaje(datosLlamada);
    }

}