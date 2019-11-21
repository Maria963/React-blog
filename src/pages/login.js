import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../utils/api";
import Input from "../components/basic/input-button";
import Submit from "../components/basic/submit-button";
import Errors from "../components/basic/errors";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  onChangeCompaniesEmail = e => {
    this.setState({
      email: e.target.value,
      error: ""
    });
  };

  onChangeCompaniesPassword = e => {
    this.setState({
      password: e.target.value,
      error: ""
    });
  };

  login = async e => {
    e.preventDefault();
    let info = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      let response = await Api.login(info);
      if (response.status === 200) {
        let jwt = response.data.token;
        localStorage.setItem("access_token", jwt);
        this.props.history.push("/home");
      } else {
      }
    } catch (error) {
      this.setState({
        error: error.response.data.message
      });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="container">
        <h1>Login</h1>
        <div className="row">
          <div>
            <form onSubmit={this.login}>
              <Errors name={error} />
              <Input
                name="Email:"
                type="email"
                value={email}
                changeFunction={this.onChangeCompaniesEmail}
              />
              <Input
                name="password:"
                type="password"
                value={password}
                changeFunction={this.onChangeCompaniesPassword}
              />
              <Submit value="Sign in" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
