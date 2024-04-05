const mongoose = require('mongoose');

const uri = "mongodb+srv://webserver:asdf1234@onlab.k1cnug0.mongodb.net/?retryWrites=true&w=majority&appName=Onlab";

mongoose.connect(uri)
  .then(() => console.log('Successfully connected to Mongoose.'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    age: {
        required: false,
        type: Number
    }
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;