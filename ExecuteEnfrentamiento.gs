var NO_DETECTADO = _("No Detectado");
var ESPECIAL = _("Especial");

posEnfrentamiento = {
  nombre: 0,
  tipo : 1,
  jugador: 2,
  maniobra: 3,
  remaniobra: 4,
  cola: 5,
  bonusCola: 6,
  artilleria: 7,
  pilotaje: 8,
  tactica: 9,
  tecnologia: 10,
  armas: 11,
  armadura: 12,
  escudos: 13,
  aspectos: 14,
  danyoSimple: 15,
  danyoComplejo: 16
}

function Enfrentamiento() {
  this.naves = [];
  this.navesJugador = [];
  this.mayorTech = 0;
}

function Nave(row) {
  this.nombre = row[posEnfrentamiento.nombre];
  this.tipo = row[posEnfrentamiento.tipo];
  this.jugador = row[posEnfrentamiento.jugador];
  this.esEnemigo = (this.jugador == "" || this.jugador == undefined);
  this.maniobra = row[posEnfrentamiento.maniobra];
  this.remaniobra = row[posEnfrentamiento.remaniobra];
  this.cola = row[posEnfrentamiento.cola];
  this.bonusCola = row[posEnfrentamiento.bonusCola];
  this.artilleria = row[posEnfrentamiento.artilleria];
  this.pilotaje = row[posEnfrentamiento.pilotaje];
  this.tactica = row[posEnfrentamiento.tactica];
  this.tecnologia = row[posEnfrentamiento.tecnologia];
  this.armas = row[posEnfrentamiento.armas];
  this.armadura = row[posEnfrentamiento.armadura];
  this.escudos = row[posEnfrentamiento.escudos];
  this.aspectos = row[posEnfrentamiento.aspectos];
  this.danyoSimple = row[posEnfrentamiento.danyoSimple];
  this.danyoComplejo = row[posEnfrentamiento.danyoComplejo];
  this.debeManiobrar = function () {
    if (this.remaniobra) {
      Logger.log("La nave "+this.nombre+" debe maniobrar por remaniobra");
      return true;
    }
    if (this.maniobra==NO_DETECTADO || this.maniobra==ESPECIAL || Number.isInteger(this.maniobra)) { 
      Logger.log("La nave "+this.nombre+" NO debe maniobrar:"+this.maniobra);
      return false;
    }
    return true;
  };
}

function cargarNavesExcel(dl) {
  var hoja = dl.sheet.getSheetByName(_("Enfrentamiento"));
  
  //var values = hoja.getDataRange().offset(1, 0, dl.sheet.getLastRow() - 1).getValues(); //Cogemos todos los valores menos la primera linea
  var values = hoja.getDataRange().getValues();
  values.shift();
  
  var i=0;
  var naves = [];
  var navesJugador = [];
  var enfrentamiento = new Enfrentamiento()
  for (var row in values) {
    var valoresFila = values[row];
    if (valoresFila!=undefined && valoresFila[0].trim()!="") {
      var nave = new Nave(valoresFila);
      Logger.log("NAVE:"+JSON.stringify(nave));
      if (nave.esEnemigo) {
        naves.push(nave);
        if (nave.tecnologia>enfrentamiento.mayorTech) {
          enfrentamiento.mayorTech = nave.tecnologia;
        }
      } else {
        navesJugador.push(nave);
        naves.push(nave);
      }
    }
  }
  
  enfrentamiento.naves = naves
  enfrentamiento.navesJugador = navesJugador;
  return enfrentamiento;
}

function executeEnfrentamiento(dl) {
  
  var respuesta = _("¡Comienza un enfrentamiento!")
  var enfrentamiento = cargarNavesExcel(dl);
  
    respuesta += "cargadas "+enfrentamiento.naves.length+" naves enemigas y "+enfrentamiento.navesJugador.length+" naves aliadas.";

  
  //Fase de detección
  respuesta += RETORNO_CARRO+RETORNO_CARRO+bold(_("DETECCIÓN"));
  var expresion = "4DF+"+enfrentamiento.mayorTech;
  var resultadoGM = lanzaDados(expresion);
  var resultados = [];
  resultadoGM.cadena = RETORNO_CARRO+"Detección enemiga:"+expresion.replace("4DF",transformaDadosFudge(resultadoGM))+" = "+bold(resultadoGM.total);
  resultados.push(resultadoGM);
  var mayorJG = 0;
  var menorJG = 100;
  //respuesta +=  RETORNO_CARRO+"Detección enemiga:"+expresion.replace("4DF",transformaDadosFudge(resultadoGM))+" = "+bold(resultadoGM.total);
  for (var i=0;i<enfrentamiento.navesJugador.length;i++) {
    Logger.log("Nave jugadora detecta:"+JSON.stringify(enfrentamiento.navesJugador[i]))
    expresion = "4DF+"+enfrentamiento.navesJugador[i].tecnologia;
    var resultadoJG = lanzaDados(expresion);
    Logger.log("Obtiene un total:"+resultadoJG.total);
    if (resultadoJG.total>mayorJG) {
      mayorJG = resultadoJG.total;
    }
    if (resultadoJG.total<menorJG) {
      menorJG = resultadoJG.total;
    }
    resultadoJG.cadena = RETORNO_CARRO+"Detección "+enfrentamiento.navesJugador[i].nombre+":"+expresion.replace("4DF",transformaDadosFudge(resultadoJG))+" = "+bold(resultadoJG.total);
    resultados.push(resultadoJG);
    //respuesta +=  RETORNO_CARRO+"Detección "+enfrentamiento.navesJugador[i].nombre+":"+expresion.replace("4DF",transformaDadosFudge(resultadoJG))+" = "+bold(resultadoJG.total);
  }
  
  resultados = resultados.sort(function(a, b) {
    return parseFloat(a.total) - parseFloat(b.total);
  });
  
  for (var j=0;j<resultados.length;j++) {
    respuesta +=  resultados[j].cadena;
  }
  
  if (resultadoGM.total>mayorJG+3) {
    respuesta += RETORNO_CARRO+bold(_("TODAS LAS NAVES ENEMIGAS SE ENCUENTRAN OCULTAS"));
  } else if (resultadoGM.total>mayorJG) {
    respuesta += RETORNO_CARRO+_("Una de las naves enemigas permanece Oculta.");
  } else if (resultadoGM.total<menorJG-3) {
    respuesta += RETORNO_CARRO+bold(_("TODAS LAS NAVES ALIADAS SE ENCUENTRAN OCULTAS"));
  } else if (resultadoGM.total<menorJG) {
    respuesta += RETORNO_CARRO+_("Una de las naves aliadas permanece Oculta.");
  } else {
    respuesta += RETORNO_CARRO+_("Todas las naves son visibles.");
  }
  
  
  sendText(dl.id,respuesta);
}

