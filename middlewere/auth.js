const data = require('../db');
const jwt = require('jsonwebtoken');
const validate = require('./validation');
const con = require('../db');
function authenticate(req ,res , next){
    const user = {
        email: req.body.email,
        password : req.body.password
    }
    let finder = [];
    if(validate(user)){
        console.log(user);
        console.log('end of middleware');
    }else{
        return res.send('you send nothing')
        
    }
    con.connect((err) => {
        if(err){
            throw err;
        }
        new Promise((resolve , reject) =>{
            con.query(`select * from users where Email = "${user.email}";` , function(err , result , fields){
                if(err){
                    throw err;
                }
                finder = result;
                resolve(result)
            })
        }).then(
            () => {
                const userdbselected = {
                    email : finder[0].Email,
                    password : finder[0].Password
                }
                if(user.password === userdbselected.password){
                    console.log('correct!!!');
                }
            }
        )
      })
    next();

}
module.exports = authenticate;