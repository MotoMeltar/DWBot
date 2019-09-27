var moves = {
  disparar: { 
    "es": {
      nombre:"Disparar",
      condicion:"Cuando apuntas y disparas contra un enemigo a distancia, tira /DES.",
      total:cursiva("Con un 10+")+", consigues un buen disparo, tira daño.",
      parcial:cursiva("Entre 7 y 9")+", elige una (elijas la que elijas, también haces daño):"+RETORNO_CARRO+
      "- Tienes que moverte, y eso te pone en peligro. El DJ te lo describirá."+RETORNO_CARRO+
      "- Te tienes que conformar con lo que tienes: –1d6 daño."+RETORNO_CARRO+
      "- Tienes que disparar varias veces, reduce en 1 tu munición.",
      fracaso:"",
      texto:""  
    },
    "en": {
      nombre:"Volley",
      condicion:"When you take aim and shoot at an enemy at range, roll /DEX.",
      total:cursiva("On a 10+")+", you have a clear shot—deal your damage .",
      parcial:cursiva("On a 7–9")+", choose one (whichever you choose you deal your damage):"+RETORNO_CARRO+
      "- You have to move to get the shot placing you in danger as described by the GM."+RETORNO_CARRO+
      "- You have to take what you can get: -1d6 damage."+RETORNO_CARRO+
      "- You have to take several shots, reducing your ammo by one.",
      fracaso:"",
      texto:""  
    }
  },
  defensa: {
    "es": {
    nombre: "Defensa",
    condicion:"Cuando defiendes a otra persona, objeto o localización que sufra un ataque, tira /CON.",
    total:cursiva("Con un 10+")+", recibes 3 puntos.",
    parcial:cursiva("Entre 7 y 9")+", recibes 1 punto.",
    fracaso:"",
    texto:"Cuando tú o aquello a lo que defiendes sea atacado puedes gastar esos puntos a razón de 1 por cada una de las opciones siguientes:"+RETORNO_CARRO+
      "- Redirigir hacia ti un ataque contra aquello que defiendes."+RETORNO_CARRO+
      "- Reducir a la mitad el daño o el efecto del ataque."+RETORNO_CARRO+
      "- Abrir la defensa del atacante a un compañero, que recibe +1 a la siguiente tirada contra el atacante."+RETORNO_CARRO+
      "- Hacer un daño igual a tu nivel al atacante."
     },
    "en": {
      nombre:"Defend",
      condicion:"When you stand in defense of a person, item, or location under attack, roll+Con.",
      total:cursiva("On a 10+")+", hold 3.",
      parcial:cursiva("On a 7–9")+", hold 1.",
      fracaso:"",
      texto:"As long as you stand in defense, when you or the thing you defend is attacked you may spend hold, 1 for 1, to choose an option:"+RETORNO_CARRO+
        "Redirect an attack from the thing you defend to yourself"+RETORNO_CARRO+
        "Halve the attack’s effect or damage"+RETORNO_CARRO+
        "Open up the attacker to an ally giving that ally +1 forward against the attacker"+RETORNO_CARRO+
        "Deal damage to the attacker equal to your level"
    }
  },
  conocimientos: {
    "es": {
    nombre:"Exhibir conocimientos",
    condicion:"Cuando consultas tus vastos conocimientos sobre un tema, tira /INT.",
    total:cursiva("Con un 10+")+", el DJ te dirá algo interesante y útil sobre un tema concerniente a tu situación.",
    parcial:cursiva("Entre 7 y 9")+", el DJ te dirá algo interesante. Depende de ti convertirlo en útil.",
    fracaso:"",
    texto:RETORNO_CARRO+"El DJ puede preguntarte «¿Cómo lo sabes?». Dile la verdad."  
    },
    "en": {
      nombre:"Spout Lore",
      condicion:"When you consult your accumulated knowledge about something, roll /INT.",
      total:cursiva("On a 10+")+", the GM will tell you something interesting and useful about the subject relevant to your situation.",
      parcial:cursiva("On a 7–9")+"he GM will only tell you something interesting—it’s on you to make it useful.",
      fracaso:"",
      texto:RETORNO_CARRO+"The GM might ask you “How do you know this?” Tell them the truth, now."
    }
  },
  discernir: {
    "es": {
      nombre:"Discernir la realidad",
      condicion:"Cuando estudias detenidamente una situación o persona, tira /SAB.",
      total:cursiva("Con un 10+")+", haz 3 preguntas de la lista siguiente al DJ.",
      parcial:cursiva("Entre 7 y 9")+", ask 1.",
      fracaso:"",
      texto:RETORNO_CARRO+"En cualquier caso, recibes "+SUMA+"1 a la siguiente tirada cuando actúes de acuerdo con las respuestas."+RETORNO_CARRO+
      "- ¿Qué ha pasado recientemente aquí?"+RETORNO_CARRO+
      "- ¿Qué está a punto de pasar?"+RETORNO_CARRO+
      "- ¿Qué debería estar buscando?"+RETORNO_CARRO+
      "- ¿Qué hay aquí que sea útil o valioso para mí?"+RETORNO_CARRO+
      "- ¿Quién manda aquí realmente?"+RETORNO_CARRO+
      "- ¿Qué hay aquí que no es lo que parece?"
    },
    "en": {
      nombre:"Discern Realities",
      condicion:"When you closely study a situation or person, roll /WIS.",
      total:cursiva("On a 10+")+", ask the GM 3 questions from the list below.",
      parcial:cursiva("On a 7–9")+"ask 1.",
      fracaso:"",
      texto:RETORNO_CARRO+"Either way, take +1 forward when acting on the answers."+RETORNO_CARRO+
        "What happened here recently?"+RETORNO_CARRO+
        "What is about to happen?"+RETORNO_CARRO+
        "What should I be on the lookout for?"+RETORNO_CARRO+
        "What here is useful or valuable to me?"+RETORNO_CARRO+
        "Who’s really in control here?"+RETORNO_CARRO+
        "What here is not what it appears to be?"
    }
  },
  ayudar: {
    nombre:"Ayudar o Interferir",
    condicion:"Cuando ayudas o entorpeces a alguien, tira"+SUMA+"VINCULO con él.",
    total:cursiva("Con un 10+")+", reciben un +1 o –2 a su tirada, según elijas.",
    parcial:cursiva("Entre 7 y 9")+", siguen recibiendo el modificador, pero también te expones a daño, un castigo o un coste.",
    fracaso:"",
    texto:""  },
  levelup: {
    nombre:"Subir de nivel",
    condicion:"",
    total:"",
    parcial:"",
    fracaso:"",
    texto:"Cuando tengas tiempo para descansar (horas o días) y PX iguales (o mayores) a tu nivel actual"+SUMA+"7, puedes reflexionar sobre tus experiencias y perfeccionar tus habilidades."+RETORNO_CARRO+
          " - Resta 7"+SUMA+"tu nivel actual de tu total de PX."+RETORNO_CARRO+
          " - Incrementa en 1 tu nivel."+RETORNO_CARRO+
          " - Elige un nuevo movimiento avanzado de tu clase.."+RETORNO_CARRO+
          " - Si eres un mago también puedes añadir un nuevo conjuro a tu libro."+RETORNO_CARRO+
          " - Elige una de tus características e increméntala en 1 (eso puede cambiar el modificador). Cambiar la Constitución incrementará tus PG máximos y actuales. Las puntuaciones de las características no pueden ser mayores de 18."
  },
  viaje: {
    nombre:"Realizar un viaje peligroso",
    condicion:"Cuando viajáis a través de territorio hostil, elegid a un miembro del grupo para que actúe como guía, otro como vigía y otro como intendente. Cada personaje con una responsabilidad tira /SAB.",
    total:cursiva("Con un 10+")+RETORNO_CARRO+
    " - El guía reduce la cantidad de tiempo necesaria para alcanzar vuestro destino (el DJ dirá en cuánto)."+RETORNO_CARRO+
    " - El vigía detectará cualquier problema lo bastante rápido como para permitiros tener ventaja sobre el mismo."+RETORNO_CARRO+
    " - El intendente reduce el número de raciones necesarias en 1.",
    parcial:cursiva("Entre 7 y 9")+", cada uno desempeña su tarea adecuadamente: se consume el número normal de raciones, el viaje dura lo esperado y nadie os pilla por sorpresa, pero tampoco lo pilláis vosotros.",
    fracaso:"",
    texto:""  }

}