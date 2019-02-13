const express = require('express');

var router = express.Router();

const URL = 'https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.fa638b46d8e94df7acca54627c5d7ae9&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%20%7B%22productID%22%3A%20%22ProjectX%22%2C%20%22productInstanceAttributes%22%3A%20%7B%22deviceSerialNumber%22%3A%20%22135%22%7D%7D%7D&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FalexaResponse';
const CAPABILITIES = 'https://api.amazonalexa.com/v1/devices/@self/capabilities';
const ACCESS_TOKEN = 'https://api.amazon.com/auth/o2/token';

var accessToken;
var refreshToken;

router.post('/', function(req, res, next) {
  console.log(req.body);

  res.sendStatus(200);
});

module.exports = router;
