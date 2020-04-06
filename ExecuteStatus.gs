function testStatus() {  
  /*sendText(id,"Prueba de consulta con parámetro");
  dataMensaje.message.text = "/status@DWMochilaBot @paco";
  doPostData(dataMensaje);*/

  //sendText(id,"Prueba de consulta sin parámetro");
  dataMensaje.message.text = "/status";
  doPostData(new DatosLlamada(dataMensaje));
}

function executeStatus(dl) {
  var hojaPJ = dl.hojaPJ;
  var nombrePJ = dl.name;
  if (dl.parametros.length>0) {
    nombrePJ = dl.parametros[0];
    hojaPJ = cargaHojaPersonaje(nombrePJ,dl);
  }
  
    
  Logger.log("Buscando hoja para "+nombrePJ+" y encontramos:"+hojaPJ);
  if (hojaPJ!="") {
    var values = hojaPJ.getDataRange().getValues();
  
  /*
  [nombre] "[apodo]", Destino: [Destino actual]/[Destino máximo], Estrés [Estrés actual]/5
**ASPECTOS**
Concepto: [concepto]
Descompresión: [descompresion positiva]/[descompresión negativa]
Relación con [objetivo relacion 1]: [relacion 1]
Relación con [objetivo relacion 2]: [relacion 2]
Adicional: [Adicional]
**PROEZAS**
[Listado de proezas]
**HABILIDADES**
+4: [habilidades +4]
+3: [habilidades +3]
+2: [habilidades +2]
+1: [habilidades +1]
**CONSECUENCIAS**
[Consecuencias]
*/
  
    var respuesta = Utilities.formatString(_('%s "%s", Destino: %s/%s, Estrés %s/5'),
                                           values[posiciones.nombre.fila-1][posiciones.nombre.columna-1],
        values[posiciones.apodo.fila-1][posiciones.apodo.columna-1],values[posiciones.destino.fila-1][posiciones.destino.columna-1],
                                           values[posiciones.destinomax.fila-1][posiciones.destinomax.columna-1],values[posiciones.estres.fila-1][posiciones.estres.columna-1])+RETORNO_CARRO;
    respuesta += bold(_("ASPECTOS"))+RETORNO_CARRO;
    respuesta += _("Concepto: ")+values[posiciones.concepto.fila-1][posiciones.concepto.columna-1]+RETORNO_CARRO;
    respuesta += Utilities.formatString(_("Descompresión: %s/%s"),values[posiciones.decomPosi.fila-1][posiciones.decomPosi.columna-1],
      values[posiciones.decomNega.fila-1][posiciones.decomNega.columna-1])+RETORNO_CARRO;
    respuesta += _("Relación: ")+values[posiciones.relacion1.fila-1][posiciones.relacion1.columna-1]+RETORNO_CARRO;
    respuesta += _("Relación: ")+values[posiciones.relacion2.fila-1][posiciones.relacion2.columna-1]+RETORNO_CARRO;
    respuesta += _("Adicional: ")+values[posiciones.adicional.fila-1][posiciones.adicional.columna-1]+RETORNO_CARRO;

    respuesta += bold(_("PROEZAS"));
    var proezasRange = hojaPJ.getRange(posiciones.proezas.fila, posiciones.proezas.columna, (posiciones.proezas.filafin-posiciones.proezas.fila), posiciones.proezas.columnaNotas).getValues();
    var i=0;
    for (var row in proezasRange) {
      var valoresFila = proezasRange[row];
      Logger.log(i+"VALOR 0:"+valoresFila[0]+valoresFila[2]);
      if (valoresFila!=undefined && valoresFila[0].trim()!="") {
        respuesta += RETORNO_CARRO+" - "+bold(valoresFila[0]);
        if (valoresFila[2]!="") {
          respuesta += " ("+cursiva(valoresFila[2])+")";
        }
      }
    }
    
    var listaSkills = "";
    var skillsStatus = {0:new Array(),1:new Array(),2:new Array(),3:new Array(),4:new Array(),5:new Array()};
    respuesta += RETORNO_CARRO+bold(_("HABILIDADES"));
    for (var pos in posiciones.skills) {
      Logger.log("---------- SKILLS ---------");
      var skill = posiciones.skills[pos];
      var valor = dl.getValues(skill);
      if (valor == undefined || valor =="") {
        valor = 0;
      }

      skillsStatus[valor].push(skill.nombre);
    }
    
    Logger.log("skillsStatus:"+JSON.stringify(skillsStatus));
    
    for (var j=5;j>0;j--) {
            Logger.log("VALOR DEL LOOP:"+j);
      Logger.log("skillsStatus[j]:"+skillsStatus[j+" con longitud:"+skillsStatus[j].length])
      if (skillsStatus[j].length>0) {
        Logger.log(bold(j)+": "+skillsStatus[j].join(","));
        listaSkills += RETORNO_CARRO+bold(j)+": "+skillsStatus[j].join(",");
      }
    }
    Logger.log(listaSkills);

    respuesta += listaSkills;

    
    var listaConsecuencias = "";
    var consecuenciasRange = hojaPJ.getRange(posiciones.consecuencias.fila, posiciones.consecuencias.columna, (posiciones.consecuencias.filafin-posiciones.consecuencias.fila), posiciones.consecuencias.columnaNotas).getValues();
    var i=0;
    for (var row in consecuenciasRange) {
      var valoresFilaCon = consecuenciasRange[row];
      if (valoresFilaCon!=undefined && valoresFilaCon[1].trim()!="") {
        listaConsecuencias += RETORNO_CARRO+" - "+bold(valoresFilaCon[0])+" ("+cursiva(valoresFilaCon[1])+")";
      }
    }
    
    if (listaConsecuencias!="") {
          respuesta += RETORNO_CARRO+bold(_("CONSECUENCIAS"))+listaConsecuencias;
    }
    
    if (!dl.isPrivate) {
      respuesta += RETORNO_CARRO+Utilities.formatString("puedes usar este comando abriéndome un canal %s", link(_("privado"),"https://telegram.me/DWMochilaBot"));
    }
  } else {
    var logError = _("No se encuentra hoja de personaje para Alias:")+nombrePJ;
    if (dl.ssId!=null) {
      logError += " en la hoja "+dl.sheet.getName();
    } else {
      logError += " ya que no encuentro ningún archivo relacionado con él.";
    }
    throw (logError);
  }
  Logger.log("RESPUESTA: "+respuesta);
  sendText(dl.id,respuesta);
}