const mongoose = require('mongoose');



const personSchema = new mongoose.Schema({
  fname: String,
  favouriteFoods: {
    required: [true, 'you have to add favourite food !!'],
    type: [String],
  },
  age: Number

});

const person = mongoose.model('person', personSchema);
module.exports = person;
