require('dotenv').config();
const express = require("express");

const app = express();

const config = require("./config")(app);

app.listen(process.env.PORT, () => console.log(`Server was started on ${process.env.PORT}`))