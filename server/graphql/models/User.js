class User {

  constructor(model) {
    this.Model = model;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as confirmation password!');
    }
    const result = await this.Model.create(signUpData);

    return result._id;
  }

  async signIn(data, ctx) {
    try {
      const user = await ctx.authenticate(data);

      return user;
    } catch (error) {
      return error;
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = User;
