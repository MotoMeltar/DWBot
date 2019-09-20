var keyboard =  { disparar: 

   {
     inline_keyboard: [
       [
         {text:'-1d6 de daño',callback_data:'disparar_menos'},
         {text:'-1 de munición',callback_data:'disparar_municion'}
       ],
       [
         {text:'Exponerse al peligro',callback_data:'disparar_exponerse'}
       ]
     ]
   },
   conjuro: 
   {
     inline_keyboard: [
       [
         {text:'Perder conjuro',callback_data:'conjuro_olvidar'},
         {text:'-1 a conjuros',callback_data:'conjuro_penalizador'}
       ],
       [
         {text:'Te pones en riesgo',callback_data:'conjuro_riesgo'}
       ]
     ]
   },
   level_up_caracteristica: 
   {
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
   },
   ayuda: 
   {
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
}  