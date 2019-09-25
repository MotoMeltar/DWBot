/**
_("This will be translated.");
I18N.gettext("Also this...");
Utilities.formatString(I18N.ngettext("I have %s apple", "I have %s apples", n), s);
*/

I18N.loadLanguage('messages',"es",               
{
  //Textos en nombres de posiciones
  "Oro": { "msgstr" : "Oro"},
  "Munición": { "msgstr" : "Munición"},
  "Ración": { "msgstr" : "Ración", "msgstr_plural" : "Raciones"},
  "Armadura": { "msgstr" : "Armadura"},
  "Puntos de Golpe": { "msgstr" : "Puntos de Golpe"},
  "Puntos de golpe máximos": { "msgstr" : "Puntos de golpe máximos"},
  "PX": { "msgstr" : "PX"},
  "Nivel": { "msgstr" : "Nivel"},
  "Clase": { "msgstr" : "Clase"},
  "Nombre": { "msgstr" : "Nombre"},
  "Daño": { "msgstr" : "Daño"},
  "Alias": { "msgstr" : "Alias"},
  "Fuerza": { "msgstr" : "Fuerza"},
  "Destreza": { "msgstr" : "Destreza"},
  "Constitución": { "msgstr" : "Constitución"},
  "Inteligencia": { "msgstr" : "Inteligencia"},
  "Sabiduría": { "msgstr" : "Sabiduría"},
  "Carisma": { "msgstr" : "Carisma"},
  "Alineamiento" :  { "msgstr" : "Alineamiento"},
  "Mod. Magia": { "msgstr" : "Mod. Magia"},
  "Pen. Magia": { "msgstr" : "Pen. Magia"},
  "Raza": { "msgstr" : "Raza"},
  "En juego": { "msgstr" : "En juego"},
  "debilitado": { "msgstr" : "debilitado"},
  "tembloroso": { "msgstr" : "tembloroso"},
  "enfermo": { "msgstr" : "enfermo"},
  "aturdido": { "msgstr" : "aturdido"},
  "confundido": { "msgstr" : "confundido"},
  "marcado": { "msgstr" : "marcado"},
  //Texto chat inactivo
  "(Fuera de juego, no se graban datos)": { "msgstr" : "(Fuera de juego, no se graban datos)"},
  //Textos de executeMov
  "Los movimientos que puedes consultar son:": { "msgstr" : "Los movimientos que puedes consultar son:"},
  //Textos de executeVida
  "Resumen de puntos de vida:": { "msgstr" : "Resumen de puntos de vida:"},
  "- %s PG:%s/%s" : { "msgstr" : "- %s PG:%s/%s"},
  "No hay ninguna ficha asignada al chat ni al usuario." : { "msgstr" : "No hay ninguna ficha asignada al chat ni al usuario."},
  //Textos de executeStatus
  "No se encuentra hoja de personaje para Alias:" : { "msgstr" : "No se encuentra hoja de personaje para Alias:"},
  "%s (%s) tiene:" : { "msgstr" : "%s (%s) tiene:"},
  " - %s PX, " : { "msgstr" : " - %s PX, "},
  " - PG: " :  { "msgstr" : " - PG: "},
  "puedes usar este comando abriéndome un canal %s" :  { "msgstr" : "puedes usar este comando abriéndome un canal %s"},
  "privado" :  { "msgstr" : "privado" },
  //Textos de executeAcampar
  " acampa:" :  { "msgstr" : " acampa:" },
  " - Le queda %s ración.": { "msgstr" : " - Le queda %s ración.", "msgstr_plural" : " - Le quedan %s raciones."},
  " - Se cura %s PG para un total de %s." :  { "msgstr" : "  - Se cura %s PG para un total de %s.:" },
  " - Recupera su conexión con la magia.": { "msgstr" : " - Recupera su conexión con la magia."},
  "¡Puede subir a nivel %s!": { "msgstr" : "¡Puede subir a nivel %s!"},
  "No tiene raciones.": { "msgstr" : "No tiene raciones."},
  //Texto de executeCharRoll
  " hace una tirada de %s": { "msgstr" : " hace una tirada de %s"},
  //Texto de executeDar
  "El primer parámetro debe ser un número natural: ": { "msgstr" : "El primer parámetro debe ser un número natural: "},
  "No encuentro el campo que mencionas: ": { "msgstr" : "No encuentro el campo que mencionas: "},
  "El campo indicado no es contable: ": { "msgstr" : "El campo indicado no es contable: "},
  "Falta el alias del personaje a modificar": { "msgstr" : "Falta el alias del personaje a modificar"},
  " obtiene ": { "msgstr" : " obtiene "},
  " pierde ": { "msgstr" : " pierde "},
  "Ahora tiene ": { "msgstr" : "Ahora tiene "},
  "Se ha cumplido el alineamiento esta aventura": { "msgstr" : "Se ha cumplido el alineamiento esta aventura."},
  //Textos executeCurar
  "La cantidad de daño a curar debe ser un número:": { "msgstr" : "La cantidad de daño a curar debe ser un número:"},
  " recupera %s PG, para un total de %s/%s.": { "msgstr" : " recupera %s PG, para un total de %s/%s."},
  //Texto de executeHerir
  "El nombre del atributo o condición a aplicar no se encuentra.": { "msgstr" : "El nombre del atributo o condición a aplicar no se encuentra."},
  "Es necesario un atributo o herida que aplicar": { "msgstr" : "Es necesario un atributo o herida que aplicar."},
  " está ahora %s": { "msgstr" : " está ahora %s"},
  //Texto de executeDanyo
  " tira danyo": { "msgstr" : " tira daño"},
  " sufre daño": { "msgstr" : " sufre daño"},
  "¡%s obtiene un PX!": { "msgstr" : "¡%s obtiene un PX!"},
  "PX totales:": { "msgstr" : "PX totales:"},
  "  TOTAL: ": { "msgstr" : "  TOTAL: "},
  "A %s le quedan %s PG.": { "msgstr" : "A %s le quedan %s PG."},
  "¡%s ha CAIDO!": { "msgstr" : "¡%s ha CAIDO!"},
  //Texto de executeRoll
  " tira los dados": { "msgstr" : " tira los dados"},
  //Textos de Callbacks
  " gasta 1 punto de munición.": { "msgstr" : " gasta 1 punto de munición."},
  " - Le queda %s munición.": { "msgstr" : " - Le queda %s munición.", "msgstr_plural" : " - Le quedan %s municiones."},
  " hace un daño reducido.": { "msgstr" : " hace un daño reducido."},
  "¡%s queda expuesto al peligro!": { "msgstr" : "¡%s queda expuesto al peligro!"},
  "¡%s olvida su conjuro!": { "msgstr" : "¡%s olvida su conjuro!"},
  "¡%s pierde el contacto con la magia!": { "msgstr" : "¡%s pierde el contacto con la magia!"},
  " - El modificador por magia se reduce a %s": { "msgstr" : " - El modificador por magia se reduce a %s"},
  //Texto de executeArchivo
  "No tienes ninguna Hoja de Personaje vinculada a este usuario.": { "msgstr" : "No tienes ninguna Hoja de Personaje vinculada a este usuario."},
  "El archivo por defecto para tu usuario está [aquí](%s)": { "msgstr" : "El archivo por defecto para tu usuario está [aquí](%s)"},
  "No he podido obtener una hoja de cálculo accesible desde %s": { "msgstr" : "No he podido obtener una hoja de cálculo accesible desde %s"},
  "Solo pueden declararse chats de grupo como Partidas activas.": { "msgstr" : "Solo pueden declararse chats de grupo como Partidas activas."},
  "Para la partida %s se usará el archivo enlazado [aquí](%s)": { "msgstr" : "Para la partida %s se usará el archivo enlazado [aquí](%s)"},
  "No he podido obtener una hoja de cálculo accesible desde %s": { "msgstr" : "No he podido obtener una hoja de cálculo accesible desde %s"},
  "Es necesario indicar un ID o URL a un Google Spreadsheet correctamente formateado para comenzar una partida.": { "msgstr" : "Es necesario indicar un ID o URL a un Google Spreadsheet correctamente formateado para comenzar una partida."}
}
);