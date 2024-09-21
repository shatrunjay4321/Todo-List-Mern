const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const todoRouter = require('./routes/todoRoutes.js');
const authRouter = require('./routes/auth.js');

const app = express();

const PORT = process.env.PORT;
const MONGO_URI_STRING = process.env.MONGO_URI_STRING;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));
app.use('/todos', todoRouter);
app.use('/auth', authRouter);

mongoose.connect(MONGO_URI_STRING)
    .then(() => app.listen(PORT, () => console.log("Server up babe")))
    .catch(e => console.error(e));
