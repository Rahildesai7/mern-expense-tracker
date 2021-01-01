const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const passportLocalMongoose =  require("passport-local-mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    email: {
        type: String,
        unique: 'Email already exists',
        required: 'Email is required'
    },
    password: {
        type: String,
        password: 'Password is required'
    }
})

userSchema.methods = {
    encryptPassword: (password)=>{
        return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    },

    validatePassword: (password)=>{
        return bcrypt.compareSync(password, this.password);
    }
}

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema); 