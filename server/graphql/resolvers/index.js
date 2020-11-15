const Portfolio = require('../../db/models/portfolio');

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
