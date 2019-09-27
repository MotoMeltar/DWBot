var keyboard =  { disparar: 

   { "es" : {
     inline_keyboard: [
       [
         {text:'-1d6 de daño',callback_data:'disparar_menos'},
         {text:'-1 de munición',callback_data:'disparar_municion'}
       ],
       [
         {text:'Exponerse al peligro',callback_data:'disparar_exponerse'}
       ]
     ]
    },"en" : {
     inline_keyboard: [
       [
         {text:'-1d6 damage',callback_data:'disparar_menos'},
         {text:'-1 ammunition',callback_data:'disparar_municion'}
       ],
       [
         {text:'Exposed to danger',callback_data:'conjuro_riesgo'}
       ]
     ]
   }
   },
   conjuro: 
   { "es" : {
     inline_keyboard: [
       [
         {text:'Perder conjuro',callback_data:'conjuro_olvidar'},
         {text:'-1 a conjuros',callback_data:'conjuro_penalizador'}
       ],
       [
         {text:'Te pones en riesgo',callback_data:'conjuro_riesgo'}
       ]
     ]
   },"en" : {
     inline_keyboard: [
       [
         {text:'Lose Spell',callback_data:'conjuro_olvidar'},
         {text:'-1 to casting',callback_data:'conjuro_penalizador'}
       ],
       [
         {text:'Exposed to danger',callback_data:'conjuro_riesgo'}
       ]
     ]
   }
   },
   level_up_caracteristica: 
   { "es" : {
     inline_keyboard: [
       [
         {text:'FUE',callback_data:'levelupChar fue'},
         {text:'DES',callback_data:'levelupChar des'},
         {text:'CON',callback_data:'levelupChar con'}
       ],
       [
         {text:'INT',callback_data:'levelupChar int'},
         {text:'SAB',callback_data:'levelupChar sab'},
         {text:'CAR',callback_data:'levelupChar car'}       ]
     ]
   },"en" : {
     inline_keyboard: [
       [
         {text:'STR',callback_data:'levelupChar fue'},
         {text:'DEX',callback_data:'levelupChar des'},
         {text:'CON',callback_data:'levelupChar con'}
       ],
       [
         {text:'INT',callback_data:'levelupChar int'},
         {text:'WIS',callback_data:'levelupChar sab'},
         {text:'CHA',callback_data:'levelupChar car'}       ]
     ]
   }
   },
   ayuda: { "es" : {
     inline_keyboard: [
       [
         {text:'Principal',callback_data:'executeAyuda principal'}
       ],[
         {text:'Crear y gestionar partidas',callback_data:'executeAyuda partida'}
       ],[
         {text:'Comandos de personajes',callback_data:'executeAyuda personajes'}
       ],[
         {text:'Comandos del Director de Juego',callback_data:'executeAyuda dj'}
       ]
     ]
     }
   , "en" : {
     inline_keyboard: [
       [
         {text:'Main',callback_data:'executeAyuda principal'}
       ],[
         {text:'Create and host games',callback_data:'executeAyuda partida'}
       ],[
         {text:"Character's commands",callback_data:'executeAyuda personajes'}
       ],[
         {text:'Game Master Commands',callback_data:'executeAyuda dj'}
       ]
     ]
   }
          }
}  