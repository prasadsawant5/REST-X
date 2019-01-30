var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  // console.log(req.body.request.intent.slots);

  var r = {};
  if (req.body.request.intent.slots.game.value === 'fortnite') {
    console.log("trying to run fortnite");
  }

  res.status(200).json({ "message": "ok" });
});

module.exports = router;
