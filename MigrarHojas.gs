var posiciones_new = { oro: { fila:4, columna: 5, nombre: "Oro", contable: "monedas de Oro"},
                   municion: { fila:3, columna: 9, nombre: "Munición", contable: "munición"},
                   raciones: { fila:3, columna: 11, nombre: "Raciones", contable: "raciones"},
                   armadura: { fila:15, columna: 2, nombre: "Armadura", contable: "puntos de Armadura"},
                   pg: { fila:15, columna: 3, nombre: "Puntos de Golpe", contable: "Puntos de Golpe"},
                   pgmax: { fila:15, columna: 4, nombre: "Puntos de golpe máximos", contable: "Puntos de golpe máximos"},
                   px: { fila:4, columna: 3, nombre: "PX", contable: "PX"},
                   nivel: { fila:4, columna: 4, nombre: "Nivel"},
                   clase: { fila:3, columna: 3, nombre: "Clase"},
                   nombre: { fila:2, columna: 3, nombre: "Nombre"},
                  danyo: { fila: 15, columna: 5, nombre: "Daño"},
                  alias: { fila:2, columna: 9, nombre: "Alias"},
                  fue: { fila:8, columna: 4, nombre: "Fuerza", herida: "debilitado", contable: "puntos de Fuerza"},
                  des: { fila:9, columna: 4, nombre: "Destreza", herida: "tembloroso", contable: "puntos de Destreza"},
                  con: { fila:10, columna: 4, nombre: "Constitución", herida: "enfermo", contable: "puntos de Constitución"},
                  int: { fila:11, columna: 4, nombre: "Inteligencia", herida: "aturdido", contable: "puntos de Inteligencia"},
                  sab: { fila:12, columna: 4, nombre: "Sabiduría", herida: "confundido", contable: "puntos de Sabiduría"},
                  car: { fila:13, columna: 4, nombre: "Carisma", herida: "marcado", contable: "puntos de Carisma"},
                  chat: { fila:39, columna: 2, nombre: "Chat Activo"},
                  alineamiento:{fila:3, columna: 6, nombre: "Alineamiento"},
                  magia:{fila:32, columna: 5, nombre: "Mod. Magia", contable: "Magia"},
                  penMagia:{fila:32, columna: 5, nombre: "Mod. Magia", contable: "Magia"}
                 };

var posiciones_old = { oro: { fila:4, columna: 5, nombre: "Oro", contable: "monedas de Oro"},
                   municion: { fila:3, columna: 9, nombre: "Munición", contable: "munición"},
                   raciones: { fila:3, columna: 11, nombre: "Raciones", contable: "raciones"},
                   armadura: { fila:15, columna: 2, nombre: "Armadura", contable: "puntos de Armadura"},
                   pg: { fila:15, columna: 3, nombre: "Puntos de Golpe", contable: "Puntos de Golpe"},
                   px: { fila:4, columna: 3, nombre: "PX", contable: "PX"},
                   nivel: { fila:4, columna: 4, nombre: "Nivel"},
                   clase: { fila:3, columna: 3, nombre: "Clase"},
                   nombre: { fila:2, columna: 3, nombre: "Nombre"},
                  danyo: { fila: 15, columna: 5, nombre: "Daño"},
                  alias: { fila:2, columna: 9, nombre: "Alias"},
                  fue: { fila:8, columna: 3, nombre: "Fuerza", herida: "debilitado", contable: "puntos de Fuerza"},
                  des: { fila:9, columna: 3, nombre: "Destreza", herida: "tembloroso", contable: "puntos de Destreza"},
                  con: { fila:10, columna: 3, nombre: "Constitución", herida: "enfermo", contable: "puntos de Constitución"},
                  int: { fila:11, columna: 3, nombre: "Inteligencia", herida: "aturdido", contable: "puntos de Inteligencia"},
                  sab: { fila:12, columna: 3, nombre: "Sabiduría", herida: "confundido", contable: "puntos de Sabiduría"},
                  car: { fila:13, columna: 3, nombre: "Carisma", herida: "marcado", contable: "puntos de Carisma"},
                  alineamiento:{fila:3, columna: 6, nombre: "Alineamiento"},
                  raza:{fila:5, columna: 6, nombre: "Raza"},
                 };


var hojasAMigrar = ["Barbaro","Clerigo","Druida","Explorador","Guerrero","Ladrón","Paladín"];
var ssIdPlantilla = "1x_2ueQwCL3IBiA3YY7ymssrRRW1wg92rL_OfdMPCe4k";


function Migrar() {
  
  var oldSpreadsheet = SpreadsheetApp.openById(getSsIdFromProperties("DEFAULT"));
  var oldAllsheets = oldSpreadsheet.getSheets();
  
  var newSpreadsheet = SpreadsheetApp.openById(ssIdPlantilla).copy("DW: Migradas");
  var newAllsheets = newSpreadsheet.getSheets();

  for (var hojaAMigrar in hojasAMigrar) {
    Logger.log("HOJA A MIGRAR:"+hojaAMigrar);
    var oldSheet = oldSpreadsheet.getSheetByName(hojasAMigrar[hojaAMigrar]);
    var valuesOld = oldSheet.getDataRange().getValues();
    
    var newSheet = newSpreadsheet.getSheetByName(hojasAMigrar[hojaAMigrar])
    if (oldSheet!="" && newSheet!="") {
      Logger.log("ENCONTRADA HOJA VIEJA Y NUEVA");
      for (var posicion_migrar in posiciones_old) {
        var valorOld = valuesOld[posiciones_old[posicion_migrar].fila-1][posiciones_old[posicion_migrar].columna-1];
        Logger.log("posicion:"+posicion_migrar+" - Valores:"+valorOld);

        grabarXPosicion(newSheet, posiciones_new[posicion_migrar], valorOld)
      }
    }
  }
  
}
