const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  next();
});

app.use(express.static("dist"));

app.get("/oauth2/v1/authorize/callback", (req, res) => {
  res.send("ok");
});

app.post("/oauth2/v1/authorize/callback", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
