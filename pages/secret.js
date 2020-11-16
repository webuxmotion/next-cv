import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';

const Secret = withAuth(() => (
  <>
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">SECRET PAGE</h1>
        </div>
      </div>
    </div>
  </>
), 'admin');

export default withApollo(Secret);
