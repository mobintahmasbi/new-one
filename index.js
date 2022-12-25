const epxress = require("express");
const app = epxress();
const bdb = require("body-parser");
const con = require("./db");
const auth = require("./middlewere/auth");
const authorization = require("./middlewere/authorize");
app.use(bdb.urlencoded({ extended: false }));
app.use(bdb.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.post("/api/pos", auth, (req, res) => {
  if (req.body.validation) {
    let hour = 3600000
    let age = 7 * 24 * hour
    res.cookie("token", req.body.token , {maxAge : age});
    res.send({
      validate: true,
      email: req.body.email,
    });
  } else {
    res.send({
      validate: false,
      message: req.body.message,
    });
  }
});
app.get("/dashboard",authorization, (req, res) => {
  // res.send("the body of router")
});
app.listen(8080, () => {
  console.log("server is runinng on 8080 port");
});
