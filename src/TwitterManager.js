var hmacSHA256 = require('crypto-js/hmac-sha256');
var Base64 = require('crypto-js/enc-base64');
const fetch = require("node-fetch");

//only most recent tweets

export function get7DayTweets(query, username = 'KemKardeshian') {
  getData(`https://api.twitter.com/2/tweets/search/recent?query=from:${username} ${query}&max_results=10&tweet.fields=author_id,created_at,conversation_id&user.fields=username`)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      return data.json();
    });

}

async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAGTEHAEAAAAAVcGhDXmAclLv6VKg0yJ%2Bi3ZbIfE%3DmpPRoZUCZpBvr645wXRTGdPLh7y1nUpOVYgBnisK5r2gLPcaTa'
    },
  });
  return response.json(); 
}

function deleteTweets(id) {
  
}

// Example POST method implementation:
async function tweet(url = '', tweet = 'test') {

  var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const isAlphaNumeric = ch => {
    return ch.match(/^[A-Za-z0-9]+$/i) !== null || ch == '-' || ch == '.' || ch == '_' || ch == '~';
  }

  var encode = (str) => {
    let dst = ""
    for (let i in str) {
      if (isAlphaNumeric(str.charAt(i))) {
        dst = dst + str.charAt(i);
      } else {

      }
    }
  }
  const parameters = {};
  parameters["status"] = encodeURIComponent(tweet);
  parameters["include_entities"] = encodeURIComponent("true");
  parameters["oauth_consumer_key"] = encodeURIComponent("713N08jQEvF8bV2pTxb1WmE8m");
  parameters["oauth_nonce"] = encodeURIComponent(randomString(42));
  parameters["oauth_signature_method"] = encodeURIComponent("HMAC-SHA1");
  parameters["oauth_timestamp"]	= encodeURIComponent(Math.floor((new Date()).getTime() / 1000));
  parameters["oauth_token"] = encodeURIComponent("1299534942917988352-RHaNKuYFAz0uilRbyge1gBmS9aPLcc");
  parameters["oauth_version"] = encodeURIComponent("1.0");

  let output = "";
  for (let parameter in Object.keys(parameters).sort()) {
    let key = Object.keys(parameters).sort()[parameter];
    output = output + key + "=" + parameters[key] + "&"
  }

  output = output.substring(0, output.length - 1);

  const signatureBaseString = "POST&" + encodeURIComponent(url) + "&" + encodeURIComponent(output);

  const signingKey = encodeURIComponent("gl9nU34B891amHFyM2Yf7qJ3GNDqWWRoMaRtK3n9dNlmVsMCod") + "&" + encodeURIComponent("66smIEWhTEVbqRZl5PNSxRtNChQdzPJ1BZdaDQ212P7so");

  var hash = hmacSHA256(signatureBaseString, signingKey);
  var hashInBase64 = Base64.stringify(hash);

  const oauth_signature	= hashInBase64;
  console.log(signatureBaseString);

  let DST = "OAuth ";
  DST = DST + encodeURIComponent("oauth_consumer_key") + '="' + parameters["oauth_consumer_key"] + '",';
  DST = DST + encodeURIComponent("oauth_nonce") + '="' + encodeURIComponent(encodeURIComponent(randomString(42))) + '",';
  DST = DST + encodeURIComponent("oauth_signature") + '="' + encodeURIComponent(oauth_signature) + '",';
  DST = DST + encodeURIComponent("oauth_signature_method") + '="' + parameters["oauth_signature_method"] + '",';
  DST = DST + encodeURIComponent("oauth_timestamp") + '="' + encodeURIComponent(encodeURIComponent(Math.floor((new Date()).getTime() / 1000))) + '",';
  DST = DST + encodeURIComponent("oauth_token") + '="' + parameters["oauth_token"] + '",';
  DST = DST + encodeURIComponent("oauth_version") + '="' + parameters["oauth_version"] + '"';


  console.log(encodeURIComponent("Ladies + Gentlemen"));
  console.log(encodeURIComponent("An encoded string!"));
  console.log(encodeURIComponent("Dogs, Cats & Mice"));
  console.log(encodeURIComponent("☃"));
  console.log(DST);

  
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : DST
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects

}



tweet('https://api.twitter.com/1.1/statuses/update.json', "Hello")
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });


get7DayTweets("pizza");