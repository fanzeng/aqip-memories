'use strict';

const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);

const mysql = require('mysql')
const session = require('express-session');

const app = express();


async function connectToDB() {
  return new Promise((resolve, reject) => {
    const loginDBPath = path.join('..', 'data','scripts');
    let loginDBData;
    readFile(path.join(__dirname, loginDBPath, 'loginDB.json'), 'utf-8').then((data) => {
      loginDBData = JSON.parse(data.toString('utf-8'));
   
      let connection = mysql.createConnection(loginDBData);
      connection.connect(function(err) {
        if (err != null) {
          console.error('Error when connecting to mysql database: ' + err);
          reject(err);
        }
      })
      resolve(connection);
    });
  });
}

let connection;
const connectionPromise = connectToDB().then(
  result => {
    console.log('connected to database.');
    connection = result;
  }
  , 
  err => {console.log("connectToDB() failed with error: " + err);}
);

async function getSessionData() {
  return new Promise((resolve, reject) => {
    const sessionParamPath = path.join('..', 'data', 'scripts');
    let sessionParam;
    readFile(path.join(__dirname, sessionParamPath, 'sessionParam.json'), 'utf-8').then((data) => {
      sessionParam = JSON.parse(data.toString('utf-8'));
      console.log("sessionData = ", sessionParam);
      resolve(sessionParam);
    });
  });
};

const portNumber = parseInt(process.env.PORT, 10) || 4850;

app.listen(portNumber, () => {
  console.log('Listening on port ' + portNumber);
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '/login.html'));
});

let sessionParam;

getSessionData().then(
  result => {
    sessionParam = result;
    console.log("sessionData = ", sessionParam);

    app.use(session(sessionParam));
    app.use(express.urlencoded());
    app.use(express.json());

    app.post('/auth', function(req, res) {

      console.log("connection.state = " + connection.state);
      console.log("req =", [req])
      if (req.body != null) {
        console.log('req.body.username =', req.body.username);
        console.log('req.body.password =', req.body.password);
      } else {
        console.lop('req.body is undefined.');
      }

      let username = req.body.username;
      let password = req.body.password;
      const sqlString = "select * from `accounts` where `username` = '" + username + "' and `password` = '" + password + "'";
      console.log("sqlString = " + sqlString);
      if (username && password) {
        connection.query(sqlString, function(error, results, fields) {
          console.log("results = " + results);
          if (results != null && results.length > 0) {
            console.log('authentication successful.');
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
          } else {
            console.log('Failed login attempt:');
            console.log('username=' + username);
            console.log('password=' + password);
            res.send('Incorrect login.');
          }
          res.end();
        })
      } else {
        res.send('Please enter valid username and password.');
        res.end();
      }
    });
    app.use(checkAuth, webpackMiddleware(webpack(webpackConfig)));
    app.use('/data/', checkAuth, express.static(__dirname + '/../data/'));
    app.use('/resource/', checkAuth, express.static(__dirname + '/../resource/'));
  }
  ,
  err => {console.log(err);}
);



function checkAuth(req, res, next) {
  if(req.session != null && req.session.loggedin) {
    return next();
  }
  console.log('authentication failed for req = ' + [req]);
  res.redirect('login');
}


