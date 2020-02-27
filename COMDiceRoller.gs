var rexp = '\([0-9]+)[d]([0-9]+)';
             

/**
 * Devuelve el resultado de lanzar 1D6
 */
function tiraD6() {
   return Math.floor(Math.random() * 6) + 1;
}

/**
 * Devuelve el resultado numérico de lanzar un dado de fudge
 */
function tiraDF() {
   return Math.floor(Math.random() * 3) - 1;
}

/**
 * Devuelve el resultado de lanzar 1 dado de cualquier número de caras
 * @param caras Número de caras del dado
 */
function tiraDX(caras) {
   return Math.floor(Math.random() * caras) + 1;
}

/**
 * Devuelve el resultado de lanzar X dados de cualquier número de caras
 * @param tiradas Número de dados a tirar
 * @param caras Número de caras del dado
 */
function tiraYDX(tiradas,caras) {
  Logger.log("Tirando "+tiradas+"d"+caras);
  var respuesta = " ( ";
  for (i=0;i<tiradas;i++) {
    respuesta += tiraDX(caras);
    if (i<tiradas-1) {
      respuesta += " + ";
    }
  }
  respuesta += " ) ";
  Logger.log("respuesta tiraYDX: "+respuesta);
  return respuesta;
}

/**
 * Devuelve el resultado de una tirada enviada mediante una expresión de tirada de dados estandar
 * @param expresion
 */
function tiraDados(expresion){
  Logger.log("Tirada de dados en Expresión: "+expresion);

  var cadenaDados = ""
  var dados = null;
                                        
  while(expresion.toLowerCase().match(rexp)!=null) {
    dados = expresion.toLowerCase().match(rexp);
  
    Logger.log("dados: "+dados);
    cadenaDados = tiraYDX(dados[1],dados[2]);
    expresion = expresion.toLowerCase().replace(dados[0],cadenaDados);
    debugger;
    Logger.log("Tras el loop la expresion es "+expresion+" y hará otro loop: "+expresion.toLowerCase().match('\([1-9]\d*)?[d]([1-9]\d*)([x][1-9]\d*)?')!=null);
  }
  Logger.log("Respuesta tiraDados: "+expresion);
  Logger.log("Total: "+eval(expresion));
  return expresion;
    //expression.toLowerCase().replace(/(\d+)(d\d+)?/g, tiraXd& () {

}