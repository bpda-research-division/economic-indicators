import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { List } from "react-bootstrap-icons";


function OffcanvasNav() {
  const [nav, setNav] = useState(false);

  const handleClose = () => setNav(false);
  const handleShow = () => setNav(true);

  return (
    <div classname="navContainer">
      <Button variant="btn-primary" onClick={handleShow} className="navbar-toggler" >
        <List size={45}/>
      </Button>

      <Offcanvas show={nav} onHide={handleClose} placement="start" tabindex="-1" id="offcanvasNavbar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/labor-market" className="flex-column" variant="tabs">
            <ul class="list-unstyled row justify-content-start">
                <li className="nav-heading">Citywide Overview</li>
                <ul class="list-unstyled">
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/labor-market">Labor Market</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/mobility">Mobility</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/economic-activity">Economic Activity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/real-estate-market">Real Estate Market</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/real-estate-development">Real Estate Development</Nav.Link>
                    </Nav.Item>
                </ul>
                <li className="nav-heading">Commercial Hubs</li>
                <ul class="list-unstyled">
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/back-bay">Back Bay</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/fenway-longwood">Fenway Longwood</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/greater-downtown">Greater Downtown</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/south-boston-waterfront">South Boston Waterfront</Nav.Link>
                    </Nav.Item>
                </ul>
                <li className="nav-heading">Annual Snapshot</li>
                <ul class="list-unstyled">
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/population">Population</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/economy">Economy</Nav.Link>
                    </Nav.Item>
                </ul>
            </ul>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </ div>
  );
}

export default OffcanvasNav;
