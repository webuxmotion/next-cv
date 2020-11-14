import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import withApollo from '@/hoc/withApollo';
import { GET_PORTFOLIO } from '@/apollo/queries';

const PortfolioDetail = ({ query: { id } }) => {
  const { data, loading } = useQuery(GET_PORTFOLIO, { variables: { id }});
  const portfolio = data && data.portfolio || {};

  if (loading) return <h1>Loading...</h1>;

  const {
    title,
    jobTitle,
    companyWebsite,
    location,
    startDate,
    endDate,
    description
  } = portfolio;

  return (
    <div className="portfolio-detail">
      <div className="container">

        <div className="jumbotron">
          <h1 className="display-3">{title}</h1>
          <p className="lead">{jobTitle}</p>
          <p>
            <a className="btn btn-lg btn-success" href={companyWebsite} role="button">
              See Company</a>
          </p>
        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4 className="title">Location</h4>
            <p className="text">{location}</p>

            <h4 className="title">Start Date</h4>
            <p className="text">{startDate}</p>
          </div>

          <div className="col-lg-6">
            {/* TODO: days later... */}
            <h4 className="title">Days</h4>
            <p className="text">44</p>

            <h4 className="title">End Date</h4>
            <p className="text">{endDate}</p>
          </div>
          <div className="col-md-12">
            <hr />
            <h4 className="title">Description</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

PortfolioDetail.getInitialProps = ({ query }) => ({ query });

export default withApollo(PortfolioDetail, { getDataFromTree });
