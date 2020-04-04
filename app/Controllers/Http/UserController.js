"use strict";

const User = use("App/Models/User");
const Database = use("Database");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usuarios
 */
class UserController {
  async show({ request, response }) {
    const { username } = request.get();
    const users = await User.query()
      .where("username", "LIKE", `%${username}%`)
      .select("id", "username")
      .fetch();
    return users;
  }
  async showById({ params }) {
    const id = params.id;
    let user = await User.find(id);
    user = user.toJSON();
    delete user.email;
    delete user.password;
    if (!user) return response.status(400).json({ erro: "bad request" });
    return user;
  }
  async questions({ auth }) {
    const userId = auth.user.id;
    let questionList = await User.find(userId);
    questionList = await questionList
      .questions()
      .with("questionModel.user")
      .with("answer")
      .fetch();
    questionList = await questionList.toJSON();

    for (let index in questionList) {
      delete questionList[index].user_id;
      delete questionList[index].question_model_id;
      delete questionList[index].questionModel.user.email;
      delete questionList[index].questionModel.user.password;
      delete questionList[index].questionModel.user.created_at;
      delete questionList[index].questionModel.user.updated_at;
    }
    return questionList;
  }
}

module.exports = UserController;
