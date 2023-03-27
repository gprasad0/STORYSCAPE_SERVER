let UserModel = require('../models/user.model');

const addGoogleUser = async (
  id,
  email,
  firstName,
  lastName,
  name,
  password,
  source
) => {
  console.log(
    'efrefff====>',
    id,
    email,
    firstName,
    lastName,
    name,
    password,
    source
  );
  const user = new UserModel({
    id: id,
    firstName: firstName,
    lastName: lastName,
    name: name,
    email: email,
    password: password,
    source: source,
    apiCount: 99,
  });
  let data = await user.save();
  return data;
};

const getUserByOauthId =  async (id) => {
  const user = await UserModel.find({})
  console.log("user=====>",user)
  return user
};

module.exports = { addGoogleUser, getUserByOauthId };