function executeTurno(dl) {
  
  var respuesta = bold(_("Nuevo Turno"));
  var enfrentamiento = cargarNavesExcel(dl);
  var expresion = null;
  var resultado = null;
  var hojaEnfrentamiento = SpreadsheetApp.openById(dl.ssId).getSheetByName("Enfrentamiento");
  
  //Calculamos la táctica de cada uno y ordenamos el array de naves por él.

  for (var i=0;i<enfrentamiento.naves.length;i++) {
    var nave = enfrentamiento.naves[i];
    Logger.log("Nave: "+JSON.stringify(nave))
    if (nave.debeManiobrar()) {
      expresion = "4DF+"+enfrentamiento.naves[i].tactica;
      resultado = lanzaDados(expresion);
      respuesta += RETORNO_CARRO+bold(nave.nombre)+" maniobra :"+expresion.replace("4DF",transformaDadosFudge(resultado))+" = "+bold(resultado.total)
      grabarNavePosicion(i+2,posEnfrentamiento.maniobra+1,hojaEnfrentamiento,resultado.total);
      grabarNavePosicion(i+2,posEnfrentamiento.remaniobra+1,hojaEnfrentamiento,false);
      enfrentamiento.naves[i].maniobra = resultado.total;
      enfrentamiento.naves[i].remaniobra = false;
    } else {
      if (Number.isInteger(nave.maniobra)) {
        enfrentamiento.naves[i].maniobra = enfrentamiento.naves[i].maniobra-1;
        respuesta += RETORNO_CARRO+nave.nombre+" reduce su Maniobra en 1, para un total de "+enfrentamiento.naves[i].maniobra;
      }
    }
    Logger.log("Nave: "+JSON.stringify(nave))
  }
  
  var ordenada = enfrentamiento.naves.sort(function (naveA, naveB) {
    Logger.log("Comparando "+naveA.nombre+"/"+naveA.maniobra+" con "+naveB.nombre+"/"+naveB.maniobra);
    var a = naveA.maniobra;
    var b = naveB.maniobra;
    if (a == b) {
      return 0;
    }
    if (isNaN(a))  {
      if (a==NO_DETECTADO) {
        return -1;
      } else {
        return 1;
      }
    }
    if (isNaN(b))  {
      if (b==ESPECIAL) {
        return -1;
      } else {
        return 1;
      }
    }
    if (a > b) {
        return -1;
    }
    if (b > a) {
        return 1;
    }
    return 0;
  });
  
      Logger.log("Array ordenado");
  
  respuesta += RETORNO_CARRO+bold(_("SITUACION DE MANIOBRA")+": ");

  
  var actual = "";
  for (var j=0;j<ordenada.length;j++) {
    var nave = ordenada[j];
    Logger.log("ORDENADO:"+nave.maniobra+"/"+nave.nombre);
    if (nave.maniobra == actual) {
      respuesta += ","+nave.nombre;
    } else {
      respuesta += RETORNO_CARRO+bold(_(nave.maniobra)+": ")+nave.nombre;
      actual = nave.maniobra;
    }
  }
  
  sendText(dl.id,respuesta);
}

function grabarNavePosicion(fila,columna,hoja,valor) {
  hoja.getRange(fila, columna, 1, 1).setValue(valor)
}

function TestExecuteEnfrentamiento() {
  dataMensaje.message.text = "/enfrentamiento";
  doPostData(new DatosLlamada(dataMensaje));
}

function TestExecuteTurno() {
  dataMensaje.message.text = "/turno";
  doPostData(new DatosLlamada(dataMensaje));
}

function testArraySort(){
  var m = new Map();
  m.set("3", "value")
  m.set("1", "valueb")
  

  Logger.log(JSON.stringify(sorted));
  
  m.forEach(function(value, key, map) {
    Logger.log(key, value);
  });
}