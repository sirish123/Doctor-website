import React from "react";
// import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
const MainNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container w-100 pe-2">
        <a className="navbar-brand" href="/#">
          Demo Application
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
              <a className="nav-link" id="bookings" href="/book">
                Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="searchHistory" href="/history">
                Search History
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" id="searchHistory" href="/getprice">
                Treatments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="searchHistory" href="/revenue">
                Revenue
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
