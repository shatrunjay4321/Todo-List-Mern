const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require('./routes/index.js');

const app = express();

const PORT = process.env.PORT;
const MONGO_URI_STRING = process.env.MONGO_URI_STRING;

app.use(express.json());
app.use(cors());
app.use('/api/todos', router);

mongoose.connect(MONGO_URI_STRING)
    .then(() => app.listen(PORT, () => console.log("Server up babe")))
    .catch(e => console.error(e));
