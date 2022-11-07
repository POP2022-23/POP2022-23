import React, { useState } from 'react';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';

const DashboardWindow: React.FC<{ launchFees: () => void, launchMap: () => void, launchRegisterCar: () => void, launchTariffs: () => void, logOut: () => void, }> = (props) => {
    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Pokaż dashboard</Nav.Link>
                        <Nav.Link href="/registercar">Zarejestruj nowy pojazd</Nav.Link>
                        <Nav.Link href="/mappresenter">Pokaż mapę sieci drogowej</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default DashboardWindow;