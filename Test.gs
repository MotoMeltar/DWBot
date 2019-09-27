  var id = 2937540; //CHAT DIRECTO
  //var id = -1001153952365; //RESCATE EN...
  var name = "MotoMeltar";

var dataCallback = {
	"update_id": 649208923,
	"callback_query": {
		"data": "disparar_exponerse",
		"from": {
			"language_code": "es",
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
      "language_code": "en" //"es"
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
function testAcampar() {
    dataMensaje.message.from.language_code = "en";// abastecerse";

  dataMensaje.message.text = "/acampar";
  doPostData(dataMensaje);
}

function testArchivo() {
  dataMensaje.message.text = "/archivo 1YLm9s-30ZzjwoHCNfdYfn4EfkuWOb0P9ah53Io8DZ5A";
  doPostData(dataMensaje);
}

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

function testCon() {
    dataMensaje.message.text = "/int Me cubro con mi escudo";
    doPostData(dataMensaje);
  
}

function testConjuro() {
  dataMensaje.message.text = "/conjuro";
  doPostData(dataMensaje);
}

function testCurar() {
  dataMensaje.message.text = "/curar 4 @MotoMeltar";
  doPostData(dataMensaje);
}

function testDanyo() {
  dataMensaje.message.text = "/daño 1d20+20 @MotoMeltar";
  doPostData(dataMensaje);
}

function testDar() {
  dataMensaje.message.text = "/dar 1 px @MotoMeltar al";
  doPostData(dataMensaje);
}

function testDisparar() {
  dataMensaje.message.text = "/disparar";
  doPostData(dataMensaje);
}

function testEquipo() {
  dataMensaje.message.text = "/equipo";
  doPostData(dataMensaje);
}

function testHerir() {
    dataMensaje.message.text = "/Herir @MotoMeltar FUERZA";
    doPostData(dataMensaje);

}

function testMov() {
    dataMensaje.message.from.language_code = "es";// abastecerse";
    dataMensaje.message.text = "/mov";// abastecerse";
    doPostData(dataMensaje);
}

function testLevelup() {
  dataMensaje.message.text = "/levelup";
  doPostData(dataMensaje);
}

function testStatus() {
  dataMensaje.message.from.language_code = "en";// abastecerse";
  
  sendText(id,"Prueba de consulta con parámetro");
  dataMensaje.message.text = "/status@DWMochilaBot @Dafoth";
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


function testTiraYDX() {
  var respuesta = tiraYDX(5,6);
  Logger.log(respuesta);
  
}

function testVida() {
  dataMensaje.message.from.language_code = "en";// abastecerse";
  dataMensaje.message.text = "/vida";
  doPostData(dataMensaje);
}
            
