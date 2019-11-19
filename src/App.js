import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import  LoginPage  from './pages/LoginPage';
import  HomePage  from './pages/HomePage';
import  CompaniesList  from './pages/companies-list.component';
import CreateCompanies from './pages/create-companies.component';
import EditCompanies from './pages/edit-companies.component';
import UpdateEmployee from './pages/edit-employee.component';
import EmployeesList from './pages/employee-list.component';
import CreateEmployee from './pages/create-employee.component';
import { PrivateRoute } from './components/PrivateRoute';
import './App.css';


class App extends Component {
    render() {
        return (
          <Router>
          <div className="container">
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
