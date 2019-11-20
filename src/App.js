import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import CompaniesList from "./pages/companies/list";
import CreateCompanies from "./pages/companies/create";
import EditCompanies from "./pages/companies/edit";
import UpdateEmployee from "./pages/employees/edit";
import EmployeesList from "./pages/employees/list";
import CreateEmployee from "./pages/employees/create";
import { PrivateRoute } from "./components/hoc/private-route";
import "./App.css";

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
          <PrivateRoute path="/companies/:id" component={EditCompanies} />
          <PrivateRoute
            path="/createemployee"
            exact
            component={CreateEmployee}
          />
          <PrivateRoute path="/employees" exact component={EmployeesList} />
          <PrivateRoute path="/employees/:id" component={UpdateEmployee} />
        </div>
      </Router>
    );
  }
}

export default App;
