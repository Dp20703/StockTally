import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavbarCompo = () => {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">📈 StockTally</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/trade/dashboard" active={location.pathname === '/trade/dashboard'}>Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/trade/watchlist" active={location.pathname === '/trade/watchlist'}>Watchlist</Nav.Link>
                        <Nav.Link as={Link} to="/chart/showchart" active={location.pathname === '/chart/showchart'}>Show Charts</Nav.Link>
                        <Nav.Link as={Link} to="/chart/topstories" active={location.pathname === '/chart/topstories'}>Top </Nav.Link>
                        <Nav.Link as={Link} to="/profile" active={location.pathname === '/profile'}>Profile</Nav.Link>
                        <Nav.Link as={Link} to="/logout" active={location.pathname === '/logout'}>Logout</Nav.Link></Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarCompo;
