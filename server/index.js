const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router.js");
const serverless = require("serverless-http");
const db = require("./lib/mysqlConnector.js");
const uuid = require("uuid");
const PORT = process.env.PORT || 3000;

require("dotenv").config();
app.use(express.json());
app.use(cors());

const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://localhost:19000"],
  },
});
/*
io.on("connection", (socket) => {
  console.log("Socket Connected!");

  socket.on("get-user", (user) => {
    db.query(
      `SELECT * from chats WHERE userID = '${JSON.parse(user).user.user.id}'`,
      function (err, result) {
        if (err) throw err;
        io.emit("get-all-messages", result);
      }
    );
  });
  
  socket.on("send-message", (message) => {
    console.log(message);
    db.query(
      "INSERT INTO chats (userID, message) VALUES (?, ?)",
      [JSON.parse(message).user.id, JSON.parse(message).message],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      }
    );
    io.emit("recieve-message", message);
  });
});
*/

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.join("Test Room");
  // handling event from the front-end:d
  socket.on("clientEvent", function (data) {
    socket.emit("allChats", { allChats: data });

    console.log("Client event");

    if (data.message) {
      //insert new message to database
      db.query(
        "INSERT INTO chats (userID, message, time, messageID, chatID) VALUES (?, ?, now(), ?, ?)",
        [data.user.user.id, data.message, uuid.v4(), "connorTOadmin"],
        (err1, result1) => {
          if (err1) {
            console.log(err1);
          }
          db.query(
            //`SELECT * from chats WHERE userID = '${data.user.user.id}' ORDER BY time ASC`,
            `SELECT * from chats WHERE chatID = 'connorTOadmin' ORDER BY time ASC`,

            function (err2, result2) {
              if (err2) throw err2;
              io.emit("databaseUpdate", { chats: result2 });
            }
          );
        }
      );
    } else {
      db.query(
        //`SELECT * from chats WHERE userID = '${data.user.user.id}' ORDER BY time ASC`,
        `SELECT * from chats WHERE chatID = 'connorTOadmin' ORDER BY time ASC`,
        function (err, result) {
          if (err) throw err;
          io.emit("databaseUpdate", { chats: result });
        }
      );
    }
    //database fetch results
  });
});
app.use("/api", router);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//module.exports.handler = serverless(app);
