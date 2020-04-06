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
  var textoEncoded = codeMarkdown(_("Opciones de combate:"));
  
    sendTextKeyboard(dl.id,textoEncoded,teclado);

}
