const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI


mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{1,}$/.test(v)
      },
      message: () => 'Phone number must be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers'
    }
  }
})

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
