
import React, { Component } from 'react';
import axios from 'axios';
import {  SERVER_URL } from "../utils/JWTAuth.js";

class EditCompanies extends Component {
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
            
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
       //const { handle } = this.props.match.params.id
        axios.get(SERVER_URL+'/api/companies/'+this.props.match.params.id,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({
                    name:  response.data.name == null ? '':  response.data.name ,
                    email: response.data.email== null ? '':  response.data.email ,
                    logo: response.data.logo== null ? '':  response.data.logo ,
                    website:  response.data.website== null ? '':  response.data.website ,
                })   
            },
)
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeCompaniesName = (e) => {
        this.setState({
            name: e.target.value, nameerror: '', success: ''
        });
    }

    onChangeCompaniesEmail = (e) => {
        this.setState({
            email: e.target.value, success: ''
        });
    }

    onChangeCompaniesLogo = (e) => {
        this.setState({
            logo: e.target.files[0], success: ''
        });
    }

    onChangeCompaniesWebsite = (e) => {
        this.setState({
            website: e.target.value, success: ''
        });
    }

    onSubmit = (e) =>  {
        e.preventDefault();
        const { name, email,logo, website }  = this.state;
        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Email: ${this.state.email}`);
        console.log(`Logo: ${this.state.logo}`);
        console.log(`Website: ${this.state.website}`);

        const updateCompanies = new FormData();
        updateCompanies.append('name', name);
        updateCompanies.append('email', email);
        updateCompanies.append('logo', logo);
        updateCompanies.append('website', website);

        console.log(updateCompanies);
        axios.post(SERVER_URL+'/api/companies/'+this.props.match.params.id, updateCompanies,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => 
                this.setState({
                    success: 'Company updated',
                }))
            .catch((error) => {
                this.setState({
                   nameerror: error.response.data.errors.name,
                })
            })
       //this.props.history.push('/companies');
    }


    render() {
        const {email, name, website, success, nameerror} = this.state;
        return (
            <div>
            <h3 align="center">Update Company</h3>
            <form onSubmit={this.onSubmit}>
            <div className="invalid-feedback" style={{display: 'block'}}>
                        {nameerror}
                     </div>
                <div className="form-group"> 
                    <label>Name: </label>
                    <input  type="text"
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
                    <input type="submit" value="Update Company" className="btn btn-primary" />
                </div>
                <div className="valid-feedback" style={{display: 'block'}}>
                        {success}
                     </div>
            </form>
        </div>
        )
    }
    
}

export default EditCompanies;
        