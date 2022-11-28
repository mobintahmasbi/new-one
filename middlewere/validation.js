const joi = require('joi');
function validateusers(user){
    const schema = joi.object({
        email: joi.string().min(4).max(255).required(),
        password: joi.string().min(4).max(255).required()
    })
    const result = schema.validate(user).error;
    if(result == undefined){
        return true
    }else{
        return false
    }
}
module.exports = validateusers;