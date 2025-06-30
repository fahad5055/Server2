const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

userModel.methods.comparepassword = async function (inputpassword) {
    userModel.methods.comparepassword = async function (inputpassword) {
        return await bcrypt.compare(inputpassword, this.password);
    };
}
const Userslist = mongoose.model("Userslist", userModel);
module.exports = Userslist;