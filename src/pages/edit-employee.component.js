
import React, { Component } from 'react';
import axios from 'axios';
import {  SERVER_URL2 } from "../utils/JWTAuth.js";


class UpdateEmployee  extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            first_name: '',
            last_name: '',
            company_id: '',
            email: '',
            phone: '',
            errors: '',
            nameerror: '',
            lastnameerror: '',
            success: '',
            companies: []
          })
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
       
        console.log(this.props.match.params.id);
        axios.get(SERVER_URL2+'/api/employees/'+this.props.match.params.id, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({
                    first_name:  response.data.first_name == null ? '':  response.data.first_name ,
                    last_name: response.data.last_name== null ? '':  response.data.last_name ,
                    company_id: response.data.company_id== null ? '':  response.data.company_id ,
                    email:  response.data.email== null ? '':  response.data.email ,
                    phone:  response.data.phone==null ? '': response.data.phone
                })   
            },
)
            .catch(function (error) {
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
       
        console.log(window.localStorage.getItem('access_token'));
        e.preventDefault();
        const {first_name, last_name, company_id, email, phone}  = this.state;
        console.log(`Form submitted:`);

        const updateEmployee = {
            first_name,
            last_name,
            email,
            company_id,
            phone
        };



         axios.post( SERVER_URL2+'/api/employees/'+this.props.match.params.id, updateEmployee,{
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
         .then(res => 
            this.setState({
                success: 'Employee updated',
            }))
         .catch((error) => {
            this.setState({
               nameerror: error.response.data.errors.first_name,
               lastnameerror: error.response.data.errors.last_name
            })
        })
    }

    companiesList = () => {
        const { companies, company_id } = this.state;
        console.log(companies);
        return companies.map((company) => {
            return <option value={company.id} key={company.id} selected = { company_id == company.id ? 'selected' : ''}>{company.name}</option>
        })
    }

    render() {
        const {first_name, last_name, email, phone, nameerror, lastnameerror, success} = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3>Update New Employee</h3>
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
                        <select className="form-control" name="company_id" onChange={this.onChangeEmployeeCompany}>
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
                        <input type="submit" value="Update Employee" className="btn btn-primary" />
                    </div>
                    <div className="valid-feedback" style={{display: 'block'}}>
                        {success}
                     </div>
                </form>
            </div>
        )
    }
}

export default UpdateEmployee;