import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const FeesMenu = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/subscription'>
              Kup abonament
            </Nav.Link>
            <Nav.Link as={Link} to='/paid-fees'>
              Lista opłaconych opłat
            </Nav.Link>
            <Nav.Link as={Link} to='/unpaid-fees'>
              Lista nieopłaconych opłat
            </Nav.Link>
            {/* More buttons */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FeesMenu;
