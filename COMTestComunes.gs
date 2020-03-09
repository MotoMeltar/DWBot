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

function testArchivo() {
  dataMensaje.message.text = "/archivo https://docs.google.com/spreadsheets/d/1pBV5mcRb6v0bqnzpg2b6m4odaY1gqDXG9yLog6SsCdw/edit?usp=sharing";
  doPostData(new DatosLlamada(dataMensaje));
}

function testDar() {
  dataMensaje.message.text = "/dar 1 px Willmor al";
  doPostData(new DatosLlamada(dataMensaje));
}

function testFijar() {
  dataMensaje.message.text = "/set 1d10+5 danyo @Willmor el vino que tiene asunción";
  doPostData(new DatosLlamada(dataMensaje));
}

function testPartida() {
  dataMensaje.message.text = "/partida https://docs.google.com/spreadsheets/d/1yjFgHL6HHZnLzDT6PgfOaDEf1K1EZrqJPPj_qCxkcg8/edit";
  doPostData(new DatosLlamada(dataMensaje));
}

function testTiraDados() {
  var expresion = "2d10+4DF+3";
  var respuesta = lanzaDados(expresion);
  Logger.log("FINAL:"+JSON.stringify(respuesta));
  
}

function testTirar() {
  dataMensaje.message.text = "/tira 2d8 curar";
  doPostData(new DatosLlamada(dataMensaje));

  dataMensaje.message.text = "/tira -2";
  doPostData(new DatosLlamada(dataMensaje));
}


function testTiraYDX() {
  var respuesta = tiraYDXArray(4,"F");
  Logger.log(JSON.stringify(respuesta));
  
}

function TestConDatosLLamada() {
  
  datosLlamada = {"sheet":{},"isActivo":false,"hojaPJ":"","values":null,"parametros":["https://docs.google.com/spreadsheets/d/1pBV5mcRb6v0bqnzpg2b6m4odaY1gqDXG9yLog6SsCdw/edit#gid=1545656547"],"chatTitle":"Crónicas de Murogris: La caza del Orgullo Inmortal","isCallback":false,"text":"/partida https://docs.google.com/spreadsheets/d/1pBV5mcRb6v0bqnzpg2b6m4odaY1gqDXG9yLog6SsCdw/edit#gid=1545656547","name":"MotoMeltar","id":-363628446,"userId":2937540,"chatType":"group","nombrePJ":"MotoMeltar","isPrivate":false,"ssId":"1pBV5mcRb6v0bqnzpg2b6m4odaY1gqDXG9yLog6SsCdw","hayHojaPJ":false,"isGM":true};
  doPostData(new DatosLlamada(dataMensaje));
}

            
