import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

function Logout() {
  Cookies.remove("jwt");
}

const Navbar = ({ firstName, lastName, height, weight }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container-fluid">
        <h2 className="ms-5">
          {firstName} {lastName}
        </h2>
        <div class="collapse navbar-collapse">
          <h5 className="ms-5">Waga</h5>
          <h3 className="ms-2">{weight}kg</h3>
          <button className="btn btn-danger ms-2">Zmień</button>
          <h5 className="ms-5">Wzrost</h5>
          <h3 className="ms-2">{height}cm</h3>
          <button className="btn btn-danger ms-2">Zmień</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
