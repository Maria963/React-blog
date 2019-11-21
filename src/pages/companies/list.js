import React, { Component } from "react";
import { Link } from "react-router-dom";
import Api from "../../utils/api";

class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      success: ""
    };
  }

  async componentDidMount() {
    try {
      let response = await Api.getCompanies();
      if (response.status === 200) {
        this.setState({ companies: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  removeCompany = id => {
    const removeFav = this.state.companies.filter(company => company.id !== id);
    this.setState({
      companies: removeFav
    });
  };

  async deleteCompany(id) {
    this.removeCompany(id);
    try {
      let res = await Api.delCompany(id);
      if (res.status === 204) {
        this.setState({
          success: "Company deleted"
        });
      }
    } catch (error) {}
  }

  companyList = () => {
    return this.state.companies.map((currentcompany, i) => {
      return (
        <tr key={i}>
          <td>{currentcompany.name}</td>
          <td>{currentcompany.email}</td>
          <td>
            {" "}
            {currentcompany.logo ? (
              <img
                style={{ width: "50px" }}
                src={Api.SERVER_URL + "/storage/logos/" + currentcompany.logo}
                alt="img"
              />
            ) : (
              ""
            )}
          </td>
          <td>{currentcompany.website}</td>
          <td>
            <button style={{ marginRight: "10px" }}>
              {" "}
              <Link to={"/companies/" + currentcompany.id}>Edit</Link>
            </button>
            <button onClick={() => this.deleteCompany(currentcompany.id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { success } = this.state;
    return (
      <div>
        <div className="row">
          <h3>Company List</h3>
          <div className="navbar-item">
            <Link to="/create" className="nav-link">
              Create Companies
            </Link>
          </div>
        </div>
        <div className="valid-feedback" style={{ display: "block" }}>
          {success}
        </div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Logo</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.companyList()}</tbody>
        </table>
      </div>
    );
  }
}

export default CompaniesList;
