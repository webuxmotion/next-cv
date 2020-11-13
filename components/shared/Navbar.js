import { Navbar, Nav } from 'react-bootstrap';

import AppLink from '@/components/shared/AppLink';

const NavbarComponent = () => {
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
          <Nav className="ml-auto">
            <AppLink href="/register" className="nav-link mr-3">Sign Up</AppLink>
            <AppLink href="/login" className="mr-3 btn btn-success bg-green-2 bright">Sign In</AppLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponent;
