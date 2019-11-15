import React, { Component } from 'react';
import axios from 'axios';
import {  SERVER_URL } from "../utils/JWTAuth.js";

class CreateCompanies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            logo: '',
            website: '',
            errors: '',
            nameerror: '',
            success: '',
            inputKey: Date.now()
        }
    }

    onChangeCompaniesName = (e) => {
        this.setState({
            name: e.target.value,  nameerror: '',  success: ''
        });
    }

    onChangeCompaniesEmail = (e) => {
        this.setState({
            email: e.target.value, success: ''
        });
    }

    onChangeCompaniesLogo = (e) => {
        this.setState({
            logo: e.target.files[0],  success: ''
        });
    }

    onChangeCompaniesWebsite = (e) => {
        this.setState({
            website: e.target.value, success: ''
        });
    }

    onSubmit = (e) => {
        console.log(localStorage.getItem('access_token'));
        e.preventDefault();
        const { name, email,logo, website }  = this.state;
        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Logo: ${this.state.logo}`);
        console.log(`Website: ${this.state.website}`);

      /*  axios.get('http://127.0.0.1:8001/api/companies')
            .then(res => console.log(res.data));
*/
        
           const newCompanies = new FormData();
           newCompanies.append('name', name);
           newCompanies.append('email', email);
           newCompanies.append('logo', logo);
           newCompanies.append('website', website);
        
           console.log(newCompanies);
          /*let config = {
            headers: {'Authorization': "bearer " + localStorage.getItem('access_token')}
           };*/

        axios.post(SERVER_URL+'/api/companies', newCompanies,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
         .then(res => 
            this.setState({
                success: 'Company created',
                name: '',
                email: '',
                logo: '',
                website: '',
                inputKey: Date.now()
            })
         )
         .catch((error) => {
            this.setState({
               errors: error.response.data.message,
               nameerror: error.response.data.errors.name,
            })
                console.log(error.response);
            })    
    }

    render() {
        const {email, name, website, success, nameerror, inputKey } = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Company</h3>
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <div className="invalid-feedback" style={{display: 'block'}}>
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
                        <input type="submit" value="Create Company" className="btn btn-primary" />
                    </div>
                    <div className="valid-feedback" style={{display: 'block'}}>
                        {success}
                     </div>
                </form>
            </div>
        )
    }
}

export default CreateCompanies;