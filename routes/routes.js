const User = require('../models/user.js');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

module.exports = function (app) {
  app.post('/register', function(req, res, next) {
    if (req.body.email && req.body.password) {
      const userData = {
        email: req.body.email,
        password: req.body.password
      };

    // if email of a newly created user matches email of an existing user, throw an error
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
          const completeData = {
            user: user
          }
          res.json(completeData);
        }
      });
  });

  app.get('/profile/:symbol', async function(req, res) {
    const symbol = req.params.symbol;
    await User.find({"watchedTickers.name": symbol}).exec(async function(err, results) {
      if (err) {
        console.log(err);
      }
      //
      const api_url = `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=10&token=${process.env.REACT_APP_API_KEY}`;
      const fetch_response = await fetch(api_url);
      const json = await fetch_response.json();
      // if a ticker wasn't saved to a database previously save it
      if (results.length === 0) {
         await User.findByIdAndUpdate(req.session.userId,
         { $push: { watchedTickers: {name: symbol} } },
         { new: true, upsert: true }
        );
      }
      res.json(json);
    });
  });

  app.delete('/profile/:symbol', async function(req, res) {
    const symbol = req.params.symbol.toLowerCase();
    await User.findByIdAndUpdate(req.session.userId,
      { $pull: { "watchedTickers": {"name": symbol} } },
      { safe: true, multi: true }
    );
    const info = {
      status: "ok"
    }
    res.json(info);
  });

  app.get('/profile/:symbol/historic-prices/:date', async function(req, res) {
    const symbol = req.params.symbol;
    const date = req.params.date;
    //
    const api_url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/date/${date}?token=${process.env.REACT_APP_API_KEY}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    console.log(json);
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

}
