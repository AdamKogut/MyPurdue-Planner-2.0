var request = require('request');
var firebase = require('firebase');
request('http://api.purdue.io/odata/Courses?%24filter=Subject/Abbreviation%20eq%20%27CS%27&%24orderby=Number%20asc', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(JSON.parse(body)); // Show the HTML for the Google homepage.
  }
});
