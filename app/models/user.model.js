const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    source: {
      type: String,
      required: [true, 'source not specified'],
    },
    lastVisited: {
      type: Date,
      default: new Date(),
    },
    // name:{type:String,required:true},
  },
  { collection: 'user-data' }
);

const UserModel = mongoose.model('UserData', User);
module.exports = UserModel;
