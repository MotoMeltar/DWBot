function executeSkillRoll(dl, posicion) {

  var modificador = 0;
  var texto_descriptivo = "";
  var respuesta = Utilities.formatString(_("%s hace una tirada de %s:"),bold(dl.nombrePJ),_(posicion.nombre));
  if (dl.parametros.length>0) {
    if (!isNaN(dl.parametros[0])) {
      modificador = dl.parametros[0];
      texto_descriptivo += "+"+modificador;
      dl.parametros.shift();
    }
  }
  if (dl.parametros.length>0) {
    texto_descriptivo += " ("+cursiva(dl.parametros.join(" "))+")";
  }
  Logger.log(dl.hayHojaPJ)
  var expresion = "4DF";
  //if (modificador===0) {
    if (dl.hayHojaPJ) {
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
        Logger.log("Añado [+] a la tirada");
        cadenaTirada += "\\[+\]"
        break;
      case -1:
        Logger.log("Añado [-] a la tirada");
        cadenaTirada += "\\[-\]"
       break;
      default:
                Logger.log("Añado [ ] a la tirada");
        cadenaTirada += "\\[ \]"
    }
  });
  Logger.log("TransformaDadosFudge:"+cadenaTirada);
  return cadenaTirada;
}