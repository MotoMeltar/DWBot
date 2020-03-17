posEnfrentamiento = {
  nombre: 1,
  tipo : 2,
  jugador: 3,
  maniobra: 4,
  remaniobra: 5,
  cola: 6,
  bonusCola: 7,
  artilleria: 8,
  pilotaje: 9,
  tactica: 10,
  tecnología: 11,
  armas: 12,
  armadura: 13,
  escudos: 14,
  aspectos: 15,
  danyoSimple: 16,
  danyoComplejo: 17
}

function Nave(row) {
  this.nombre = row[posEnfrentamiento.nombre];
  this.jugador = row[posEnfrentamiento.jugador];
  this.maniobra = row[posEnfrentamiento.maniobra];
  this.remaniobra = row[posEnfrentamiento.remaniobra];
  this.cola = row[posEnfrentamiento.cola];
  this.bonusCola = row[posEnfrentamiento.bonusCola];
  this.artilleria = row[posEnfrentamiento.artilleria];
  this.pilotaje = row[posEnfrentamiento.pilotaje];
  this.tactica = row[posEnfrentamiento.tactica];
  this.tecnología = row[posEnfrentamiento.tecnología];
  this.armas = row[posEnfrentamiento.armas];
  this.armadura = row[posEnfrentamiento.armadura];
  this.escudos = row[posEnfrentamiento.escudos];
  this.aspectos = row[posEnfrentamiento.aspectos];
  this.danyoSimple = row[posEnfrentamiento.danyoSimple];
  this.danyoComplejo = row[posEnfrentamiento.danyoComplejo];
}

function cargarNavesExcel(dl) {
  var hoja = dl.sheet.getSheetByName(_("Enfrentamiento"));
  
  var values = hoja.getDataRange().offset(1, 0, sheet.getLastRow() - headerRowNumber).getValues(); //Cogemos todos los valores menos la primera linea

  var i=0;
  var naves = [];
  for (var row in values) {
    var valoresFila = values[row];
    if (valoresFila!=undefined && valoresFila[0].trim()!="") {
      naves.push(new Nave(valoresFila));
    }
  }
  return naves;
}

function executeEnfrentamiento(dl) {
  
  var respuesta = _("¡Comienza un enfrentamiento!")
  var naves = cargarNavesExcel(dl);
  
  //Fase de detección
  respuesta += RETORNO_CARRO+RETORNO_CARRO+bold(_("DETECCIÓN"));
  
  respuesta += "cargadas "+naves.length+" naves";
  
  sendText(dl.id,respuesta);
}

function TestExecuteEnfrentamiento() {
  dataMensaje.message.text = "/enfrentamiento";
  doPostData(new DatosLlamada(dataMensaje));
}