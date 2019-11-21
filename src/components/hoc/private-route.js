import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAuth from "../../utils/auth";
import Header from "../header";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuth()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      // authorised so return component
      return (
        <div>
          <Header {...props} />
          <Component {...props} />
        </div>
      );
    }}
  />
);
