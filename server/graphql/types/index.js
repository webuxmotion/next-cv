const portfolioFieldsWithoutId = `
  title: String,
  company: String,
  companyWebsite: String,
  location: String,
  jobTitle: String,
  description: String,
  startDate: String,
  endDate: String
`;

exports.portfolioTypes = `
  type Portfolio {
    _id: ID,
    ${portfolioFieldsWithoutId}
  }

  input PortfolioInput {
    ${portfolioFieldsWithoutId}
  }
`
