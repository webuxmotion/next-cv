import { useState } from 'react';
import axios from 'axios';
import PortfolioCard from '@/components/portfolios/Card';
import Link from 'next/link';

const fetchPortfolios = () => {
  const query = `
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

  return axios.post('http://localhost:3000/graphql', { query })
    .then(res => res.data.data.portfolios)
}

const handleCreatePortrolio = () => {
  const query = `
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

  return axios.post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.createPortfolio)
}

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data?.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await handleCreatePortrolio();
    const newPortfolios = [...portfolios, newPortfolio];

    setPortfolios(newPortfolios);
  }

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button onClick={createPortfolio} className="btn btn-primary">Create portfolio</button>
      </section>
      
      <section className="pb-5">
        <div className="row">
          {
            portfolios.map(portfolio => (
              <div className="col-md-4" key={portfolio._id}>
                <Link
                  href="/portfolios/[id]"
                  as={`/portfolios/${portfolio._id}`}
                >
                  <a className="card-link">
                    <PortfolioCard portfolio={portfolio} />
                  </a>
                </Link>
              </div>
            ))
          }
        </div>
      </section>

      <a href="" className="btn btn-main bg-blue ttu">See More Portfolios</a>
    </>
  )
}

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();

  return { data: { portfolios } }
}

export default Portfolios;
