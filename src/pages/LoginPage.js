import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import CreateCompanies from "./pages/create-companies.component";
//import CompaniesList from "./pages/companies-list.component";
import { login } from "../utils/JWTAuth.js";
//import EditTodo from "./components/edit-todo.component";
//import TodosList from "./components/todos-list.component";
//import logo from './logo.svg';




class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
    }
} 

onChangeCompaniesEmail = (e) => {
  this.setState({
      email: e.target.value
  });
}


onChangeCompaniesPassword = (e) => {
  this.setState({
      password: e.target.value
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
   
    if(res==='ok'){
       // this.setState({ redirect: true});
       console.log(window.localStorage.getItem('access_token'));
       this.props.history.push('/home');
      
    } else{
      console.log(res)
    }
    // console.log(window.localStorage.getItem('access_token'));
    // console.log(token);

  }



  render() {
    const {email,password} = this.state;
  return (
    <div className="container">
       <h1>Login</h1>
    <div className="row">
      <div>
      <form>
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