import { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import withApollo from '@/hoc/withApollo';
import { useLazyGetUser } from '@/apollo/actions';

import AppLink from '@/components/shared/AppLink';

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data, error, loading }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) { setUser(data.user) }
    if (!data.user && user) { setUser(null) }
    if (!hasResponse) { setHasResponse(true) }
  }
  
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">NePirat</AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <AppLink href="/portfolios" className="nav-link mr-3">Portfolios</AppLink>
            <AppLink href="/forum/categories" className="nav-link mr-3">Forum</AppLink>
            <AppLink href="/cv" className="nav-link mr-3">CV</AppLink>
          </Nav>
          { loading &&
            <span className="ml-auto">Loading...</span>
          }
          { hasResponse &&
            <Nav className="ml-auto">
              { user &&
                <>
                  <span className="nav-link mr-4">Welcome {user.username}</span>
                  <AppLink href="/logout" className="nav-link btn btn-danger">Sign Out</AppLink>
                </>
              }
              { (error || !user) &&
                <>
                  <AppLink href="/register" className="nav-link mr-3">Sign Up</AppLink>
                  <AppLink href="/login" className="mr-3 btn btn-success bg-green-2 bright">Sign In</AppLink>
                </>
              }
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default withApollo(NavbarComponent);
