var ayuda = { 
  "PRINCIPAL"  : {indice:0,texto:bold("Bienvenido a la ayuda de DWMochilaBot (/ayuda)")+RETORNO_CARRO+
                  'Este bot permite organizar y jugar partidas del juego de rol Dungeon World a través de Telegram.'+RETORNO_CARRO+
                  'Para ello, enlaza un archivo de Google Spreadsheets con el chat de juego y sus usuarios para usar los valores del personaje en la partida.'+RETORNO_CARRO+
                  'Selecciona uno de los temas a consultar.'+RETORNO_CARRO},
  "PARTIDA"    : {indice:1,texto:bold("Crear y gestionar partidas (/ayuda partida)")+RETORNO_CARRO+
                  'Para crear una partida de Dungeon World, sigue estos pasos.'+RETORNO_CARRO+
                  '1-Accede a la plantilla de hojas de personaje '+link("aquí.",getSheetURL(ssIdPlantilla))+RETORNO_CARRO+
                  '2-Selecciona "File"-->"Make a Copy"'+RETORNO_CARRO+
                  '3-En tu copia pulsa sobre el Botón "Share"-->Advanced-->Cambia la visibilidad del archivo a "Public on the web"'+RETORNO_CARRO+
                  '4-Comparte el enlace con tus jugadores para que creen sus personajes.'+RETORNO_CARRO+
                  '5-Una vez estén creados, crea un grupo de Telegram con todos los jugadores y master de la partida, y añade al DWMochilabot.'+RETORNO_CARRO+
                  '6-Usa el comando "/partida (URL de la hoja de cálculo de fichas de personaje)".'+RETORNO_CARRO+'7-¡A jugar!'+RETORNO_CARRO+RETORNO_CARRO+
                  'El bot encontrará el personaje de cada jugador recorriendo las fichas y tomando aquella cuyo alias de Telegram coincida.'+RETORNO_CARRO+
                  'Una vez se lance con éito un comando en el chat de grupo, el jugador podrá usar comandos por [privado](https://telegram.me/DWMochilaBot).'+RETORNO_CARRO+RETORNO_CARRO+
                  bold("Comandos de gestión de archivos")+RETORNO_CARRO+
                  "/partida (URL o ID de google spreadsheets)- Asigna al grupo de Telegram un archivo de fichas de personaje. Todos los comandos que se usen en ese grupo, lo harán contra ese arhivo"+RETORNO_CARRO+
                  "/archivo (URL o ID de google spreadsheets)- Sin parámetro, te devuelve cual es tu archivo por defecto. Si pones una URL o ID de hojas de personaje, cambia tu archivo por defecto."},
  "PERSONAJES" : {indice:2,texto:bold("Comandos para Personajes (/ayuda personajes)")+RETORNO_CARRO+
                  '/ayuda  - Muestra la lista de comandos del bot.'+RETORNO_CARRO+
                  "/status - Muestra la información del personaje. Características, puntos de golpe, experiencia, oro, etc."+RETORNO_CARRO+
                  '/tira (mod)(texto)  - Hace una tirada de dados de DW. (mod) sería el modificador a la tirada (-2,+1, etc.) o una expresión de dados (1d10+2)'+RETORNO_CARRO+
                  "/fue  (mod)(texto)  - Hace una tirada con el atributo de Fuerza. En caso de no tener modificador, buscará el valor en la hoja de personaje."+RETORNO_CARRO+
                  "/des  (mod)(texto)  - Hace una tirada con el atributo de Destreza. En caso de no tener modificador, buscará el valor en la hoja de personaje."+RETORNO_CARRO+
                  "/con  (mod)(texto)  - Hace una tirada con el atributo de Constitución. En caso de no tener modificador, buscará el valor en la hoja de personaje."+RETORNO_CARRO+
                  "/sab  (mod)(texto)  - Hace una tirada con el atributo de Sabiduría. En caso de no tener modificador, buscará el valor en la hoja de personaje."+RETORNO_CARRO+
                  "/int  (mod)(texto)  - Hace una tirada con el atributo de Inteligencia. En caso de no tener modificador, buscará el valor en la hoja de personaje."+RETORNO_CARRO+
                  "/car  (mod)(texto)  - Hace una tirada con el atributo de Carisma. En caso de no tener modificador, buscará el valor en la hoja de personaje."+RETORNO_CARRO+
                  "/daño (expresion)(texto) - el personaje hace una tirada de daño, siguiendo una expresión de tirada de dados. Si no hay expresión, usa su tirada de daño de la hoja de personaje."+RETORNO_CARRO+
                  "/mov (movimiento) - Se muestra una descripción del movimiento consultado."+RETORNO_CARRO+
                  "/acampar  - el personaje acampa, curándose y reduciendo sus raciones."+RETORNO_CARRO},
  "DJ"         : {indice:3,texto:bold("Comandos para Directores de juego (/ayuda dj)")+RETORNO_CARRO+
                  "/curar (pg curados)(alias) - Recupera PG del personaje del alias proporcionado."+RETORNO_CARRO+
                  "/herir (herida)(alias) - causa una herida de la característica indicada al personaje del alias proporcionado."+RETORNO_CARRO+
                  "/dar (cantidad)(atributo)(alias)- Suma o resta una cantidad al atributo indicado para el personaje a partir de su alias."+RETORNO_CARRO}
}

function executeAyuda(dl) {

  var selected = ayuda["PRINCIPAL"];
  if (dl.parametros.length>0 && ayuda[dl.parametros[0].toUpperCase()]!=undefined) {
    selected = ayuda[dl.parametros[0].toUpperCase()];
  }
  
  var textoEncoded = codeMarkdown(selected.texto);
  var teclado = keyboard.ayuda;
  teclado.inline_keyboard.splice(selected.indice,1);
  sendTextKeyboard(dl.id,textoEncoded,teclado);
    
}