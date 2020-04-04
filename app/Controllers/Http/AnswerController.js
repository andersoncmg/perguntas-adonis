"use strict";

const Answer = use("App/Models/Answer");
const Question = use("App/Models/Question");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with answers
 */
class AnswerController {
  async store({ auth, request, response }) {
    let { question_id, text, option } = request.post();
    const user_id = auth.user.id;

    let question = await Question.find(question_id);

    if (!question) return response.status(400).json({ erro: "bad request" });

    let questionModel = await question.questionModel().fetch();
    if (
      questionModel.user_id != user_id ||
      (questionModel.type === "text" && option) ||
      (questionModel.type === "multiple" && !option)
    )
      return response.status(400).json({ erro: "bad request" });

    let answer = await Answer.create({
      question_id,
      text,
      option,
    });
    return response.status(200).json("answer");
  }
}

module.exports = AnswerController;
