import withApollo from '@/hoc/withApollo';
import { useSignIn } from '@/apollo/actions';

import BaseLayout from '@/layouts/BaseLayout';

import Redirect from '@/components/shared/Redirect';
import Errors from '@/components/shared/Errors';
import LoginForm from '@/components/forms/LoginForm';

const Login = () => {
  const [signIn, { data, error, loading }] = useSignIn();

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <LoginForm
              loading={loading}
              onSubmit={loginData => {
                signIn({ variables: loginData })
              }}
            />
            { data && data.signIn && <Redirect to="/" /> }
            { error && <Errors error={error} /> }
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default withApollo(Login);
