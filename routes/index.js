var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  // console.log(req.body.request.intent.slots);

  var r = {};
  if (req.body.request.intent.slots.game.value === 'fortnite') {
    r = {
      version: "1.0",
      sessionAttributes: {
        key: "value"
      },
      response: {
        outputSpeech: {
          type: "PlainText",
          text: "About to run fortnite",
          ssml: "<speak>SSML text string to speak</speak>",
          playBehavior: "REPLACE_ENQUEUED"      
        }
      }
    };

    console.log("trying to run fortnite");
  }

  res.status(200).json(r);
});

module.exports = router;
