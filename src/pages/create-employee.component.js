
import React, { Component } from 'react';
import axios from 'axios';
import {  SERVER_URL2 } from "../utils/JWTAuth.js";


class CreateEmployee  extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            first_name: '',
            last_name: '',
            company_id: '',
            email: '',
            phone: '',
            companies: [],
            nameerror: '',
            lastnameerror: '',
            success: '',
        }
    }

    componentDidMount() {
        axios.get(SERVER_URL2+'/api/companies',{
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({ companies: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onChangeEmployeeFirstname = (e) => {
        this.setState({
            first_name: e.target.value, success: '', nameerror: '',
        });
    }

    onChangeEmployeeLastname = (e) => {
        this.setState({
            last_name: e.target.value, success: '',  lastnameerror: '',
        });
    }

    onChangeEmployeeEmail = (e) => {
        this.setState({
            email: e.target.value, success: ''
        });
    }

    onChangeEmployeePhone = (e) => {
        this.setState({
            phone: e.target.value, success: ''
        });
    }

    onChangeEmployeeCompany = (e) => {
        this.setState({
            company_id: e.target.value, success: ''
        });
    }


    onSubmit = (e) => {
       
     //   console.log(window.localStorage.getItem('access_token'));
        e.preventDefault();
        const {first_name, last_name, company_id, email, phone}  = this.state;
        console.log(`Form submitted:`);
     

       const newEmployee = {
            first_name,
            last_name,
            email,
            company_id,
            phone
        };

        console.log(newEmployee);


         axios.post( SERVER_URL2+'/api/employees', newEmployee)
         .then(res => 
            this.setState({
                success: 'Employee created',
            }))
        .catch((error) => {
            this.setState({
                nameerror: error.response.data.errors.first_name,
                lastnameerror: error.response.data.errors.last_name
            })
        })
        
          this.setState({
            first_name: '',
            last_name: '',
            company_id: '',
            email: '',
            phone: '',
          })
    }


    companiesList = () => {
        const { companies } = this.state;
        return companies.map((company) => {
            return <option value={company.id} key={company.id}>{company.name}</option>
        })
    }

    render() {
        const {first_name, last_name, email, phone, nameerror, lastnameerror, success} = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Employee</h3>
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                <div className="invalid-feedback" style={{display: 'block'}}>
                        {nameerror} 
                        <br/> 
                        {lastnameerror}
                     </div>
                    <div className="form-group"> 
                        <label>Firstname: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={first_name}
                                onChange={this.onChangeEmployeeFirstname}
                                />
                    </div>
                    <div className="form-group">
                        <label>Lastname:</label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={last_name}
                                onChange={this.onChangeEmployeeLastname}
                                />
                    </div>

                    <div className="form-group">
                        <label>Company name</label>
                        <select className="form-control" name="company_id"  onChange={this.onChangeEmployeeCompany}>
                                 <option value=''>Choose Company</option>
                                  {this.companiesList()}
                        </select>
                    </div>


                    <div className="form-group">
                        <label>Email</label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={email}
                                onChange={this.onChangeEmployeeEmail}
                                />
                    </div>  
                    
                    <div className="form-group">
                        <label>Phone: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={phone}
                                onChange={this.onChangeEmployeePhone}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Employee" className="btn btn-primary" />
                    </div>
                    <div className="valid-feedback" style={{display: 'block'}}>
                        {success}
                     </div>
                </form>
            </div>
        )
    }
}

export default CreateEmployee;