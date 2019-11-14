import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {  SERVER_URL2 } from "../utils/JWTAuth.js";



 class EmployeesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            error: '',
            success: ''
        };
    }

    componentDidMount() {
        axios.get(SERVER_URL2+'/api/employees',{
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response =>   {
              this.setState({ employees: response.data });
        })
        .catch(err => {
            this.setState({
                error: err.response.data.error,
            })
        })
    }


    removeEmployee = (id) => {
        console.log(id);
        const removeFav = this.state.employees.filter(employee => employee.id != id ) 
        console.log(removeFav);
        this.setState({
            employees: removeFav
        })
      }


    deleteEmployee = (id) =>  {
        this.removeEmployee(id);
            axios.delete(SERVER_URL2+'/api/employees/'+id,{
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) =>  this.setState({
                success: 'Employee deleted succesfully',
            }))
    }

    employeesList() {
        return this.state.employees.map((currentemployee, i)=> {
            return  <tr key={i} >
            <td>{currentemployee.first_name}</td>
            <td>{currentemployee.last_name}</td>
            <td>{currentemployee.company_id}</td>
            <td>{currentemployee.email}</td>
            <td>{currentemployee.phone}</td>
            <td>
            <button style={{marginRight: '10px'}}>    <Link to={"/employees/"+currentemployee.id}>Edit</Link></button>
                <button onClick={()=>this.deleteEmployee(currentemployee.id)}>Delete</button>
            </td>
        </tr>
        })
    }


    render() {
        const  {success} = this.state;
        return (
            <div>
                <h3>Employees List</h3>
                
                <div className="valid-feedback" style={{display: 'block'}}>
                    {success}
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>company</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.employeesList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeesList;