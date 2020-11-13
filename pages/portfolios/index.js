import { useState } from 'react';
import axios from 'axios';
import PortfolioCard from '@/components/portfolios/Card';
import Link from 'next/link';

const graphFetchPortfolios = () => {
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

const graphCreatePortrolio = () => {
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

const graphUpdatePortrolio = (id) => {
  const query = `
    mutation UpdatePortfolio {
      updatePortfolio (id: "${id}", input: {
        title: "asdfsf"
        company: "updated company"
        companyWebsite: "update.new.com"
        location: "Spain updated"
        jobTitle: "Front end engineer updated"
        description: "Work, work"
        startDate: "01/01/2020"
        endDate: "01/01/2020"
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
    .then(data => data.updatePortfolio)
}

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data?.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortrolio();
    const newPortfolios = [...portfolios, newPortfolio];

    setPortfolios(newPortfolios);
  }

  const updatePortfolio = async (id) => {
    const updatedPortfolio = await graphUpdatePortrolio(id);
    const index = portfolios.findIndex(p => p._id === id);
    const newPortfolios = [...portfolios];
    newPortfolios[index] = updatedPortfolio;

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
                <button 
                  onClick={() => updatePortfolio(portfolio._id)}
                  className="btn btn-warning"
                >Update Portfolio</button>
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
  const portfolios = await graphFetchPortfolios();

  return { data: { portfolios } }
}

export default Portfolios;
