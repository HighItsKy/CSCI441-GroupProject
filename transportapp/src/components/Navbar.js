import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

// in the function the return will show what the html will look like
function TransportNavbar({ user }) {

    let adminLinks = ["View Jobs", "Add Job", "Edit Job", "Manage Users", "Account Settings"]
    let driverLinks = ["View Jobs", "Edit Job", "View Trucks", "Account Settings"]

    // use adminLinks if isAdmin is true, use driverLinks otherwise
    let linksToUse = user.isAdmin ? adminLinks : driverLinks

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

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='m-auto'>

                            {/*Allows for Nav bar links to work
                       Just an idea that I was working on - Justin
                    */}

                            
                    {user.isAdmin ? (

                            <React.Fragment>

                            <Nav.Link href="./JobViewer" className={`d-none d-${expandBreakpoint}-block`}>View Jobs</Nav.Link>
                            <Nav.Link href="./JobViewer" className={`d-none d-${expandBreakpoint}-block`}>Add Job</Nav.Link>
                            <Nav.Link href="./JobViewer" className={`d-none d-${expandBreakpoint}-block`}>Edit Job</Nav.Link>
                            <Nav.Link href="./ManageUsers" className={`d-none d-${expandBreakpoint}-block`}>Manage Users</Nav.Link>
                            <Nav.Link href="#" className={`d-none d-${expandBreakpoint}-block`}>Account Settings</Nav.Link>

                            </React.Fragment>

                        ) : (

                            <React.Fragment>

                            <Nav.Link href="./JobViewer" className={`d-none d-${expandBreakpoint}-block`}>View Jobs</Nav.Link>
                            <Nav.Link href="#" className={`d-none d-${expandBreakpoint}-block`}>Edit Job</Nav.Link>
                            <Nav.Link href="#" className={`d-none d-${expandBreakpoint}-block`}>Account Settings</Nav.Link>

                            </React.Fragment>

                        )}
                                
                        

                            {/* loop through our array and create a <li> element for each item */}

                            {/*linksToUse.map((link) => (
                                <Nav.Link>{link}</Nav.Link>
                            ))*/}



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
