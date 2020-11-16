import { gql } from 'apollo-boost';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio (id: $id) {
      _id,
      title,
      company,
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id,
      title,
      jobTitle,
      description,
      startDate,
      endDate,
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio {
    createPortfolio (input: {
      title: "New from client"
      company: "new company"
      companyWebsite: "new.com"
      location: "Spain"
      jobTitle: "Front end engineer"
      description: "Work, work"
      startDate: "2012-12-12T23:59Z"
      endDate: "2013-12-12T23:59Z"
    }) {
      _id,
      title,
      company,
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID) {
    updatePortfolio (id: $id, input: {
      title: "asdfsf"
      company: "updated company"
      companyWebsite: "update.new.com"
      location: "Spain updated"
      jobTitle: "Front end engineer updated"
      description: "Work, work"
      startDate: "2012-12-12T23:59Z"
      endDate: "2013-12-12T23:59Z"
    }) {
      _id,
      title,
      company,
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;

// AUTH QUERIES START -------------------------------------

export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(input: {
      avatar: $avatar
      username: $username
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    })
  }
`;

export const SIGN_IN = gql`
  mutation SignIN(
    $email: String!
    $password: String!
  ) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      _id
      username
      email
      role
      avatar
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut { signOut }
`;

export const GET_USER = gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`;

// AUTH QUERIES END -------------------------------------
