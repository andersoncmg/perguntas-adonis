"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("/login", "SessionController.authenticate").middleware(`guest`);
Route.post("/register", "SessionController.register");
Route.group(() => {
  Route.resource("question-models", "QuestionModelController").apiOnly();
  Route.get(
    "/question-models-by-user-id/:id",
    "QuestionModelController.indexByUserId"
  );
  Route.resource("questions", "QuestionController").only(["store", "index"]);
  Route.resource("answer", "AnswerController").only(["store"]);

  Route.get("/users", "UserController.show");
  Route.get("/my-questions", "UserController.questions");

  Route.get("/user/:id", "UserController.showById");
}).middleware(`auth`);
