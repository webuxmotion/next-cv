class User {

  constructor(model) {
    this.Model = model;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.passwordConfirmation) {
      throw new Error('Password must be the same as confirmation password!');
    }

    try {
      return await this.Model.create(signUpData);
    } catch (error) {
      if (error.code && error.code === 11000) {
        throw new Error(`Email: ${signUpData.email} already exists`);
      }
      
      throw error;
    }
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
