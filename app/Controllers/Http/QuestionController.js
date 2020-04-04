"use strict";

const Question = use("App/Models/Question");
const QuestionModel = use("App/Models/QuestionModel");
const User = use("App/Models/User");

class QuestionController {
  async store({ request, auth, response }) {
    let { question_model_id, text, options } = request.post();
    const user_id = auth.user.id;

    if (!question_model_id || !text)
      return response.status(400).json({ erro: "bad request" });

    let questionModel = await QuestionModel.find(question_model_id);

    if (questionModel.user_id == user_id)
      return response.status(400).json({ erro: "you cant ask yourself" });

    if (
      (questionModel.type === "text" && options) ||
      (questionModel.type === "multiple" && !options)
    )
      return response.status(400).json({ erro: "bad request" });
    if (questionModel.type === "multiple") options = JSON.stringify(options);

    let model = await Question.create({
      user_id,
      question_model_id,
      text,
      options,
    });
    return model;
  }

  async index({ auth }) {
    const user_id = auth.user.id;
    const user = await User.find(user_id);
    let questions = await user
      .questionsByModel()
      .with("questionModel")
      .with("user")
      .with("answer")
      .fetch();
    questions = questions.toJSON();
    for (let index in questions) {
      delete questions[index].user_id;
      delete questions[index].question_model_id;
      delete questions[index].user.email;
      delete questions[index].user.password;
      delete questions[index].user.created_at;
      delete questions[index].user.updated_at;
    }
    return questions;
  }
}

module.exports = QuestionController;
