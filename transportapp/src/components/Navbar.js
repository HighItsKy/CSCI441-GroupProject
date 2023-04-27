import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

// in the function the return will show what the html will look like
function TransportNavbar({ user }) {

    const expandBreakpoint = "md"; /* Change this to update breakpoint*/

    return (
        // made sure there is only one html tag at the top level of the return statement
        <>
            <Navbar bg="navBackground" variant="dark" expand={expandBreakpoint}>
                <Container fluid>
                    <div
                        style={{ width: "56px" }}
                        className={`d-block d-${expandBreakpoint}-none`}>
                    </div>

                    <Nav.Link
                        href="./JobViewer"
                        className={`m-auto d-block d-${expandBreakpoint}-none`}
                        >
                        View Jobs
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto flex-grow-1 justify-content-evenly">
                        <Nav.Link
                            href="./JobViewer"
                            className={`d-none d-${expandBreakpoint}-block`}
                            >
                            View Jobs
                        </Nav.Link>
                        {user.isAdmin ? (
                            <>
                                <Nav.Link
                                    href="./ManageUsers"
                                    >
                                    Manage Users
                                </Nav.Link>
                                <Nav.Link
                                    href="./TruckViewer"
                                    >
                                    Trucks
                                </Nav.Link>
                                <Nav.Link
                                    href="./AccountSettings"
                                    >
                                    Account Settings
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    href="./AccountSettings"
                                    >
                                    Account Settings
                                </Nav.Link>
                            </>
                        )}
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

        // if i add another html tag here, then there would be two html tags at the top
        // level and we would get an error
        //<div Another html tag at the top level </div>
    );
}

// export the component so it can be used outside of this file
export default TransportNavbar;    
