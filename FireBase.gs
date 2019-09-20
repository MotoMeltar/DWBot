  //var baseUrl = "https://character-vault-4b48f.firebaseio.com";
  //var secret = "AIzaSyDSvgZ9EG8tXm9gAcnnLVxqN5QMSSi3wJE";
  var baseUrl = "https://vault-7b9b6.firebaseio.com";
  var secret = "AIzaSyDCcwa9XqehpcgZ9n7Xzda8cocnSHljv-c";
  var database = FirebaseApp.getDatabaseByUrl(baseUrl);

function cargaFirebase(ruta) {
  return database.getData(ruta);
}

function cargaMovimiento(movimiento) {
  var ruta = "moves/"+movimiento;
  return cargaFirebase(ruta);
}

function cargaTodosMovimiento() {
  var ruta = "moves/";
  return cargaFirebase(ruta);
}