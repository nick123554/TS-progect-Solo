const { User } = require("../../db/models");

class AuthService {
  static async register({ email, name, password }) {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password },
    });
    return { user, created };
  }
  static async getUserByEmail({ email }) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  //

  static async deleteUser(data) {
    const delUser = await User.destroy(data);
    return delUser;
  }

  static async findOne(data) {
    const user = await User.findOne(data);
    return user;
  }

  static async updateUser(data) {
    const [updatedCount, updatedRows] = await User.update(data, {
      where: { id: data.id },
      returning: true,
    });
    if (updatedCount === 0) {
      throw new Error("Пользователь не найден или изменения не внесены");
    }
    return updatedRows[0];
  }

  static async getAllUser() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = AuthService;
