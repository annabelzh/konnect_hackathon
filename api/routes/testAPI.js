
var fetch = require("node-fetch");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    let query = req.query.keyword;
    const username = 'KemKardeshian';
    getData(`https://api.twitter.com/2/tweets/search/recent?query=from:${username} ${query}&max_results=100&expansions=author_id,attachments.media_keys&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width&tweet.fields=author_id,created_at,conversation_id,entities&user.fields=username,name,profile_image_url`)
    .then(data => {
        console.log(data);// JSON data parsed by `data.json()` call
        res.send(data);
      });
});
  
  async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAGTEHAEAAAAAVcGhDXmAclLv6VKg0yJ%2Bi3ZbIfE%3DmpPRoZUCZpBvr645wXRTGdPLh7y1nUpOVYgBnisK5r2gLPcaTa'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  

module.exports = router;