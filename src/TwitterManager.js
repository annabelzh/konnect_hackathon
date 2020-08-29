import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

//var hmacSHA1= require('crypto-js/hmac-sha1');
//var Base64 = require('crypto-js/enc-base64');
//const fetch = require("node-fetch");

//only most recent tweets
function TwitterManager() {


function get7DayTweets(query, username = 'KemKardeshian') {
  getData(`https://api.twitter.com/2/tweets/search/recent?query=from:${username} ${query}&max_results=10&tweet.fields=author_id,created_at,conversation_id&user.fields=username`)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
}

async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAGTEHAEAAAAAVcGhDXmAclLv6VKg0yJ%2Bi3ZbIfE%3DmpPRoZUCZpBvr645wXRTGdPLh7y1nUpOVYgBnisK5r2gLPcaTa'
    },
  });
  return response.json(); 
}

function authenticate(url) {
  const parameters = {};
  
  //parameters["status"] = encodeURIComponent(tweet);
  //parameters["include_entities"] = encodeURIComponent("true");
  parameters["oauth_consumer_key"] = encodeURIComponent("713N08jQEvF8bV2pTxb1WmE8m");
  parameters["oauth_nonce"] = encodeURIComponent(randomString(42));
  parameters["oauth_signature_method"] = encodeURIComponent("HMAC-SHA1");
  parameters["oauth_timestamp"]	= encodeURIComponent(Math.floor(Math.round(Date.now() / 1000)));
  parameters["oauth_token"] = encodeURIComponent("1299534942917988352-RHaNKuYFAz0uilRbyge1gBmS9aPLcc");
  parameters["oauth_version"] = encodeURIComponent("1.0");

 
  let output = "";
  for (let parameter in Object.keys(parameters).sort()) {
    let key = Object.keys(parameters).sort()[parameter];
    output = output + key + "=" + parameters[key] + "&"
  }

  output = output.substring(0, output.length - 1);
  console.log("output is " + output);

  const signatureBaseString = "POST&" + encodeURIComponent(url) + "&" + encodeURIComponent(output);

  const signingKey = encodeURIComponent("gl9nU34B891amHFyM2Yf7qJ3GNDqWWRoMaRtK3n9dNlmVsMCod") + "&" + encodeURIComponent("66smIEWhTEVbqRZl5PNSxRtNChQdzPJ1BZdaDQ212P7so");

  var hash = hmacSHA1(signatureBaseString, signingKey);

  var hashInBase64 = Base64.stringify(hash);

  const oauth_signature	= hashInBase64;

  let DST = "OAuth ";
  
  DST = DST + encodeURIComponent("oauth_consumer_key") + '="' + parameters["oauth_consumer_key"] + '",';
  DST = DST + encodeURIComponent("oauth_nonce") + '="' + encodeURIComponent(randomString(42)) + '",';
  DST = DST + encodeURIComponent("oauth_signature") + '="' + encodeURIComponent(oauth_signature) + '",';
  DST = DST + encodeURIComponent("oauth_signature_method") + '="' + parameters["oauth_signature_method"] + '",';
  DST = DST + encodeURIComponent("oauth_timestamp") + '="' + encodeURIComponent(Math.floor((new Date()).getTime() / 1000)) + '",';
  DST = DST + encodeURIComponent("oauth_token") + '="' + parameters["oauth_token"] + '",';
  DST = DST + encodeURIComponent("oauth_version") + '="' + parameters["oauth_version"] + '"';

  return DST;
  
}


