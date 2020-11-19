import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { useGetPortfolio, useUpdatePortfolio } from '@/apollo/actions';

import BaseLayout from '@/layouts/BaseLayout';

import PortfolioForm from '@/components/forms/PortfolioForm';
import Errors from '@/components/shared/Errors';

const PortfolioEdit = withAuth(() => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetPortfolio({ variables: { id }});
  const [updatePortfolio, { error }] = useUpdatePortfolio();

  const handlePortfolioUpdate = async (inputData) => {
    await updatePortfolio({ variables: { id, ...inputData }});
    toast.success('Portfolio has been updated!');
  }
  
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Edit Portfolio</h1>
            { data &&
              <PortfolioForm
                initialData={data.portfolio}
                onSubmit={handlePortfolioUpdate}
              />
            }
            { error && <Errors error={error} /> }
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}, ['admin', 'instructor'])

export default withApollo(PortfolioEdit);
