import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { List } from "react-bootstrap-icons";
import {
  useDeviceSize
} from "../useDeviceSize"


function OffcanvasNav() {
  const [nav, setNav] = useState(false);
  const [width, height] = useDeviceSize();
  const handleClose = () => setNav(false);
  const handleShow = () => setNav(true);

  return (
    <div className="navContainer">
      {/* <Button variant="btn-primary" onClick={handleShow} className="navbar-toggler" >
        <List size={45}/>
      </Button> */}
      <a onClick={handleShow} className="underlineButton">
        <List size={(height*0.025)+20}  className="navbar-toggler"/>
      </a>

      <Offcanvas show={nav} onHide={handleClose} placement="start" tabindex="-1" id="offcanvasNavbar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/labor-market" className="flex-column">
            <ul class="list-unstyled row justify-content-start">
                <li className="nav-heading"><h4>Citywide Overview</h4></li>
                <ul class="list-unstyled">
                    <Nav.Item as="li" className="underlineNav">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/labor-market" onClick={handleClose}>Labor Market</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/mobility" onClick={handleClose}>Mobility</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/economic-activity" onClick={handleClose}>Economic Activity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/real-estate-market" onClick={handleClose}>Real Estate Market</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/real-estate-development" onClick={handleClose}>Real Estate Development</Nav.Link>
                    </Nav.Item>
                </ul>
                <br />
                <li className="nav-heading"><h4>Commercial Hubs</h4></li>
                <ul class="list-unstyled">
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/back-bay" onClick={handleClose}>Back Bay</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/fenway-longwood" onClick={handleClose}>Fenway/Longwood</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/greater-downtown" onClick={handleClose}>Greater Downtown</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/south-boston-waterfront" onClick={handleClose}>South Boston Waterfront</Nav.Link>
                    </Nav.Item>
                </ul>
                <li className="nav-heading"><h4>Annual Snapshot</h4></li>
                <ul class="list-unstyled">
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/population" onClick={handleClose}>Population</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        {/* Bootstrap and React Router have different tags for nav links-- <Nav.Link> and <Link> respectively. Use react's render prop "as" to achieve both. */}
                        <Nav.Link as={Link} to="/economy" onClick={handleClose}>Economy</Nav.Link>
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
