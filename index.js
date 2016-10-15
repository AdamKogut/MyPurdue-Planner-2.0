var request = require('request');
var firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: "Hello World-78086433a32a.json",
  databaseURL: "https://hello-world-e96ef.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref();

request('http://api.purdue.io/odata/Courses', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    ref.update({"Courses" : JSON.parse(body).value});
  }
});
