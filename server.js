require('dotenv').config();
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
const routes = require('./routes/routes.js');
const port = process.env.PORT || 5000;

/***************** Database ******************/
mongoose.connect(process.env.DB || "mongodb://localhost:27017/in-the-spotlight");
const db = mongoose.connection;
db.on('error', (error) => {
  console.error("connection error:", error);
});
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
routes(app);

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

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
