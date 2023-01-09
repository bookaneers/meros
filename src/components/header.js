// import dependencies and libraries
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

// build component
const Header = () => {
    return(
        <div className="container">

            {/* page title */}
            <Navbar>
                <Navbar.Brand>μέρος (meros)</Navbar.Brand>
            </Navbar>

            {/* page navigation bar */}
            <Nav className="justify-content-center">
                <Nav.Item>
                    {/* links to diferent pages */}
                    <LinkContainer to="/listparts">
                        <Nav.Link>
                            <Button className='nav-button'>List parts</Button>
                        </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/addparts">
                        <Nav.Link>
                            <Button className='nav-button'>Add parts</Button>
                        </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/updateparts">
                        <Nav.Link>
                            <Button className='nav-button'>Update parts</Button>
                        </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/deleteparts">
                        <Nav.Link>
                            <Button className='nav-button'>Delete parts</Button>
                        </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        </div>
    )
}

// export component
export default Header;
