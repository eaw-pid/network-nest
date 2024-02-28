
import React from 'react';
import { NavLink } from "react-router-dom";
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import styles from './NavBar.css'
import logoImage from '../images/logo-2.png';


function NavBar({currentUser, setCurrentUser, logout}) {

    function handleLogout() {
        logout()
    }
    return (
    <div>
        <Navbar bg="light" expand="lg" className={styles.navbar}>
            <Container className={styles.navbarContainer}>
                <Navbar.Brand>
                    <NavLink to="/">
                        <img src={logoImage} alt="logo"/>
                    </NavLink>
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {!currentUser ? (
                    <>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/" className={styles.navLink}>Home</Nav.Link>  
                    <Nav.Link as={NavLink} to="/login" className={styles.navLink}>Login</Nav.Link>  
                </Nav> 
                <Button as={NavLink} to="/signup" bsstyle="primary">Signup</Button>
                </>
                ) : (
                <>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/my-connections" className={styles.navLink}>My Connections</Nav.Link>  
                    
                </Nav>
                <Button bsstyle="primary" onClick={handleLogout}>Logout</Button>
                </>)}
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    )}

export default NavBar