const UserService = require("../services/user.services");

class UserControllers {

  async registerUser(info) {
    let newUser=await UserService.registerUser(info);
    return newUser;
  }
  async loginUser(info) {
    let foundUser=await UserService.loginUser(info);
    return foundUser;
  }
}

module.exports = new UserControllers();
