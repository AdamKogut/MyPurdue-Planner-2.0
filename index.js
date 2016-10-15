var request = require('request');
var firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: "Hello World-78086433a32a.json",
  databaseURL: "https://hello-world-e96ef.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref();
var courses = {};
var index = 0;
var length;

request('http://api.purdue.io/odata/Subjects', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var subjects = JSON.parse(body).value;
    length = subjects.length;
    for(var subject in subjects){
      addToObject(subjects[subject]);
    }
  } else if (error) {
    console.log(error);
  }
});


var addToObject = function(currSubject){
  request('http://api.purdue.io/odata/Courses?$filter=Subject/Abbreviation eq \'' + currSubject.Abbreviation + '\'', function (error, response, body) {
    index++;
    if (!error && response.statusCode == 200) {
      courses[currSubject.Abbreviation] = {
        "name" : currSubject.Name,
        "courses" : JSON.parse(body).value
      };
      if (index == length){
        ref.update({
          "Courses" : courses
        }, function(error){
          if (error){
            console.log(error);
          } else {
            console.log("finished");
            process.exit();
          }
        });
      }
    } else if (error) {
      console.log(error);
    }
  });
}
