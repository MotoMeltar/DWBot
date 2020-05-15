function executeConsola(dl) {
  var teclado = {inline_keyboard: [
       [
         {text:'FUE',callback_data:'levelupChar fue'},
         {text:'DES',callback_data:'levelupChar des'},
         {text:'CON',callback_data:'levelupChar con'}
       ],
       [
         {text:'INT',callback_data:'levelupChar int'},
         {text:'SAB',callback_data:'levelupChar sab'},
         {text:'CAR',callback_data:'levelupChar car'}       ]
  ]};
  var enfrentamiento = cargarNavesExcel(dl);
  enfrentamiento.ordenaNaves();
  var textoEncoded = codeMarkdown(_("Opciones de Ataque:"));
  teclado.inlineKeyboard.push([{text:'Disparo (1)',callback_data:'disparo'}]);
  teclado.inlineKeyboard.push([{text:'Atacar objetivo grande (1+2)',callback_data:'disparoGrande'}]);
  teclado.inlineKeyboard.push([{text:'En su cola (1+2)',callback_data:'enSuCola'}]);

  
  sendTextKeyboard(dl.id,textoEncoded,teclado);

}
