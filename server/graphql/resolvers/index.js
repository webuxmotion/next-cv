exports.portfolioQueries = {
  portfolio: (_, { id }, { models: { Portfolio }}) => Portfolio.getById(id),
  portfolios: (_, __, { models: { Portfolio }}) => Portfolio.getAll(),
  userPortfolios: (_, __, { models: { Portfolio }}) => Portfolio.getAllByUser()
}

exports.portfolioMutations = {
  createPortfolio: (_, { input }, { models: { Portfolio }}) => Portfolio.create(input),
  updatePortfolio: (_, { id, input }, { models: { Portfolio }}) => Portfolio.update({ _id: id }, input, { new: true }),
  deletePortfolio: async (_, { id }, { models: { Portfolio }}) => {
    const deletedPortfolio = await Portfolio.delete({ _id: id });

    return deletedPortfolio._id;
  }
}

exports.userQueries = {
  user: (_, __, { models: { User }, ...ctx }) => User.getAuthUser(ctx),
}

exports.userMutations = {
  signUp: (_, { input }, { models: { User }}) => {
    return User.signUp(input);
  },
  signIn: (_, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (_, __, { models: { User }, ...ctx }) => {
    return User.signOut(ctx);
  }
}
