import React, { Component } from 'react';

//import { authenticationService } from '../services/authentication.service';
//import { userService } from '../services/user.service';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
     
    }

    render() {
       
        return (
            <div>
                <h1>Hi </h1>
                <p>You're logged in with React & JWT!!</p>
            </div>
        );
    }
}

export default HomePage;