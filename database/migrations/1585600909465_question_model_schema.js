"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class QuestionModelSchema extends Schema {
  up() {
    this.create("question_models", table => {
      table.increments();

      table.string("title", 255).notNullable();
      table.string("description", 255);
      table.enu("type", ["text", "multiple"]).notNullable();
      table.float("price");
      table.integer("max_chars");

      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("questionModels");
  }
}

module.exports = QuestionModelSchema;
