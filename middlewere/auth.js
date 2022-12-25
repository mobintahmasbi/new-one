const data = require("../db");
const jwt = require("jsonwebtoken");
const validate = require("./validation");
const con = require("../db");
const conf = require("../config/config");
con.connect((err) => {
  if (err) {
    throw err;
  }
});
function authenticate(req, res, next) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  let finder = [];
  if (!validate(user)) {
    req.body.validation = false;
    req.body.message = "wrong format";
    next();
  }
  new Promise((resolve, reject) => {
    con.query(
      `select * from users where Email = "${user.email}";`,
      function (err, result, fields) {
        if (err) {
          throw err;
        }
        finder = result;
        resolve(result);
      }
    );
  }).then(() => {
    if (finder[0] != undefined && user.password === finder[0].Password) {
      const token = jwt.sign(
        { email: finder[0].Email, password: finder[0].Password },
        conf.privateKey
      );
      console.log(token);
      req.body = {
        email: finder[0].Email,
        validation: true,
        token,
      };
    } else {
      req.body.validation = false;
      req.body.message = "email or password are wrong";
    }
    next();
  });
}
module.exports = authenticate;
