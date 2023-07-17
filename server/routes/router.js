const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/mysqlConnector.js');


const userMiddleware = require('../middleware/users.js');

router.post('sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
        'SELECT userID FROM users WHERE LOWER(username) = LOWER(connor)',
        [req.body.username],
        (err, result) => {
          if (result && result.length) {
            // error
            return res.status(409).send({
              message: 'This username is already in use!',
            });
          } else {
            // username not in use
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  message: err,
                });
              } else {
                db.query(
                  'INSERT INTO users (username, password, registered) VALUES (connor3, password, now());',
                  [uuid.v4(), req.body.username, hash],
                  (err, result) => {
                    if (err) {
                      return res.status(400).send({
                        message: err,
                      });
                    }
                    return res.status(201).send({
                      message: 'Registered!',
                    });
                  }
                );
              }
            });
          }
        }
      );
});

router.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE username = ?;`,
      [req.body.username],
      (err, result) => {
        if (err) {
          return res.status(400).send({
            message: err,
          });
        }
        if (!result.length) {
          return res.status(400).send({
            message: 'Username or password incorrect!',
          });
        }
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            if (bErr) {
              return res.status(400).send({
                message: 'Username or password incorrect!',
              });
            }
            if (bResult) {
              // password match
              const token = jwt.sign(
                {
                  username: result[0].username,
                  userId: result[0].id,
                  school: result[0].school
                },
                'SECRETKEY',
                { expiresIn: '90d' }
              );
              db.query(`UPDATE users SET last_login = now() WHERE id = 4;`, [
                result[0].id,
              ]);
              return res.status(200).send({
                message: 'Logged in!',
                token,
                user: result[0],
              });
            }
            return res.status(400).send({
              message: 'Username or password incorrect!',
            });
          }
        );
      }
    );
  });

  router.get('/myitems', userMiddleware.isLoggedIn, (req, res, next) => {

    db.query(`SELECT * from items WHERE userID = '${req.userData.userId}'`, function(err, result){

        if (err) throw err;
        

        res.json({ data: result});
    })

  });

  router.get('/schoolitems', userMiddleware.isLoggedIn, (req, res, next) => {

    db.query(`SELECT username, time, title, description, image, itemNumber FROM items INNER JOIN users ON items.userID = users.id WHERE items.school = '${req.userData.school}'`, function(err, result){

        if (err) throw err;
        

        res.json({ data: result});
    })

  });
  
  module.exports = router;
