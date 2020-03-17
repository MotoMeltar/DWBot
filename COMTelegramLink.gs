var telegramUrl = "https://api.telegram.org/bot";

function getMe(tokenString) {
  var url = telegramUrl + tokenString + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function getUpdates(tokenString) {
  var url = telegramUrl + tokenString + "/getUpdates";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook(tokenString) {
  var url = telegramUrl + tokenString + "/setWebhook?url=" + webAppUrl;
  Logger.log(url);
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function getWebhook(tokenString) {
  var url = telegramUrl + tokenString + "/getWebhook";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}