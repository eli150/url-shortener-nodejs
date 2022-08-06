const express = require("express");
const connectDB = require("../db");
const shortid = require("shortid");

const router = express.Router();

router.post("/encode", async (req, res) => {
  try {
    const db = await connectDB();
    const baseUrl = "http://su/";
    let urlCode = shortid.generate();
    const existingUrl = await db.get(
      "SELECT * FROM urls WHERE full_url = ?",
      `${req.body.inputUrl}`
    );

    if (existingUrl)
      return res.status(200).json({ short_url: existingUrl.short_url });

    const existingUrlCode = await db.get(
      "SELECT * FROM urls WHERE short_url = ?",
      `${baseUrl}${urlCode}`
    );

    if (existingUrlCode) {
      urlCode = shortid.generate();
    }
    await db.run(
      "INSERT INTO urls (full_url, short_url) VALUES (?, ?)",
      req.body.inputUrl,
      `${baseUrl}${urlCode}`
    );
    const urlObj = await db.get(
      "SELECT * FROM urls WHERE short_url = ?",
      `${baseUrl}${urlCode}`
    );

    return res.status(200).json({ urlObj: urlObj });
  } catch (err) {
    return res.status(500).json({ err: "encode err" });
  }
});

router.post("/decode", async (req, res) => {
  try {
    const db = await connectDB();
    const urlObj = await db.get(
      "SELECT * FROM urls WHERE short_url = ?",
      `${req.body.inputUrl}`
    );
    if (!urlObj) return res.status(400).json({ err: "url doesn't exist" });
    return res.status(200).json({ full_url: urlObj.full_url });
  } catch (err) {
    return res.status(500).send("decode err");
  }
});

module.exports = router;
