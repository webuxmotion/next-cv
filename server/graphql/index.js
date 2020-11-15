const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const { 
  portfolioTypes,
  userTypes,
} = require('./types');
const { 
  portfolioQueries, 
  portfolioMutations,
  userMutations,
} = require('./resolvers');
const { buildAuthContext } = require('./context');

const Portfolio = require('./models/Portfolio');
const User = require('./models/User');

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): String
      signOut: String
    }
  `;

  const resolvers = {
    Query: {
      ...portfolioQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      ...buildAuthContext(),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio')),
        User: new User(mongoose.model('User'))
      }
    })
  });

  return apolloServer;
}
