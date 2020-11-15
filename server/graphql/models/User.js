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

  signIn(data, ctx) {
    const isAuthenticated = ctx.authenticate(data);

    if (isAuthenticated) {
      console.log('User is Authenticated!');
    }

    return `signIn... output!`;
  }

  signOut() {
    return 'signOut...';
  }
}

module.exports = User;
