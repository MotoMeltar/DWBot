# DWBot
A Telegram Bot useful to play Dungeon World

Este bot permite organizar y jugar partidas del juego de rol Dungeon World a través de Telegram.
Para ello, enlaza un archivo de Google Spreadsheets con el chat de juego y sus usuarios para usar los valores del personaje en la partida.

Puede usarse el comando de /ayuda con el bot para recibir descripciones de las posibles acciones del mismo.

# Crear y gestionar partidas

Para crear una partida de Dungeon World, sigue estos pasos.

1-Accede a la plantilla de hojas de personaje: https://docs.google.com/spreadsheets/d/1x_2ueQwCL3IBiA3YY7ymssrRRW1wg92rL_OfdMPCe4k/edit#gid=192734892

2-Selecciona "File"-->"Make a Copy"

3-En tu copia pulsa sobre el Botón "Share"-->Advanced-->Cambia la visibilidad del archivo a "Public on the web"

4-Comparte el enlace con tus jugadores para que creen sus personajes.

5-Una vez estén creados, crea un grupo de Telegram con todos los jugadores y master de la partida, y añade al DWMochilabot.

6-Usa el comando "/partida (URL de la hoja de cálculo de fichas de personaje)"

7-¡A jugar!

El bot encontrará el personaje de cada jugador recorriendo las fichas y tomando aquella cuyo alias de Telegram coincida.
Una vez se lance con éito un comando en el chat de grupo, el jugador podrá usar comandos por privado:https://telegram.me/DWMochilaBot.

# Comandos de gestión de archivos

/partida (URL o ID de google spreadsheets)- Asigna al grupo de Telegram un archivo de fichas de personaje. Todos los comandos que se usen en ese grupo, lo harán contra ese arhivo

/archivo (URL o ID de google spreadsheets)- Sin parámetro, te devuelve cual es tu archivo por defecto. Si pones una URL o ID de hojas de personaje, cambia tu archivo por defecto."},


# Comandos para Personajes
/ayuda  - Muestra la lista de comandos del bot.

/status - Muestra la información del personaje. Características, puntos de golpe, experiencia, oro, etc.

/tira (mod)(texto)  - Hace una tirada de dados de DW. (mod) sería el modificador a la tirada (-2,+1, etc.) o una expresión de dados (1d10+2)

/fue  (mod)(texto)  - Hace una tirada con el atributo de Fuerza. En caso de no tener modificador, buscará el valor en la hoja de personaje.

/des  (mod)(texto)  - Hace una tirada con el atributo de Destreza. En caso de no tener modificador, buscará el valor en la hoja de personaje.

/con  (mod)(texto)  - Hace una tirada con el atributo de Constitución. En caso de no tener modificador, buscará el valor en la hoja de personaje.

/sab  (mod)(texto)  - Hace una tirada con el atributo de Sabiduría. En caso de no tener modificador, buscará el valor en la hoja de personaje.

/int  (mod)(texto)  - Hace una tirada con el atributo de Inteligencia. En caso de no tener modificador, buscará el valor en la hoja de personaje.

/car  (mod)(texto)  - Hace una tirada con el atributo de Carisma. En caso de no tener modificador, buscará el valor en la hoja de personaje.

/daño (expresion)(texto) - el personaje hace una tirada de daño, siguiendo una expresión de tirada de dados. Si no hay expresión, usa su tirada de daño de la hoja de personaje.

/mov (movimiento) - Se muestra una descripción del movimiento consultado.

/acampar  - el personaje acampa, curándose y reduciendo sus raciones.

# Comandos para Directores de juego

/curar (pg curados)(alias) - Recupera PG del personaje del alias proporcionado.

/herir (herida)(alias) - causa una herida de la característica indicada al personaje del alias proporcionado.

/dar (cantidad)(atributo)(alias)- Suma o resta una cantidad al atributo indicado para el personaje a partir de su alias.
