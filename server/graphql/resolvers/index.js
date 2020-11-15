exports.portfolioQueries = {
  portfolio: (_, { id }, { models: { Portfolio }}) => Portfolio.getById(id),
  portfolios: (_, __, { models: { Portfolio }}) => Portfolio.getAll()
}

exports.portfolioMutations = {
  createPortfolio: (_, { input }, { models: { Portfolio }}) => Portfolio.create(input),
  updatePortfolio: (_, { id, input }, { models: { Portfolio }}) => Portfolio.update({ _id: id }, input, { new: true }),
  deletePortfolio: async (_, { id }, { models: { Portfolio }}) => {
    const deletedPortfolio = await Portfolio.delete({ _id: id });

    return deletedPortfolio._id;
  }
}

exports.userMutations = {
  signUp: (_, { input }, { models: { User }}) => {
    return User.signUp(input);
  },
  signIn: (_, { input }, { models: { User }, ...ctx}) => {
    return User.signIn(input, ctx);
  },
  signOut: (_, __, { models: { User }}) => {
    return User.signOut();
  }
}
