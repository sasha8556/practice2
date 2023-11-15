const UserService = require("../services/user.services");

class UserControllers {

  async registerUser(info) {
    let newUser=await UserService.registerUser(info);
    return newUser;
  }
}

module.exports = new UserControllers();
