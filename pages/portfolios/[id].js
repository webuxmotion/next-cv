import React from 'react';

class PortfolioDetail extends React.Component {

  static getInitialProps({ query }) {
    return { query }
  }

  render() {
    const { query: { id }} = this.props;

    return (
      <h1>ID: {id}</h1>
    )
  }
}

export default PortfolioDetail;
