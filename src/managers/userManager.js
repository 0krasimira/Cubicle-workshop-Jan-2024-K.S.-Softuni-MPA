const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const {SECRET} = require("../config/config")

// TIODO: Check if user exists

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {

    //TODO: find user
    const user = await User.findOne({username})

    if(!user){
        throw new Error("Cannot find username or password")
    }

    //TODO: validate password 

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
        throw new Error("Cannot find username or password")
    }

    //TODO: create token

    const payload = {
        _id: user._id,
        username: user.username
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: "2d"})

    //TODO: return user

    return token;
}



