const express = require('express');
const rp = require('request-promise');
const http = require('http');
const WebSocketServer = require('websocket').server;

var router = express.Router();

const URL = 'https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.fa638b46d8e94df7acca54627c5d7ae9&scope=alexa%3Aall&scope_data=%7B%22alexa%3Aall%22%3A%20%7B%22productID%22%3A%20%22ProjectX%22%2C%20%22productInstanceAttributes%22%3A%20%7B%22deviceSerialNumber%22%3A%20%22135%22%7D%7D%7D&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FalexaResponse';
const CAPABILITIES = 'https://api.amazonalexa.com/v1/devices/@self/capabilities';
const ACCESS_TOKEN = 'https://api.amazon.com/auth/o2/token';

var accessToken;
var refreshToken;

// var server = http.createServer(function(request, response) {
//   console.log((new Date()) + ' Received request for ' + request.url);
//   response.writeHead(404);
//   response.end();
// });

// server.listen(8093, function() {
//   console.log((new Date()) + ' Server is listening on port 8093');
// });

// wsServer = new WebSocketServer({
//   httpServer: server,
//   // You should not use autoAcceptConnections for production
//   // applications, as it defeats all standard cross-origin protection
//   // facilities built into the protocol and the browser.  You should
//   // *always* verify the connection's origin and decide whether or not
//   // to accept it.
//   autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
//   // put logic here to detect whether the specified origin is allowed.
//   return true;
// }

// wsServer.on('request', function(request) {
//   if (!originIsAllowed(request.origin)) {
//       // Make sure we only accept requests from an allowed origin
//       request.reject();
//       console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//       return;
//   }

//   var connection = request.accept('echo-protocol', request.origin);
//   console.log((new Date()) + ' Connection accepted.');
//   console.log(request.httpRequest.headers);
//   connection.on('message', function(message) {
//       if (message.type === 'utf8') {
//           console.log('Received Message: ' + message.utf8Data);
//           connection.sendUTF(message.utf8Data);
//       }
//       else if (message.type === 'binary') {
//           console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//           connection.sendBytes(message.binaryData);
//       }
//   });
//   connection.on('close', function(reasonCode, description) {
//       console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//   });
// });

router.post('/', function(req, res, next) {
  var r = {};
  if (req.body.request.intent.slots.game.value === 'fortnite' || req.body.request.intent.slots.game.value === 'dota') {
    r = {
      version: "1.0",
      sessionAttributes: {
        key: "value"
      },
      response: {
        outputSpeech: {
          type: "PlainText",
          text: "About to run " + req.body.request.intent.slots.game.value,
          playBehavior: "REPLACE_ENQUEUED"      
        }
      }
    };

    // connection.sendUTF(JSON.stringify({ test: 'test' }));
  }

  res.status(200).json(r);
});


router.get('/alexa', function(req, res, next) {
  res.redirect(URL);
});


router.get('/alexaResponse', function(req, res, next) {
  var code = req.query.code;

  var opt = {
    method: 'POST',
    uri: ACCESS_TOKEN,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      'grant_type': 'authorization_code',
      'code': code,
      'client_id': 'amzn1.application-oa2-client.fa638b46d8e94df7acca54627c5d7ae9',
      'client_secret': 'fc07ea744342d77844c3efc798f8057bc91384a0ff827b65a73ca5c8883a45ba',
      'redirect_uri': 'http://localhost:3000/alexaResponse'
    },
    json: true
  }

  rp(opt)
  .then(function (authBody) {
    accessToken = authBody.access_token;
    refreshToekn = authBody.refresh_token;

    var capabilities = {
      "envelopeVersion": "20160207",
      "capabilities": [
          {
              "type": "AlexaInterface",
              "interface": "Alerts",
              "version": "1.1"
          },
          {
              "type": "AlexaInterface",  
              "interface": "AudioActivityTracker",
              "version": "1.0"
          },
          {
              "type": "AlexaInterface",
              "interface": "AudioPlayer",
              "version": "1.0"
          },
          {
              "type": "AlexaInterface",
              "interface": "Alexa.InputController",
              "version": "3.0"
          },
          {
              "type": "AlexaInterface",
              "interface": "InteractionModel",
              "version": "1.0"
          },
          {
              "type": "AlexaInterface",
              "interface": "Notifications",
              "version": "1.0"
          },
          {
              "type": "AlexaInterface",
              "interface": "PlaybackController",
              "version": "1.1"
          },
          {
              "type": "AlexaInterface",
              "interface": "Speaker",
              "version": "1.0"
          },
          {
              "type": "AlexaInterface",
              "interface": "SpeechRecognizer",
              "version": "2.0"
          },
          {
              "type": "AlexaInterface",
              "interface": "SpeechSynthesizer",
              "version": "1.0"
          }
      ]
    };

    var options = {
      method: 'PUT',
      uri: CAPABILITIES,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(capabilities)),
        'Authorization': 'Bearer ' + accessToken
      },
      body: capabilities,
      json: true
    };
    console.log('here');
    rp(options)
      .then(function (parsedBody) {
        console.log('here');
        console.log(parsedBody);
        console.log('returning 1...');
        res.sendStatus(200);
      })
      .catch(function (err) {
        console.error(err);
        console.log('returning 2...');
        res.sendStatus(200);
      });

  }).catch(function (err) {
    console.error(err);
    res.sendStatus(200);
  });
});


router.post('/token', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
