import React, { Component } from "react";
import Api from "../../utils/api";
import Input from "../../components/basic/input-button";
import Submit from "../../components/basic/submit-button";
import Errors from "../../components/basic/errors";
import Success from "../../components/basic/success";

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
    } catch (error) {}
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
          <Errors name={nameerror} />
          <Input
            name="Name:"
            type="text"
            value={name}
            changeFunction={this.onChangeCompaniesName}
          />
          <Input
            name="Email:"
            type="email"
            value={email}
            changeFunction={this.onChangeCompaniesEmail}
          />
          <Input
            name="Logo:"
            type="file"
            logoname={logoname}
            changeFunction={this.onChangeCompaniesLogo}
          />
          <Input
            name="website:"
            type="text"
            value={website}
            changeFunction={this.onChangeCompaniesWebsite}
          />
          <Submit value="Update Company" />
          <Success name={success} />
        </form>
      </div>
    );
  }
}

export default EditCompanies;
