import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

import withApollo from '@/hoc/withApollo';
import { GET_PORTFOLIO } from '@/apollo/queries';

const PortfolioDetail = ({ query }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [getPortfolio, { loading, data }] = useLazyQuery(GET_PORTFOLIO);

  useEffect(() => {
    getPortfolio({ variables: { id: query.id } });
  }, [])

  if (data && !portfolio) { setPortfolio(data.portfolio) };

  if (loading || !portfolio) { return <div>loading...</div> };

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

PortfolioDetail.getInitialProps = async ({ query }) => {

  return { query };
}

export default withApollo(PortfolioDetail, { getDataFromTree });
