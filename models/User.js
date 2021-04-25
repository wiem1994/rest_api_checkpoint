const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a person using the prototype
const userSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    email: String,
});

module.exports = mongoose.model("User", userSchema);
