import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  LoginPage  from './pages/LoginPage';
import  HomePage  from './pages/HomePage';
import  CompaniesList  from './pages/companies-list.component';
import CreateCompanies from './pages/create-companies.component';
import EditCompanies from './pages/edit-companies.component';
import UpdateEmployee from './pages/edit-employee.component';
import EmployeesList from './pages/employee-list.component';
import CreateEmployee from './pages/create-employee.component';
import {  logout, isAuth } from "./utils/JWTAuth.js";
import { PrivateRoute } from './components/PrivateRoute';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       isAdmin:  isAuth()
    };

}

  /*  logout = () => {
      logout();
    }*/

    render() {
        console.log(isAuth());
        return (
          <Router>
          <div className="container">
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/home" className="nav-link">Home</Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Companies</Link>
                  </li> 
                  <li className="navbar-item">
                    <Link to="/companies" className="nav-link">Companies</Link>
                  </li> 
                  <li className="navbar-item">
                    <Link to="createemployee" className="nav-link">Create Employee</Link>
                  </li> 
                  <li className="navbar-item">
                    <Link to="/employees" className="nav-link">Employee</Link>
                  </li> 
                  { console.log(isAuth(), isAdmin) }
                  {!isAuth()?  <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li> : '' }
                  {isAuth()?   <li className="navbar-item">
                    <Link to="/login" onClick={this.logout} className="nav-link">Logout</Link>
                  </li> : '' }                  
                </ul>
              </div>
            </nav> */}
            <br/>
            
            <Route path="/login" exact component={LoginPage} />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/home" component={HomePage} />
            <PrivateRoute path="/create" exact component={CreateCompanies} />
            <PrivateRoute path="/companies" exact component={CompaniesList} />
            <PrivateRoute path="/companies/:id"  component={EditCompanies} />
            <PrivateRoute path="/createemployee" exact component={CreateEmployee} />
            <PrivateRoute path="/employees" exact component={EmployeesList} />
            <PrivateRoute path="/employees/:id"  component={UpdateEmployee} />
            
          </div>
        </Router>
  
        );
   }
}
               

export default App;
