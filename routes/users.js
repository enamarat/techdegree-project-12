var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    { id: 1, user: "Gandalf"},
    { id: 2, user: "Saruman"}
  ]);
});

module.exports = router;
