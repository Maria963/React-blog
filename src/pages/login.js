import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../utils/api";

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
            <form>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {error}
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
                <label>password: </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={this.onChangeCompaniesPassword}
                />
              </div>
              <button className="btn btn-primary" onClick={this.login}>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
