function executeSkillRoll(dl, posicion) {

  var modificador = 0;
  var texto_descriptivo = "";
  var respuesta = Utilities.formatString(_("%s hace una tirada de %s:"),bold(dl.nombrePJ),_(posicion.nombre));
  var maxMin = 0;
  
  //Primer parámetro: Modificador
  if (dl.parametros.length>0) {
    if (!isNaN(dl.parametros[0])) {
      modificador = dl.parametros[0];
      texto_descriptivo += "+"+modificador;
      dl.parametros.shift();
    }
  }
  
  //Segundo parámetro: MAX/MIN
  if (dl.parametros.length>0) {
    if (dl.parametros[0]=="M"|| dl.parametros[0].toLowerCase()=="max") {
      maxMin = max+1
    }
    if (dl.parametros[0]=="m"|| dl.parametros[0].toLowerCase()=="min") {
      maxMin = maxMin-1
    }
  }
  if (dl.parametros.length>0) {
    texto_descriptivo += " ("+cursiva(dl.parametros.join(" "))+")";
  }
  Logger.log(dl.hayHojaPJ)
  var expresion = "4DF";
  //if (modificador===0) {
    if (dl.hayHojaPJ) {
      var valorSkill = valorXPosicion(dl.hojaPJ,posicion);
      if (isNaN(valorSkill)) {
        valorSkill = 0;
      }
      expresion += "+"+parseInt(valorXPosicion(dl.hojaPJ,posicion));
      Logger.log("VALOR DE CARACTERISTICA: "+modificador);
    }
  if (modificador!=0) {
    expresion += "+"+parseInt(modificador);
  }
  
  var resultado = lanzaDados(expresion);
  respuesta +=  RETORNO_CARRO+expresion.replace("4DF",transformaDadosFudge(resultado))+" = "+bold(resultado.total);
  
  sendText(dl.id,respuesta);
}

function transformaDadosFudge(resultado) {
  var cadenaTirada = "";
  resultado.dados.forEach(function(dado) {
    Logger.log("Procesando dado:"+JSON.stringify(dado));
    switch (dado.resultado) {
      case 1:
        //Logger.log("Añado [+] a la tirada");
        cadenaTirada += "\\[+\]"
        break;
      case -1:
        //Logger.log("Añado [-] a la tirada");
        cadenaTirada += "\\[-\]"
       break;
      default:
        //Logger.log("Añado [ ] a la tirada");
        cadenaTirada += "\\[ \]"
    }
  });
  Logger.log("TransformaDadosFudge:"+cadenaTirada);
  return cadenaTirada;
}