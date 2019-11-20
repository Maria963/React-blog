import React, { Component } from "react";
import Api from "../../utils/api";

class CreateCompanies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      logo: "",
      website: "",
      errors: "",
      nameerror: "",
      success: "",
      inputKey: Date.now()
    };
  }

  onChangeCompaniesName = e => {
    this.setState({
      name: e.target.value,
      nameerror: "",
      success: ""
    });
  };

  onChangeCompaniesEmail = e => {
    this.setState({
      email: e.target.value,
      success: ""
    });
  };

  onChangeCompaniesLogo = e => {
    this.setState({
      logo: e.target.files[0],
      success: ""
    });
  };

  onChangeCompaniesWebsite = e => {
    this.setState({
      website: e.target.value,
      success: ""
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { name, email, logo, website } = this.state;
    const newCompanies = new FormData();
    newCompanies.append("name", name);
    newCompanies.append("email", email);
    newCompanies.append("logo", logo);
    newCompanies.append("website", website);

    try {
      let response = await Api.createCompanies(newCompanies);
      if (response.status === 201) {
        this.setState({
          success: "Company added",
          name: "",
          email: "",
          logo: "",
          website: "",
          inputKey: Date.now()
        });
      }
    } catch (error) {
      this.setState({
        errors: error.response.data.message,
        nameerror: error.response.data.errors.name
      });
    }
  };

  render() {
    const { email, name, website, success, nameerror, inputKey } = this.state;
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Company</h3>
        <form encType="multipart/form-data" onSubmit={this.onSubmit}>
          <div className="invalid-feedback" style={{ display: "block" }}>
            {nameerror}
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={this.onChangeCompaniesName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={this.onChangeCompaniesEmail}
            />
          </div>

          <div className="form-group">
            <label>Logo: </label>
            <input
              type="file"
              className="form-control"
              key={inputKey}
              onChange={this.onChangeCompaniesLogo}
            />
          </div>

          <div className="form-group">
            <label>Website: </label>
            <input
              type="text"
              className="form-control"
              value={website}
              onChange={this.onChangeCompaniesWebsite}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Company"
              className="btn btn-primary"
            />
          </div>
          <div className="valid-feedback" style={{ display: "block" }}>
            {success}
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCompanies;
