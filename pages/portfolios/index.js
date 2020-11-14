import { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioCard from '@/components/portfolios/Card';
import Link from 'next/link';

import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { GET_PORTFOLIOS, CREATE_PORTFOLIO } from '@/apollo/queries';

const graphDeletePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }
  `;

  return axios.post('http://localhost:3000/graphql', { query })
    .then(res => res.data.data.deletePortfolio)
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

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS);

  const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      const newPortfolios = [...portfolios, createPortfolio];

      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: newPortfolios }
      });
    }
  });

  useEffect(() => {
    getPortfolios();
  }, [])

  if (
    data && data.portfolios.length > 0 && 
    (portfolios.length === 0 || data.portfolios.length !== portfolios.length)
  ) { setPortfolios(data.portfolios) };

  if (loading) { return <div>loading...</div> };

  const updatePortfolio = async (id) => {
    const updatedPortfolio = await graphUpdatePortrolio(id);
    const index = portfolios.findIndex(p => p._id === id);
    const newPortfolios = [...portfolios];
    newPortfolios[index] = updatedPortfolio;

    setPortfolios(newPortfolios);
  }

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    const index = portfolios.findIndex(p => p._id === deletedId);
    const newPortfolios = [...portfolios];
    if (index !== -1) {
      newPortfolios.splice(index, 1);
    }

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
                <button 
                  onClick={() => deletePortfolio(portfolio._id)}
                  className="btn btn-danger"
                >Delete Portfolio</button>
              </div>
            ))
          }
        </div>
      </section>

      <a href="" className="btn btn-main bg-blue ttu">See More Portfolios</a>
    </>
  )
}

export default Portfolios;
