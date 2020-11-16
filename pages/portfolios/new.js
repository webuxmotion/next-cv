import { useRouter } from 'next/router';

import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { useCreatePortfolio } from '@/apollo/actions';

import BaseLayout from '@/layouts/BaseLayout';

import PortfolioForm from '@/components/forms/PortfolioForm';
import Errors from '@/components/shared/Errors';

const PortfolioNew = withAuth(() => {
  const [createPortfolio, { error }] = useCreatePortfolio();
  const router = useRouter();

  const handleCreatePortfolio = async (data) => {
    await createPortfolio({ variables: data });
    router.push('/portfolios')
  }

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Portfolio</h1>
            <PortfolioForm 
              onSubmit={handleCreatePortfolio}
            />
            { error && <Errors error={error} /> }
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}, ['admin', 'instructor'])

export default withApollo(PortfolioNew);
