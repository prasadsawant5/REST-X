var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body.request);
  console.log(req.body.request.intent.slots);
  res.status(200).json({ "message": "ok" });
});

module.exports = router;
