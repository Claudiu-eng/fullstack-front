import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Application
          </a>
        </div>

        <Link className="btn btn-outline-light" to="addUser">
          Add User
        </Link>
      </nav>
    </div>
  );
}
