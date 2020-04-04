"use strict";
const User = use("App/Models/User");

class SessionController {
  async authenticate({ request, auth, response }) {
    // logs in
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    const dados = await User.query()
      .where("email", email)
      .first();
    return response.status(200).json({
      token: token.token,
      username: dados.username
    });
  }

  async register({ auth, request, response }) {
    // logs in
    const { username, email, password, r_password } = request.post();
    if (r_password != password) {
      return response
        .status(401)
        .json({ erro: "senha é diferente da repetida" });
    }
    let user = await User.create({ username, email, password });
    const { token } = await auth.generate(user);

    user = user.toJSON();
    user.token = token;
    delete user.password;
    return user;
  }
}

module.exports = SessionController;
