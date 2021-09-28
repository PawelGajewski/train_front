import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Cookies from "js-cookie";

function Logout() {
  Cookies.remove("jwt");
}

const Navbar = ({ firstName, lastName, height }) => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-transparent fixed-left w-100 h-100 text-center">
      <ul className="nav nav-pills flex-column mb-auto w-75">
        <li className="nav-item bg-secondary mb-1 menu-hover">
          <Link className="nav-link text-white" to="/account">
            Start
          </Link>
        </li>
        <li className="nav-item bg-secondary mb-1 menu-hover">
          <a className="nav-link text-white" href="/sizes">
            Wymiary
          </a>
        </li>
        <li className="nav-item bg-secondary mb-1 menu-hover">
          <Link className="nav-link text-white" to="/achievments">
            Osiągnięcia
          </Link>
        </li>
        <li className="nav-item bg-secondary mb-1 menu-hover">
          <Link to="/" onClick={Logout} className="nav-link text-white">
            Wyloguj
          </Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Navbar;
