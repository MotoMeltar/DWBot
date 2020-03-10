var rexp = '([0-9]+)[d]([0-9]+|f)';
var rexpFudge = '\([0-9]+)df';

function Dado(caras) {
  this.tipo = caras;
  this.resultado = "";
  if (caras == "f") {
    this.resultado = tiraDF();
  } else {
    this.resultado = tiraDX(caras);
  }
}

/**
 * Objeto con el contenido de una tirada de dados, que incluye
 * - La expresión que la ha generado
 * - Los resultados individuales de cada dado, en objetos Dado.
 * - El resultado final
 */
function ResultadoTirada() {
  this.expresion = "";
  this.dados = [];
  this.total = null;
  this.cadena = "";
  
}
             

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
function tiraYDXArray(tiradas,caras) {
  Logger.log("Tirando "+tiradas+"d"+caras);
  var respuesta = [];
  for (i=0;i<tiradas;i++) {
      respuesta.push(new Dado(caras));
  }
  Logger.log("respuesta tiraYDX: "+JSON.stringify(respuesta));
  return respuesta;
}

function transformaArrayDadosenString(array) {
  var respuesta = " ( ";
  for (i=0;i<array.length;i++) {
    Logger.log("Dado:"+JSON.stringify(array[i]));
    respuesta += array[i].resultado;
    if (i<array.length-1) {
      respuesta += " + ";
    }
  }
  respuesta += " ) ";
  Logger.log("respuesta transformaArrayDadosenString: "+respuesta.toString());
  return respuesta;
}

/**
 * Devuelve el resultado de lanzar X dados de cualquier número de caras como un array de tiradas
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
    respuesta += " ) ";
  }
  Logger.log("respuesta tiraYDX: "+respuesta.toString());
  return respuesta;
}

/**
 * Devuelve el resultado de una tirada enviada mediante una expresión de tirada de dados estandar
 * @param expresion
 */
function tiraDados(expresion){
  Logger.log("Tirada de dados en Expresión: "+expresion);
  expresion = expresion.toLowerCase();

  var dados = null;
  var cadenaDados = "";
                                        
  while(expresion.match(rexp)!=null) {
    dados = expresion.match(rexp);
  
    Logger.log("dados: "+dados);
    cadenaDados = tiraYDX(dados[1],dados[2]);
    expresion = expresion.replace(dados[0],cadenaDados);
    debugger;
    Logger.log("Tras el loop la expresion es "+expresion+" y hará otro loop: "+expresion.match('\([1-9]\d*)?[d]([1-9]\d*)([x][1-9]\d*)?')!=null);
  }
  Logger.log("Respuesta tiraDados: "+JSON.stringify(expresion));
  return expresion;
}

/**
 * Devuelve un objeto ResultadoTirada con el resultado de una tirada de la expresión indicada
 * @param expresion
 */
function lanzaDados(expresion){
  Logger.log("Tirada de dados en Expresión: "+expresion);
  var resultado = new ResultadoTirada();
  resultado.expresion = expresion;
  expresion = expresion.toLowerCase();

  var cadenaDados = "";
  var arrayGrupo = [];
  var dados = null;
                                        
  while(expresion.match(rexp)!=null) {
    dados = expresion.match(rexp);
  
    Logger.log("dados: "+dados);
    arrayGrupo = tiraYDXArray(dados[1],dados[2]);
    resultado.dados = resultado.dados.concat(arrayGrupo);
    cadenaDados = transformaArrayDadosenString(arrayGrupo);
    expresion = expresion.replace(dados[0],cadenaDados);
    
    Logger.log("Tras el loop la expresion es "+expresion+" y hará otro loop: "+expresion.match(rexp)!=null);
  }
  resultado.cadena = expresion;
  resultado.total  = eval(expresion);
  Logger.log("Total: "+JSON.stringify(resultado));
  return resultado;

}