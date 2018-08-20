//Nick Austin
//Define your authentication credentials.
//Import the 'assert' module   to validate results.
var assert = require('assert');
var myAccountID = 'user';
var myInsertKey = 'password';

var options = {
    //Define endpoint URL.
    url: "https://osso.url/opensso/identity/authenticate?username="+myAccountID+"&password="+myInsertKey+"",
};

//Define expected results using callback function.
function callback(error, response, body) {
    //Log status code to Synthetics console.
    //console.log(response.statusCode + " status code")
    //Verify endpoint returns 200 (OK) response code.
    assert.ok(response.statusCode == 200, 'Expected 200 OK response');
    var array=body.split("token.id=");
    var token=(array[1]);
    token=token.trim();
    //token.slice(0, token.length - 1);
    //console.log(token);

    //Log end of script.
    //console.log("End reached");
    processToken(token);
}
function processToken(token) {
    //console.log("In Function");
    //console.log(token);
var options = {
    //Define endpoint URL.
    url: 'https://url/v1/api/calculator',
    //Define query key and expected data type.
    headers: {
    'x-auth': token,
    'Cookie': "Cookie="+token
    }
};
$http.get(options,function(error, response, body) {
    if (!error && response.statusCode == 200) {
      assert.ok(body.indexOf("tuition") > -1, "Check Word not found.");
    } else {
      if (!error) {
        assert.fail(response.statusCode, 200, body);
      } else {
        assert.ifError(error);
      }
    }
  });
}

//Make POST request, passing in options and callback.
$http.post(options, callback);
