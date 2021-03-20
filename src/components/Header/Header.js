import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    console.log("header",loggedInUser)
    return (
        <div className='container'>
             {/* <Navbar bg="light" variant="light">
                <Navbar.Brand>Fast Movers</Navbar.Brand>
                <Nav className="mr-auto margin-left-custom">
                <Link to='/' className='nav-item'>Home</Link>
                <Link to='/destination/car' className='nav-item'>Destination</Link>
                
                
                {
                    loggedInUser.email ? <span>{loggedInUser.displayName}</span>: <Link to="/login" className="nav-link"><button className="btn btn-primary site-btn">Login</button></Link>
                }
                </Nav>
            </Navbar> */}
            <Navbar className='container nav-color-white' expand="lg">
                <Navbar.Brand >Fast Movers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Link to='/' className='nav-item'>Home</Link>
                    <Link to='/destination/car' className='nav-item'>Destination</Link>
                    {
                    loggedInUser.email ? <span>{loggedInUser.displayName}</span>: <Link to="/login" className="nav-link"><button className="btn btn-primary site-btn">Login</button></Link>
                     }
                    </Nav>
                    
                </Navbar.Collapse>
                </Navbar>
        </div>
    );
};

export default Header;