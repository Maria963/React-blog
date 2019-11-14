import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect  } from "react-router-dom";
import  LoginPage  from './pages/LoginPage';
import  HomePage  from './pages/HomePage';
import  CompaniesList  from './pages/companies-list.component';
import CreateCompanies from './pages/create-companies.component';
import EditCompanies from './pages/edit-companies.component';
import UpdateEmployee from './pages/edit-employee.component';
import EmployeesList from './pages/employee-list.component';
import CreateEmployee from './pages/create-employee.component';
import {  logout } from "./utils/JWTAuth.js";
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

    }

    logout = () => {
      logout();
      console.log(window.localStorage.getItem('access_token'));
    }

    render() {
      
        return (
          <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>   
                  <li className="navbar-item">
                    <Link to="/login" onClick={this.logout} className="nav-link">Logout</Link>
                  </li>                  
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
            <Route path="/" exact render = {()=> (
               window.localStorage.getItem('access_token')==null ? (
                <Redirect exact to ="/login"/>
               ): (
                 <Redirect exact to ="/home"/>
               )
             )} />
        
         
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/create" exact component={CreateCompanies} />
            <Route path="/companies" exact component={CompaniesList} />
            <Route path="/companies/:id"  component={EditCompanies} />
            <Route path="/createemployee" exact component={CreateEmployee} />
            <Route path="/employees" exact component={EmployeesList} />
            <Route path="/employees/:id"  component={UpdateEmployee} />
            </Switch>
          </div>
        </Router>
  
        );
   }
}
               

export default App;
