const express = require("express");
const rootRouter = require("./routers/root");
const encodeDecodeRouter = require("./routers/encode-decode");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(rootRouter);
app.use(encodeDecodeRouter);

module.exports = app;
