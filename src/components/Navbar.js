import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">TodoApp</div>
          <NavLink to="/" className="nav-link active" aria-current="page">
            || Home ||*
          </NavLink>{" "}
          <NavLink to="/task" className="nav-link active" aria-current="page">
            || CreateTask ||*
          </NavLink>
          <NavLink to="/task/all" className="nav-link active" aria-current="page">
            || MyAllTask ||
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
