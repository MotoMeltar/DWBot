function cargaAyuda(param) {
  var respuesta = "";
  switch(param) {
  case "PARTIDA":
    respuesta += bold(_("Crear y gestionar partidas (/ayuda partida)"))+RETORNO_CARRO;
    respuesta += _('Para crear una partida de Dungeon World, sigue estos pasos.')+RETORNO_CARRO;
    respuesta += Utilities.formatString(_("1-Accede a la plantilla de hojas de personaje [aquí(%s)]"),getSheetURL(ssIdPlantilla))+RETORNO_CARRO;
    respuesta += _("2-Selecciona 'File'-->'Make a Copy'")+RETORNO_CARRO;
    respuesta += _("3-En tu copia pulsa sobre el Botón 'Share'-->Advanced-->Cambia la visibilidad del archivo a 'Public on the web'")+RETORNO_CARRO;
    respuesta += _("4-Comparte el enlace con tus jugadores para que creen sus personajes.")+RETORNO_CARRO;
    respuesta +=  _("5-Una vez estén creados, crea un grupo de Telegram con todos los jugadores y master de la partida, y añade al DWMochilabot.")+RETORNO_CARRO;
    respuesta += _("6-Usa el comando '/partida (URL de la hoja de cálculo de fichas de personaje)'.")+RETORNO_CARRO+_("7-¡A jugar!")+RETORNO_CARRO+RETORNO_CARRO;
    respuesta += _("El bot encontrará el personaje de cada jugador recorriendo las fichas y tomando aquella cuyo alias de Telegram coincida.")+RETORNO_CARRO;
    respuesta += _("Una vez se lance con éxito un comando en el chat de grupo, el jugador podrá usar comandos por [privado](https://telegram.me/DWMochilaBot).")+RETORNO_CARRO+RETORNO_CARRO;
    respuesta += bold(_("Comandos de gestión de archivos"))+RETORNO_CARRO;
    respuesta += _("/partida (URL o ID de google spreadsheets)- Asigna al grupo de Telegram un archivo de fichas de personaje. Todos los comandos que se usen en ese grupo, lo harán contra ese arhivo")+RETORNO_CARRO;
    respuesta += _("/archivo (URL o ID de google spreadsheets)- Sin parámetro, te devuelve cual es tu archivo por defecto. Si pones una URL o ID de hojas de personaje, cambia tu archivo por defecto.");
    break;
  case "PERSONAJES":
    respuesta += bold(_("Comandos para Personajes (/ayuda personajes)"))+RETORNO_CARRO;
    respuesta += _("/ayuda  - Muestra la lista de comandos del bot.")+RETORNO_CARRO;
    respuesta += _("/status - Muestra la información del personaje. Características, puntos de golpe, experiencia, oro, etc.")+RETORNO_CARRO;
    respuesta += _("/tira (mod)(comentario)  - Hace una tirada de dados de DW. (mod) sería el modificador a la tirada (-2,+1, etc.) o una expresión de dados (1d10+2)")+RETORNO_CARRO;
    respuesta += _("/fue  (mod)(texto)  - Hace una tirada con el atributo de Fuerza. En caso de no tener modificador, buscará el valor en la hoja de personaje.")+RETORNO_CARRO;
    respuesta += _("/des  (mod)(texto)  - Hace una tirada con el atributo de Destreza. En caso de no tener modificador, buscará el valor en la hoja de personaje.")+RETORNO_CARRO;
    respuesta += _("/con  (mod)(texto)  - Hace una tirada con el atributo de Constitución. En caso de no tener modificador, buscará el valor en la hoja de personaje.")+RETORNO_CARRO;
    respuesta += _("/sab  (mod)(texto)  - Hace una tirada con el atributo de Sabiduría. En caso de no tener modificador, buscará el valor en la hoja de personaje.")+RETORNO_CARRO;
    respuesta += _("/int  (mod)(texto)  - Hace una tirada con el atributo de Inteligencia. En caso de no tener modificador, buscará el valor en la hoja de personaje.")+RETORNO_CARRO;
    respuesta += _("/car  (mod)(texto)  - Hace una tirada con el atributo de Carisma. En caso de no tener modificador, buscará el valor en la hoja de personaje.")+RETORNO_CARRO;
    respuesta += _("/daño (expresion)(texto) - el personaje hace una tirada de daño, siguiendo una expresión de tirada de dados. Si no hay expresión, usa su tirada de daño de la hoja de personaje.")+RETORNO_CARRO;
    respuesta += _("/mov (movimiento) - Se muestra una descripción del movimiento consultado.")+RETORNO_CARRO;
    respuesta += _("/equipo - Muestra la lista de equipo del personaje.")+RETORNO_CARRO;
    respuesta += _("/acampar  - el personaje acampa, curándose y reduciendo sus raciones.")+RETORNO_CARRO;
    respuesta += _("/disparar  - el personaje realiza el movimiento de disparar.")+RETORNO_CARRO;
    respuesta += _("Algunos personajes u objetos pueden tener sus propios comandos. Consulta tu hoja de personaje.")+RETORNO_CARRO;
    break;
  case "DJ":
    respuesta += bold(_("Comandos para Directores de juego (/ayuda dj)"))+RETORNO_CARRO;
    respuesta += _("/curar (pg curados)(alias) - Recupera PG del personaje del alias proporcionado.")+RETORNO_CARRO;
    respuesta += _("/herir (herida)(alias) - causa una herida de la característica indicada al personaje del alias proporcionado.")+RETORNO_CARRO;
    respuesta += _("/dar (cantidad)(atributo)(alias)- Suma o resta una cantidad al atributo indicado para el personaje a partir de su alias.")+RETORNO_CARRO;
    break;
  default:
    respuesta += bold(_("Bienvenido a la ayuda de DWMochilaBot (/ayuda)"))+RETORNO_CARRO;
    respuesta += _('Este bot permite organizar y jugar partidas del juego de rol Dungeon World a través de Telegram.')+RETORNO_CARRO;
    respuesta += _('Para ello, enlaza un archivo de Google Spreadsheets con el chat de juego y sus usuarios para usar los valores del personaje en la partida.')+RETORNO_CARRO;
    respuesta += _('Selecciona uno de los temas a consultar.')+RETORNO_CARRO;
  }
  return respuesta;
}

function executeAyuda(dl) {

  var selected = "";
  if (dl.parametros.length>0 && ayuda[dl.parametros[0].toUpperCase()]!=undefined) {
    selected = cargaAyuda(_(dl.parametros[0].toUpperCase()));
  }
  
  if (selected = "") {
    selected = cargaAyuda("PRINCIPAL");
  }
  
  var textoEncoded = codeMarkdown(selected.texto);
  var teclado = keyboard.ayuda;
  teclado.inline_keyboard.splice(selected.indice,1);
  sendTextKeyboard(dl.id,textoEncoded,teclado);
    
}