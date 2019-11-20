import React, { Component } from "react";
import { Link } from "react-router-dom";
import Api from "../../utils/api";

class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      error: "",
      success: ""
    };
  }

  async componentDidMount() {
    try {
      let response = await Api.getEmployees();
      if (response.status === 200) {
        this.setState({ employees: response.data });
      } else {
        this.setState({
          error: response.data.error
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  removeEmployee = id => {
    console.log(id);
    const removeFav = this.state.employees.filter(
      employee => employee.id !== id
    );
    console.log(removeFav);
    this.setState({
      employees: removeFav
    });
  };

  deleteEmployee = async id => {
    this.removeEmployee(id);
    try {
      let response = await Api.delEmployee(id);
      if (response.status === 204) {
        this.setState({
          success: "Employee deleted"
        });
      } else {
        this.setState({
          error: response.data.error
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  employeesList() {
    return this.state.employees.map((currentemployee, i) => {
      return (
        <tr key={i}>
          <td>{currentemployee.first_name}</td>
          <td>{currentemployee.last_name}</td>
          <td>{currentemployee.company_id}</td>
          <td>{currentemployee.email}</td>
          <td>{currentemployee.phone}</td>
          <td>
            <button style={{ marginRight: "10px" }}>
              {" "}
              <Link to={"/employees/" + currentemployee.id}>Edit</Link>
            </button>
            <button onClick={() => this.deleteEmployee(currentemployee.id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { success } = this.state;
    return (
      <div>
        <div className="row">
          <h3>Employees List</h3>
          <div className="navbar-item">
            <Link to="createemployee" className="nav-link">
              Create Employee
            </Link>
          </div>
        </div>
        <div className="valid-feedback" style={{ display: "block" }}>
          {success}
        </div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>firstname</th>
              <th>lastname</th>
              <th>company</th>
              <th>email</th>
              <th>phone</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>{this.employeesList()}</tbody>
        </table>
      </div>
    );
  }
}

export default EmployeesList;