async function deleteTweets(id) {
 const url = `https://api.twitter.com/1.1/statuses/destroy/${id}.json`
 let DST = authenticate(url);

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

var randomString = function(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Example POST method implementation:
async function tweet(url = '', tweet = 'test') {
  url = url + "status=" + tweet;

  const isAlphaNumeric = ch => {
    return ch.match(/^[A-Za-z0-9]+$/i) !== null || ch == '-' || ch == '.' || ch == '_' || ch == '~';
  }

  var encode = (str) => {
    let dst = ""
    for (let i in str) {
      if (str.charAt(i) !== "!") {
        dst = dst + str.charAt(i);
      } else {
        dst = dst + str.charAt(i);
      }
    }
  }
  const parameters = {};
  
  //parameters["status"] = encodeURIComponent(tweet);
  //parameters["include_entities"] = encodeURIComponent("true");
  parameters["oauth_consumer_key"] = encodeURIComponent("713N08jQEvF8bV2pTxb1WmE8m");
  parameters["oauth_nonce"] = encodeURIComponent(randomString(42));
  parameters["oauth_signature_method"] = encodeURIComponent("HMAC-SHA1");
  parameters["oauth_timestamp"]	= encodeURIComponent(Math.round(Date.now() / 1000));
  parameters["oauth_token"] = encodeURIComponent("1299534942917988352-RHaNKuYFAz0uilRbyge1gBmS9aPLcc");
  parameters["oauth_version"] = encodeURIComponent("1.0");

 
  let output = "";
  for (let parameter in Object.keys(parameters).sort()) {
    let key = Object.keys(parameters).sort()[parameter];
    output = output + key + "=" + parameters[key] + "&"
  }

  output = output.substring(0, output.length - 1);
  console.log("output is " + output);

  const signatureBaseString = "POST&" + encodeURIComponent(url) + "&" + encodeURIComponent(output);

  const signingKey = encodeURIComponent("gl9nU34B891amHFyM2Yf7qJ3GNDqWWRoMaRtK3n9dNlmVsMCod") + "&" + encodeURIComponent("66smIEWhTEVbqRZl5PNSxRtNChQdzPJ1BZdaDQ212P7so");

  var hash = hmacSHA1(signatureBaseString, signingKey);

  var testhash = hmacSHA1("POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521", "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE")
  var hashInBase64 = Base64.stringify(hash);
  console.log("in base64 is " + hashInBase64);

  const oauth_signature	= hashInBase64;
  console.log(signatureBaseString);

  let DST = "OAuth ";
  DST = DST + encodeURIComponent("oauth_consumer_key") + '="' + parameters["oauth_consumer_key"] + '",';
  DST = DST + encodeURIComponent("oauth_nonce") + '="' + "7cPdnfHWmIS" + '",';
  DST = DST + encodeURIComponent("oauth_signature") + '="' + "ViAMox5zMBImr3SxT1IFKjKCLPk%3D" + '",';
  DST = DST + encodeURIComponent("oauth_signature_method") + '="' + parameters["oauth_signature_method"] + '",';
  DST = DST + encodeURIComponent("oauth_timestamp") + '="' + "1598699345" + '",';
  DST = DST + encodeURIComponent("oauth_token") + '="' + parameters["oauth_token"] + '",';
  DST = DST + encodeURIComponent("oauth_version") + '="' + parameters["oauth_version"] + '"';

  console.log("Time is "+ encodeURIComponent(Math.floor((new Date()).getTime() / 1000)));

  /*
    DST = DST + encodeURIComponent("oauth_consumer_key") + '="' + parameters["oauth_consumer_key"] + '",';
  DST = DST + encodeURIComponent("oauth_nonce") + '="' + encodeURIComponent(randomString(42)) + '",';
  DST = DST + encodeURIComponent("oauth_signature") + '="' + encodeURIComponent(oauth_signature) + '",';
  DST = DST + encodeURIComponent("oauth_signature_method") + '="' + parameters["oauth_signature_method"] + '",';
  DST = DST + encodeURIComponent("oauth_timestamp") + '="' + encodeURIComponent(Math.floor((new Date()).getTime() / 1000)) + '",';
  DST = DST + encodeURIComponent("oauth_token") + '="' + parameters["oauth_token"] + '",';
  DST = DST + encodeURIComponent("oauth_version") + '="' + parameters["oauth_version"] + '"';
  */


  console.log(DST);



  console.log("ENCODED " + encodeURIComponent("tnnArxj06cWHq44gCs1OSKk/jLY="))

  
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : getAuthorization("POST", url, )
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects

}

function getAuthorization(httpMethod, baseUrl, reqParams) {
  // Get acces keys
  const consumerKey       = "713N08jQEvF8bV2pTxb1WmE8m",
      consumerSecret      = "gl9nU34B891amHFyM2Yf7qJ3GNDqWWRoMaRtK3n9dNlmVsMCod",
      accessToken         = "1299534942917988352-RHaNKuYFAz0uilRbyge1gBmS9aPLcc",
      accessTokenSecret   = "66smIEWhTEVbqRZl5PNSxRtNChQdzPJ1BZdaDQ212P7so";
  // timestamp as unix epoch
  let timestamp  = Math.round(Date.now() / 1000);
  // nonce as base64 encoded unique random string
  let nonce      = Buffer.from(consumerKey + ':' + timestamp).toString('base64');
  // generate signature from base string & signing key
  let baseString = oAuthBaseString(httpMethod, baseUrl, reqParams, consumerKey, accessToken, timestamp, nonce);
  let signingKey = oAuthSigningKey(consumerSecret, accessTokenSecret);
  let signature  = oAuthSignature(baseString, signingKey);
  // return interpolated string
  return 'OAuth '                                         +
      'oauth_consumer_key="'  + consumerKey       + '", ' +
      'oauth_nonce="'         + nonce             + '", ' +
      'oauth_signature="'     + signature         + '", ' +
      'oauth_signature_method="HMAC-SHA1", '              +
      'oauth_timestamp="'     + timestamp         + '", ' +
      'oauth_token="'         + accessToken       + '", ' +
      'oauth_version="1.0"'                               ;
}

function oAuthBaseString(method, url, params, key, token, timestamp, nonce) {
  return method
          + '&' + percentEncode(url)
          + '&' + percentEncode(genSortedParamStr(params, key, token, timestamp, nonce));
};

function oAuthSigningKey(consumer_secret, token_secret) {
  return consumer_secret + '&' + token_secret;
};

function oAuthSignature(base_string, signing_key) {
  var signature = hmacSHA1(base_string, signing_key);
  return percentEncode(signature);
};

function percentEncode(str) {
  return encodeURIComponent(str).replace(/[!*()']/g, (character) => {
    return '%' + character.charCodeAt(0).toString(16);
  });
};

// Generate Sorted Parameter String for base string params
function genSortedParamStr(params, key, token, timestamp, nonce)  {
  // Merge oauth params & request params to single object
  let paramObj = mergeObjs(
      {
          oauth_consumer_key : key,
          oauth_nonce : nonce,
          oauth_signature_method : 'HMAC-SHA1',
          oauth_timestamp : timestamp,
          oauth_token : token,
          oauth_version : '1.0'
      },
      params
  );
  // Sort alphabetically
  let paramObjKeys = Object.keys(paramObj);
  let len = paramObjKeys.length;
  paramObjKeys.sort();
  // Interpolate to string with format as key1=val1&key2=val2&...
  let paramStr = paramObjKeys[0] + '=' + paramObj[paramObjKeys[0]];
  for (var i = 1; i < len; i++) {
      paramStr += '&' + paramObjKeys[i] + '=' + percentEncode(decodeURIComponent(paramObj[paramObjKeys[i]]));
  }
  return paramStr;
};

// Merge two objects
function mergeObjs(obj1, obj2) {
  for (var attr in obj2) {
      obj1[attr] = obj2[attr];
  }
  return obj1;
};


tweet('https://api.twitter.com/1.1/statuses/update.json?include_entities=true', "test2")
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });


get7DayTweets("pizza");
deleteTweets("1299601988401856513")
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });

}

export default TwitterManager