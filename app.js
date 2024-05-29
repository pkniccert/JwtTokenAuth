require("dotenv").config();
require("./config/database").connect();
const userRoute = require("./routes/users");
const authRoute = require("./routes/authPage");
const ipRoute = require("./routes/ips")
const webRoute = require("./routes/web")
const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', webRoute);
app.use('/api', userRoute);
app.use('/api', authRoute);
app.use('/api', ipRoute);

module.exports = app;
