"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Question extends Model {
  questionModel() {
    return this.belongsTo("App/Models/QuestionModel");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
  answer() {
    return this.hasOne("App/Models/Answer");
  }
}

module.exports = Question;
