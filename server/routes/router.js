const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const db = require("../lib/mysqlConnector.js");

const userMiddleware = require("../middleware/users.js");

router.post("/register", (req, res, next) => {
  db.query(
    "SELECT id FROM users WHERE LOWER(username) = LOWER(?)",
    [req.body.user.username],
    (err, result) => {
      if (result && result.length) {
        // error
        return res.status(409).send({
          message: "This username is already in use!",
        });
      } else {
        // username not in use
        bcrypt.hash(req.body.user.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              message: err,
            });
          } else {
            db.query(
              "INSERT INTO users (username, password, name, id, school, registered) VALUES (?, ?, ?, ?, ?, now());",
              [
                req.body.user.username,
                hash,
                req.body.user.name,
                uuid.v4(),
                req.body.user.school,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send({
                    message: err,
                  });
                }
                return res.status(201).send({
                  message: "Registered!",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
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
          message: "Username or password incorrect!",
        });
      }
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            return res.status(400).send({
              message: "Username or password incorrect!",
            });
          }
          if (bResult) {
            // password match
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
                school: result[0].school,
              },
              "SECRETKEY",
              { expiresIn: "90d" }
            );
            db.query(`UPDATE users SET last_login = now() WHERE id = 4;`, [
              result[0].id,
            ]);
            return res.status(200).send({
              message: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(400).send({
            message: "Username or password incorrect!",
          });
        }
      );
    }
  );
});

router.get("/useritems", userMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    `SELECT * from items WHERE userID = '${req.userData.userId}'`,
    function (err, result) {
      if (err) throw err;

      res.json({ data: result });
    }
  );
});

router.get("/schoolitems", userMiddleware.isLoggedIn, (req, res, next) => {
  const page = req.query.page;

  const isTrade = JSON.stringify(JSON.parse(req.query.type).trade);
  const isCash = JSON.stringify(JSON.parse(req.query.type).cash);

  if (isTrade == "true" && isCash == "true") {
    db.query(
      `SELECT username, time, title, description, image, name FROM items INNER JOIN users ON items.userID = users.id WHERE items.school = '${
        req.userData.school
      }' ORDER BY time DESC LIMIT ${page * 20}, 20`,
      function (err, result) {
        if (err) throw err;

        db.query(
          `SELECT COUNT(image) FROM items WHERE items.school = '${req.userData.school}'`,
          function (err, result2) {
            if (err) throw err;
            res.json({
              data: result,
              count: JSON.stringify(result2[0]["COUNT(image)"]),
            });
          }
        );
      }
    );
  }
  if (isTrade == "true" && isCash == "false") {
    db.query(
      `SELECT username, time, title, description, image, name FROM items INNER JOIN users ON items.userID = users.id WHERE items.school = '${
        req.userData.school
      }' AND trade = 'true' ORDER BY time DESC LIMIT ${page * 20}, 20`,
      function (err, result) {
        if (err) throw err;

        db.query(
          `SELECT COUNT(image) FROM items WHERE items.school = '${req.userData.school}'`,
          function (err, result2) {
            if (err) throw err;
            res.json({
              data: result,
              count: JSON.stringify(result2[0]["COUNT(image)"]),
            });
          }
        );
      }
    );
  }
  if (isTrade == "false" && isCash == "true") {
    db.query(
      `SELECT username, time, title, description, image, name FROM items INNER JOIN users ON items.userID = users.id WHERE items.school = '${
        req.userData.school
      }' AND cash = 'true' ORDER BY time DESC LIMIT ${page * 20}, 20`,
      function (err, result) {
        if (err) throw err;

        db.query(
          `SELECT COUNT(image) FROM items WHERE items.school = '${req.userData.school}'`,
          function (err, result2) {
            if (err) throw err;
            res.json({
              data: result,
              count: JSON.stringify(result2[0]["COUNT(image)"]),
            });
          }
        );
      }
    );
  }
});

router.post("/upload", userMiddleware.isLoggedIn, (req, res, next) => {
  db.query(
    "INSERT INTO items (userID, time, title, description, image, school, trade, cash) VALUES (?, now(), ?, ?, ?, ?, ?, ?)",
    [
      req.userData.userId,
      req.body.title,
      req.body.description,
      req.body.imageKey,
      req.userData.school,
      JSON.stringify(req.body.isCheckedSwap),
      JSON.stringify(req.body.isCheckedCash),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: err,
        });
      }
      return res.status(201).send({
        message: "Registered!",
      });
    }
  );
});

router.get("/test", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
