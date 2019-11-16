import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {  SERVER_URL } from "../utils/JWTAuth.js";


 class CompaniesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            success: ''
        };

    }

    componentDidMount() {

        axios.get(SERVER_URL+'/api/companies',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        }
            )
            .then(response => {
                this.setState({ companies: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    removeCompany = (id) => {
        console.log(id);
        const removeFav = this.state.companies.filter(company => company.id !== id ) 
        console.log(removeFav);
        this.setState({
            companies: removeFav
        })
      }

    deleteCompany = (id) =>  {
        this.removeCompany(id);
            axios.delete(SERVER_URL+'/api/companies/'+id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            } )
            .then((res) =>  this.setState({
                success: 'Company deleted succesfully',
            }))
            }


    companyList = () => {
        
        return this.state.companies.map((currentcompany, i)=> {
            return  <tr key={i} >
            <td>{currentcompany.name}</td>
            <td>{currentcompany.email}</td>
            <td>  {currentcompany.logo ? (
      <img style={{width: '50px'}} src = {SERVER_URL+'/storage/logos/'+currentcompany.logo} alt='img' />
      ) : ''} 
      </td>
            <td>{currentcompany.website}</td>
            <td>
               <button style={{marginRight: '10px'}}> <Link to={"/companies/"+currentcompany.id}>Edit</Link></button>
                <button onClick={()=>this.deleteCompany(currentcompany.id)}>Delete</button>
            </td>
        </tr>
        })
    }

    render() {
        const  {success} = this.state;
        return (
            <div>
                <div className="row">
                    <h3>Company List</h3>
                    <div className="navbar-item">
                    <Link to="/create" className="nav-link">Create Companies</Link>
                    </div> 
                </div>
                <div className="valid-feedback" style={{display: 'block'}}>
                    {success}
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Logo</th>
                            <th>Website</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.companyList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CompaniesList;