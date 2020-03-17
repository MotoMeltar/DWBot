var tokenString = "1008566459:AAH3TsPpxRpMcWSN6t-8DJdckJvMORqV0kM"; // FILL IN YOUR OWN TOKEN
var webAppUrl = "https://script.google.com/macros/s/AKfycbwbaMuG2lz_IqoUHTMzRE-CvxKekPf7zRHVTzY2/exec"; // FILL IN YOUR GOOGLE WEB APP ADDRESS

Logger = BetterLog.useSpreadsheet('1Ex5UIrWedt3_bFswREnJcip8CKmzi7JziMdu8ffUyT4'); 

function webhook() {
  setWebhook(tokenString);
}


var posiciones = { nombre: { fila:3, columna: 6, nombre: "Nombre"},
                  apodo: { fila:3, columna: 7, nombre: "Apodo"},
                  alias: { fila:3, columna: 8, nombre: "Telegram"},
                  destino: { fila:3, columna: 9, nombre: "Puntos de Destino"},
                  destinomax: { fila:3, columna: 10, nombre: "Puntos de Destino Máximos"},
                  estres: { fila:21, columna: 9, nombre: "Estrés"},
                  concepto: { fila:6, columna: 3, nombre: "Concepto"},
                  enjuego: { fila:5, columna: 5, nombre: "En juego"},
                  decomPosi: { fila:7, columna: 4, nombre: "Decompresión Positiva"},
                  decomNega: { fila:8, columna: 4, nombre: "Decompresión Negativa"},
                  relacion1: { fila:9, columna: 3, nombre: "Relación"},
                  relacion2: { fila:10, columna: 3, nombre: "Relación"},
                  adicional: { fila:11, columna: 3, nombre: "Adicional"},
                  proezas: { fila:14, columna: 2, nombre: "Proezas",columnaNotas:4, filafin:18},
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
                  consecuencias: { fila:22, columna: 8, nombre: "Consecuencias",columnaNotas:9, filafin:25}

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
  } else if (esComando(comando,"/enfrentamiento") || esComando(comando,"/engagement")) {
    Logger.log("Ejecutando comando Enfrentamiento");
    executeEnfrentamiento(dl);
  } else if (esSkill(comando)) {
    Logger.log("Ejecutando Skill "+comando);    
    executeSkillRoll(dl,posiciones.skills[comando.substring(1).toLowerCase()]);
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

function esSkill(comando) {
  Logger.log("comprobamos si "+comando+" es Skill");
  if (comando.indexOf(nombreBot)>-1) {
    comando = comando.replace(nombreBot,'');
  }
  return (posiciones.skills[comando.substring(1).toLowerCase()]!= undefined);
}

function doPostData(datosLlamada) {
 
    
    if (datosLlamada.isCallback) {
      procesaCallback(datosLlamada);
      
    } else {
      
      procesaMensaje(datosLlamada);
    }

}