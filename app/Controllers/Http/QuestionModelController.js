"use strict";

const QuestionModel = use("App/Models/QuestionModel");

class QuestionModelController {
  async index({ auth }) {
    const user_id = auth.user.id;
    let userModels = await QuestionModel.query()
      .where("user_id", user_id)
      .fetch();
    return userModels;
  }
  async indexByUserId({ params }) {
    const id = params.id;
    let userModels = await QuestionModel.query()
      .where("user_id", id)
      .fetch();
    return userModels;
  }
  async store({ request, auth, response }) {
    const { title, description, type, price, max_chars } = request.post();
    if (!title || !type || (type != "text" && type != "multiple"))
      return response.status(400).json({ erro: "bad request" });
    const user_id = auth.user.id;
    let model = await QuestionModel.create({
      title,
      description,
      type,
      price,
      max_chars,
      user_id
    });
    return model;
  }

  async show({ auth, response, params }) {
    const userId = auth.user.id;
    const id = params.id;

    let questionModel = await QuestionModel.query()
      .select("id", "title", "description", "type", "price", "max_chars")
      .where("id", id)
      .first();

    // let questionModel = await QuestionModel.findOrFail(id)
    // if (questionModel.user_id == userId) return questionModel
    if (!questionModel)
      return response.status(400).json({ erro: "bad request" });
    return questionModel;
  }

  async update({ request, auth, response, params }) {
    const userId = auth.user.id;
    const id = params.id;
    const { title, description, type, price, max_chars } = request.post();

    if (!title || !type || (type != "text" && type != "multiple"))
      return response.status(400).json({ erro: "bad request" });

    let questionModel = await QuestionModel.query()
      .where("id", id)
      .andWhere("user_id", userId)
      .update({ title, description, type, price, max_chars });

    // let questionModel = await QuestionModel.findOrFail(id);
    // // if( qm.id != uid) throw {erro: categoria nao encontrada}
    // if (questionModel.user_id == userId) {
    //   questionModel.save({ title, description, type, price, max_chars });
    // }

    if (!questionModel)
      return response.status(400).json({ erro: "bad request" });
    return { sucess: "model updated!s" };
  }

  async destroy({ auth, response, params }) {
    const userId = auth.user.id;
    const id = params.id;

    let questionModel = await QuestionModel.query()
      .where("id", id)
      .andWhere("user_id", userId)
      .delete();

    // let questionModel = await QuestionModel.findOrFail(id)
    // if (questionModel.user_id == userId){
    //   questionModel.delete()
    // }

    if (!questionModel)
      return response.status(400).json({ erro: "bad request" });
    return { sucess: "model deleted!" };
  }
}

module.exports = QuestionModelController;
