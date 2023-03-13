const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
const User = new mongoose.Schema(
  {id: {
    type: String,
    default: ObjectId,
  },
    firstName:{type: String, required:true},
    lastName:{type: String, required:true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    source: {
      type: String,
      required: [true, 'source not specified'],
    },
    apiCount:{type: Number, required:true},
    lastVisited: {
      type: Date,
      default: new Date(),
    },
  },
  { collection: 'user-data' }
);

const UserModel = mongoose.model('UserData', User);
module.exports = UserModel;
