var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  res.send({ express: 'Hello From Express' });
});

router.post('/register', function(req, res) {
  const newUser = {
    email: req.body.email,
    password: req.body.password
  };

  users.push(newUser);
  console.log(users);
});

module.exports = router;
