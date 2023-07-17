const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/router.js');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use('/api', router);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const connection = require('./lib/mysqlConnector');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());




app.get("/items", (req, res) => {
  res.json([{post: "my first post"}])
});

app.post("/items", (req, res) => {
  res.json([{authenticated: false, userName: true, password: false}])
});


app.post("/authenticate", async(req, res) => {
    

      let response = req.body;

     
  
      let userName = response.userName;
      let password = response.password;
  

      
      connection.query(`SELECT password FROM users WHERE username ='${userName}'`, function (err, result) {
  
        //if username is valid
        try{
          if (result[0].password === password) {
            //res.json([{authenticated: true, userName: userName, password:password}])

            connection.query(`SELECT token FROM users WHERE username = '${userName}'`, function(err, token) {
              res.json([{authenticated: true, userName: userName, password:password, token: token[0].token}])

            })
            console.log("Sent info back");
          } else{
            res.json([{authenticated: false, userName: true, password: false}])

            console.log([{authenticated: false, password: true, userName: false}]);
          }
        }
        //
        catch{
          res.json([{valid: false, userName: false, password: true}])

        }
        
    });
});






app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
*/