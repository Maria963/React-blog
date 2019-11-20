import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  function logout() {
    console.log(props);
    localStorage.removeItem("access_token");
    props.history.push("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/home" className="nav-link">
        Home
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/companies" className="nav-link">
              Companies
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/employees" className="nav-link">
              Employee
            </Link>
          </li>
          <li className="navbar-item">
            <button onClick={logout} className="nav-link">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
