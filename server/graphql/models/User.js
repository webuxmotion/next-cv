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

  signIn() {
    return 'signIn...';
  }

  signOut() {
    return 'signOut...';
  }
}

module.exports = User;
