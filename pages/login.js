import { Mutation } from 'react-apollo';

import { SIGN_IN } from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';

import Redirect from '@/components/shared/Redirect';
import Errors from '@/components/shared/Errors';
import LoginForm from '@/components/forms/LoginForm';

const Login = () => {

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            <Mutation mutation={SIGN_IN}>
              { 
                (loginUser, { data, error }) => 
                  <>
                    <LoginForm onSubmit={loginData => {
                      loginUser({ variables: loginData })
                    }} />
                    { data && data.signIn && <Redirect to="/portfolios" /> }
                    { error && <Errors error={error} /> }
                  </>
              }
            </Mutation>
          </div>
        </div>
      </div>
    </>
  )
}

export default withApollo(Login);
