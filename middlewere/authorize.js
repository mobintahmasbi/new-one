const jwt = require("jsonwebtoken");
function authorization(req , res ,next){
    res.send(req.headers["cookie"])
    next()
}
module.exports = authorization








