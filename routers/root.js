const express = require("express");
const connectDB = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    const urls = await db.all("SELECT * FROM urls");
    res.render("index", { urls: urls });
  } catch (err) {
    return res.status(500).send("root err");
  }
});

module.exports = router;
