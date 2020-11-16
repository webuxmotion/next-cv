import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';

import PortfolioForm from '@/components/forms/PortfolioForm';

const PortfolioNew = withAuth(() => {

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Portfolio</h1>
            <PortfolioForm onSubmit={data => alert(JSON.stringify(data))} />
          </div>
        </div>
      </div>
    </>
  );
}, ['admin', 'instructor'])

export default withApollo(PortfolioNew);
