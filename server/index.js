const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/router.js");
const serverless = require("serverless-http");

require("dotenv").config();
//const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/api", router);

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports.handler = serverless(app);
