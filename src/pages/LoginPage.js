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










































/*import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../services/authentication.service';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export { LoginPage };*/