import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../utils/JWTAuth.js";



class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        error: ''
    }
} 

onChangeCompaniesEmail = (e) => {
  this.setState({
      email: e.target.value,  error: ''
  });
}


onChangeCompaniesPassword = (e) => {
  this.setState({
      password: e.target.value,  error: ''
  });
}


   login = async (e) => {
    e.preventDefault();
     console.log(this.state.email);
     let info = {
      email: this.state.email,
      password: this.state.password
    };
    let res  = await login(info);
    console.log(res);
    if(res===true){
       this.props.history.push('/home');
    } else {
      this.setState({
        error: 'Invalid email or password'
    });
    }
  }



  render() {
    const {email,password, error} = this.state;
  return (
    <div className="container">
       <h1>Login</h1>
    <div className="row">
      <div>
      <form>
      <div className="invalid-feedback" style={{display: 'block'}}>{error}</div>
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
        <button className="btn btn-primary"  onClick = { this.login }>Sign In</button>
      </form>
      </div> 
    </div>
    </div>
    
  );
}}


export default  LoginPage;