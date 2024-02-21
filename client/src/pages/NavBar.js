import React from 'react';
import { NavLink } from "react-router-dom";
import {Navbar, Nav, Container} from 'react-bootstrap'
import styles from './NavBar.css'
import Home from './Home'
import Login from './Login'
//./ makes it look in the current directory
import Signup from './Signup'

function NavBar() {
    return (
    <div>
        <Navbar bg="light" expand="lg" className={styles.navbar}>
            <Container className={styles.navbarContainer}>
                <Navbar.Brand as={NavLink} to="/">NetworkNest</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className={styles.navLink}>
                        Home
                    </Nav.Link>  
                    <Nav.Link as={NavLink} to="/login" className={styles.navLink}>
                        Login
                    </Nav.Link>  
                    <Nav.Link as={NavLink} to="/signup" className={styles.navLink}>
                        Signup
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
        )
}

export default NavBar