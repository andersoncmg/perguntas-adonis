"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AnswerSchema extends Schema {
  up() {
    this.create("answers", (table) => {
      table.increments();
      table
        .integer("question_id")
        .unique()
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("questions")
        .onDelete("CASCADE");
      table.string("text");
      table.enu("option", [0, 1, 2, 3, 4]);
      table.timestamps();
    });
  }

  down() {
    this.drop("answers");
  }
}

module.exports = AnswerSchema;
