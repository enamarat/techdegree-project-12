const express = require('express');
const bodyParser = require('body-parser');

// const path = require('path');
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const createError = require('http-errors');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

/***************** Database ******************/
const User = require('./models/user.js');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/in-the-spotlight");
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
  saveUninitialized: false
}));



/***********************/
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(morgan('dev'));
///app.use(express.json());
///app.use(express.urlencoded({ extended: false }));
///app.use(cookieParser());
///app.use(express.static(path.join(__dirname, 'public')));

///////app.use('/', indexRouter);
//app.use('/register', usersRouter);


/*********Routes******************/
app.post('/register', function(req, res, next) {
  if (req.body.email && req.body.password) {
    const userData = {
      email: req.body.email,
      password: req.body.password
    };


  // if email of a newly created users mathces email of a existing user, throw an error
  User.create(userData, (err, user) => {
    if(err) {
      err.message = 'The entered email already exists!';
      err.status = 400;
      return next(err);
    } else {
      res.status(201);
    //  res.redirect('/profile');
      res.send();
      }
  });
  } else {
    const err = new Error('All fields required!');
    err.status = 400;
    return next(err);
  }

});


app.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    console.log(req.body.email);
    console.log(req.body.password);
    User.authenticate(req.body.email, req.body.password,
    function(error, user) {
      if (error || !user) {
        console.log('Failure!');
        const err = new Error('Wrong email or password.');
        err.status = 401;
        res.send();
        return next (err);
      } else {
        req.session.userId = user._id;
        console.log('success!');
        res.send();
        //return res.redirect('/profile');
      }
    });

    // const userData = {
    //   email: req.body.email,
    //   password: req.body.password
    // };
  }
});

// app.post('/register', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post.email} and ${req.body.post.password}`,
//   );
// });

// app.get('/profile', function(req, res) {
//   res.send({ express: 'Welcome!' });
// });

app.get('/profile', (req, res, next) => {

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
  //res.render('error.pug');
});


app.listen(port, () => console.log(`Listening on port ${port}`));

//start your server on port 5000
// app.listen(5000, () => {
//   console.log('Server Listening on port 5000');
// });

//module.exports = app;
