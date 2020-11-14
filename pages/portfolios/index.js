import PortfolioCard from '@/components/portfolios/Card';
import Link from 'next/link';
import { getDataFromTree } from '@apollo/react-ssr';

import withApollo from '@/hoc/withApollo';
import {
  useGetPortfolios,
  useUpdatePortfolio,
  useCreatePortfolio,
  useDeletePortfolio,
} from '@/apollo/actions'

const Portfolios = () => {
  const { data, loading } = useGetPortfolios();
  const [updatePortfolio] = useUpdatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();
  const [createPortfolio] = useCreatePortfolio();

  const portfolios = data && data.portfolios || [];

  if (loading) return <h1>Loading...</h1>;

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
                  onClick={() => updatePortfolio({ variables: { id: portfolio._id} })}
                  className="btn btn-warning"
                >Update Portfolio</button>
                <button 
                  onClick={() => deletePortfolio({ variables: { id: portfolio._id} })}
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

export default withApollo(Portfolios, { getDataFromTree });
