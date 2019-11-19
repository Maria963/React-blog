
import React, { Component } from 'react';
import { getCompanies , createEmployees} from "../utils/JWTAuth.js";


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

   async  componentDidMount() {
    try {
        let res = await getCompanies ();
        console.log(res);
        if (res.status===200) {
            this.setState({ companies: res.data }); }
       
        else {
          this.setState({
              errors: res.data.message,
              nameerror: res.data.errors.name,
           })
        }
      }
      catch (error) {
          console.log(error);
      }
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


     onSubmit = async (e) => {
        e.preventDefault();
        const {first_name, last_name, company_id, email, phone}  = this.state; 
         const newEmployee = {
            first_name,
            last_name,
            email,
            company_id,
            phone
        };

        try {
            let response = await createEmployees(newEmployee);
          
            if (response.status===200) {
                this.setState({
                    success: 'Employee created',
                    first_name: '',
                    last_name: '',
                    company_id: '',
                    email: '',
                    phone: '',
                }); 
            }
           
            else {
                this.setState({
                    nameerror: response.data.errors.first_name,
                    lastnameerror: response.data.errors.last_name
                });
          }
        }
          catch (error) {
              console.log('ddsd',error);
          }
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