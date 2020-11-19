import { useEffect, useRef } from 'react';
import withApollo from '@/hoc/withApollo';
import { useSignIn } from '@/apollo/actions';
import { useRouter } from 'next/router';

import messages from '@/constants/messages';
import BaseLayout from '@/layouts/BaseLayout';

import Redirect from '@/components/shared/Redirect';
import Errors from '@/components/shared/Errors';
import LoginForm from '@/components/forms/LoginForm';

const Login = () => {
  const disposeId = useRef(null);
  const [signIn, { data, error, loading }] = useSignIn();
  const router = useRouter();
  const { message } = router.query;

  const disposeMessage = () => {
    router.replace('/login', '/login', { shallow: true });
  }

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    return () => {
      clearTimeout(disposeId.current);
    }
  }, [message]);

  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            { message && 
              <div className={`alert alert-${messages[message].status}`}>
                {messages[message].value}
              </div>
            }
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
