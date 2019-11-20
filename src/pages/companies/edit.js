import React, { Component } from "react";
import Api from "../../utils/api";

class EditCompanies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      logo: "",
      logoname: "",
      website: "",
      errors: "",
      nameerror: "",
      success: ""
    };
  }

  async componentDidMount() {
    let company_id = this.props.match.params.id;
    try {
      let response = await Api.getCompany(company_id);
      if (response.status === 200) {
        this.setState({
          name: response.data.name == null ? "" : response.data.name,
          email: response.data.email == null ? "" : response.data.email,
          logoname:
            response.data.logo == null
              ? ""
              : Api.SERVER_URL + "/storage/logos/" + response.data.logo,
          website: response.data.website == null ? "" : response.data.website
        });
      }
    } catch (error) {
      console.log(error);
    }
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
      success: "",
      logoname: ""
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
    let company_id = this.props.match.params.id;
    const updateCompanies = new FormData();
    updateCompanies.append("name", name);
    updateCompanies.append("email", email);
    updateCompanies.append("logo", logo);
    updateCompanies.append("website", website);

    try {
      let response = await Api.editCompanies(company_id, updateCompanies);
      if (response.status === 200) {
        this.setState({
          success: response.data
        });
      }
    } catch (error) {
      this.setState({
        nameerror: error.response.data.errors.name
      });
    }
  };

  render() {
    const { email, name, website, success, logoname, nameerror } = this.state;
    return (
      <div>
        <h3 align="center">Update Company</h3>
        <form onSubmit={this.onSubmit}>
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
            {logoname !== "" ? (
              <img style={{ width: "50px" }} src={logoname} alt="img" />
            ) : (
              ""
            )}
            <input
              type="file"
              className="form-control"
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
              value="Update Company"
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

export default EditCompanies;
