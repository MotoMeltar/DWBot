  var id = 2937540; //CHAT DIRECTO
  //var id = -1001153952365; //RESCATE EN...
  var name = "MotoMeltar";

var dataCallback = {
	"update_id": 649208923,
	"callback_query": {
		"data": "disparar_exponerse",
		"from": {
			"language_code": "ke",
			"last_name": "García",
			"id": 2937540,
			"is_bot": false,
			"first_name": "Angel",
			"username": "MotoMeltar"
		},
		"id": 12616640214434038,
		"message": {
			"date": 1542282713,
			"entities": "[Ljava.lang.Object;@53b92398",
			"chat": {
				"last_name": "García",
				"id": 2937540,
				"type": "private",
				"first_name": "Angel",
				"username": "MotoMeltar"
			},
			"message_id": 308,
			"from": {
				"id": 750768171,
				"is_bot": true,
				"first_name": "DWMochilaBot",
				"username": "DWMochilaBot"
			}
		}
	}
}

var dataMensaje = {
  "update_id": 862143054,
  "message": {
    "message_id": 1578,
    "from": {
      "id": 2937540,
      "is_bot": false,
      "first_name": "Angel",
      "last_name": "García",
      "username": "MotoMeltar",
      "language_code": "es" //"fr"
    },
    "chat": {
      "id": 2937540,
      "first_name": "Angel",
      "last_name": "García",
      "username": "MotoMeltar",
      "type": "private"
    },
    "date": 1566564132,
    "text": "/tira",
    "entities": [
      {
        "offset": 0,
        "length": 5,
        "type": "bot_command"
      }
    ]
  }
};

function testAyuda() {
  Logger.log(JSON.stringify(keyboard.ayuda));
  dataMensaje.message.text = "/ayuda";
  doPostData(dataMensaje);
    dataMensaje.message.text = "/help game";
  doPostData(dataMensaje);
    dataMensaje.message.text = "/help characters";
  doPostData(dataMensaje);
    dataMensaje.message.text = "/help gm";
  doPostData(dataMensaje);
}

function testCallback() {
  dataCallback.callback_query.data = "conjuro_penalizador";
  doPostData(dataCallback);
  
}

function testFijar() {
    dataMensaje.message.text = "/set 1d10+5 danyo @Willmor el vino que tiene asunción";
    doPostData(dataMensaje);
}

function testStatus() {  
  sendText(id,"Prueba de consulta con parámetro");
  dataMensaje.message.text = "/status@DWMochilaBot @paco";
  doPostData(dataMensaje);

  sendText(id,"Prueba de consulta sin parámetro");
  dataMensaje.message.text = "/status";
  doPostData(dataMensaje);
}

function testTiraDados() {
  var expresion = "3d6+10D10+2D20";
  var respuesta = tiraDados(expresion);
  Logger.log("FINAL:"+respuesta);
  
}

function testTirar() {
  dataMensaje.message.text = "/tira 2d8 curar";
  doPostData(dataMensaje);

  dataMensaje.message.text = "/tira -2";
  doPostData(dataMensaje);
}

function TestConDatosLLamada() {
  
  datosLlamada = {"sheet":{},"isActivo":false,"hojaPJ":"","values":null,"parametros":["https://docs.google.com/spreadsheets/d/1pBV5mcRb6v0bqnzpg2b6m4odaY1gqDXG9yLog6SsCdw/edit#gid=1545656547"],"chatTitle":"Crónicas de Murogris: La caza del Orgullo Inmortal","isCallback":false,"text":"/partida https://docs.google.com/spreadsheets/d/1pBV5mcRb6v0bqnzpg2b6m4odaY1gqDXG9yLog6SsCdw/edit#gid=1545656547","name":"MotoMeltar","id":-363628446,"userId":2937540,"chatType":"group","nombrePJ":"MotoMeltar","isPrivate":false,"ssId":"1pBV5mcRb6v0bqnzpg2b6m4odaY1gqDXG9yLog6SsCdw","hayHojaPJ":false,"isGM":true};
  procesaMensaje(datosLlamada);
}

            
