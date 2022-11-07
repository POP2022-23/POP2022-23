import React, { useState } from 'react';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardWindow: React.FC<{ launchFees: () => void, launchMap: () => void, launchRegisterCar: () => void, launchTariffs: () => void, logOut: () => void, }> = (props) => {
    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Pokaż dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/registerCar">Zarejestruj nowy pojazd</Nav.Link>
                        <Nav.Link as={Link} to="/map">Pokaż mapę sieci drogowej</Nav.Link>
                        <Nav.Link as={Link} to="/addRoad">Dodaj mapę do sieci drogowej</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default DashboardWindow;