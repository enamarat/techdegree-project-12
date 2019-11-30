require('dotenv').config();
//console.log(process.env.REACT_APP_API_KEY);
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const createError = require('http-errors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = process.env.PORT || 5000;

/***************** Database ******************/
const User = require('./models/user.js');

// mongodb connection
mongoose.connect(process.env.MONGOLAB_BLACK_URI || "mongodb://localhost:27017/in-the-spotlight");
const db = mongoose.connection;

// database connection error
db.on('error', (error) => {
  console.error("connection error:", error);
});

// message about successful connection to the database
db.once('open', () => {
  console.log("database connection is successful!");
});

//session
app.use(session({
  secret: 'I love you',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore ({
    mongooseConnection: db
  }),
  unset: 'destroy'
}));


/***********************/
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

/*********Routes******************/
app.use('/', express.static(`${__dirname}/client/build`));

app.post('/register', function(req, res, next) {
  if (req.body.email && req.body.password) {
    const userData = {
      email: req.body.email,
      password: req.body.password
    };

  // if email of a newly created users mathces email of a existing user, throw an error
  User.create(userData, (err, user) => {
    if(err) {
      const err = new Error('The entered email already exists!');
      err.status = 400;
      res.send(err);
    } else {
      req.session.userId = user._id;
      res.status(201);
      res.send(req.session);
      }
  });
  } else {
    const err = new Error('All fields required!');
    err.status = 400;
    res.send(err);
  }

});


app.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password,
    function(error, user) {
      if (error || !user) {
        console.log('Failure!');
        const err = new Error('Wrong email or password.');
        err.status = 401;
        res.send(err);
      } else {
        console.log('success!');
        req.session.userId = user._id;
        res.send(req.session);
      }
    });
  }
});




app.get('/profile', async function(req, res) {

  if (!req.session.userId) {
    const err = new Error("You are not authorized to view this page.");
    err.status = 403;
    res.send(err);
  }

  User.findById(req.session.userId)
    .exec(async function(error, user) {
      if(error) {
        res.send(error);
      } else {
        const api_url = `https://cloud.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=1m&last=10&token=${process.env.REACT_APP_API_KEY}`;
        const fetch_response = await fetch(api_url);
        const json = await fetch_response.json();
        const completeData = {
          user: user
        }
        res.json(completeData);
      }
    });
});

app.get('/profile/:symbol', async function(req, res) {
  const symbol = req.params.symbol;
  const api_url = `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10&token=${process.env.REACT_APP_API_KEY}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  res.json(json);
});

app.get('/profile/:symbol/historic-prices/:date', async function(req, res) {
  const symbol = req.params.symbol;
  const date = req.params.date;
  const api_url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/date/${date}?token=${process.env.REACT_APP_API_KEY}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  res.json(json);
});

app.get('/logout', function(req, res) {
  req.session.destroy(function(err){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.send();
    }
  });
});


//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

/**********/

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
/**********/

app.listen(port, () => console.log(`Listening on port ${port}`));
