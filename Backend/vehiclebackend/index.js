require("dotenv").config();
const express = require("express");
const cors = require("cors"); // authorize resource sharing with third parties
const app = express();
const http = require("http").createServer(app);
const Router = require("./router/Router");
const PORT = 8001;
http.listen(PORT, () => {
  console.log("Server is Running");
});
//Middleware
const bodyParser = express.json();
app.use(bodyParser);
app.use(cors());
app.use(Router);
