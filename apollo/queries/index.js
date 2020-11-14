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
      startDate: "01/01/2014"
      endDate: "01/01/2016"
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
