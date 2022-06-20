import React from "react";
// import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
const MainNavbar = () => {
  return (
    // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //   <Navbar.Brand classNameName="p-2" href="#home">
    //     Nature Wellness Center
    //   </Navbar.Brand>
    //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //   <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav classNameName="me-auto">
    //       <NavDropdown title="Prices" id="collasible-nav-dropdown">
    //         <NavDropdown.Item href="#action/3.1">
    //           Update/Delete Treatments
    //         </NavDropdown.Item>
    //         <NavDropdown.Item href="#action/3.1">
    //           Add Treatments
    //         </NavDropdown.Item>
    //       </NavDropdown>
    //     </Nav>

    //     <Nav>
    //       <Nav.Link href="/">Active Appointments</Nav.Link>
    //       <Nav.Link href="/book">Book Appointment</Nav.Link>
    //       <Nav.Link href="/history">Search History</Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>

    <nav className="navbar navbar-expand-lg shadow">
      <div className="container w-100 pe-2">
        <a className="navbar-brand" href="appointments.html">
          Nature Wellness Center
        </a>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLinks"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarLinks">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" id="appointments" href="/">
                Active Appointments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="searchHistory" href="/history">
                Search History
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="bookings" href="/book">
                Book
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" id="searchHistory" href="/getprice">
                Treatments
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
