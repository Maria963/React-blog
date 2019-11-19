import axios from 'axios';
import { func } from 'prop-types';
const SERVER_URL = "http://127.0.0.1:8000"

const Auth = axios.create();


Auth.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    throw error;
  }
);



 function getCompanies () {
  try {
          let res =   Auth.get(SERVER_URL+'/api/companies',
          {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'application/json'
              }
          });
          return res;
      }
    catch (error) {
    console.error(error)
  }
    }

 function delCompany (id) {
   try {
     let res =  Auth.delete(SERVER_URL+'/api/companies/'+id, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  } );
   return res;
 }
   catch (error) {
    console.error(error)
  }
 }   

async function createCompanies (data) {
  try {
    let res = await Auth.post(SERVER_URL+'/api/companies', data,{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  })

  return res;
}
  catch (error) {
   return error.response;
 }
 }

 async function editCompanies (id,data) {
  try {
    let res =  await Auth.post(SERVER_URL+'/api/companies/'+id, data,{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  })
  return res;
}
  catch (error) {
   return error.response;
 }
 }


 async function getCompany (id) {
  try {
    let res =  await Auth.get(SERVER_URL+'/api/companies/'+id,{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  })
  return res;
}
  catch (error) {
   return error.response;
 }
 }




 function getEmployees () {
  try {
          let res =  Auth.get(SERVER_URL+'/api/employees',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
          })
          return res;
      }
    catch (error) {
      return error.response;
  }
    }


function delEmployee (id) {
  try {
    let res =  Auth.delete(SERVER_URL+'/api/employees/'+id,{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  })
  console.log(res);
   return res;
  }
  catch (error) {
    
}
}    


async function createEmployees (data) {
  try {
     let res = await Auth.post( SERVER_URL+'/api/employees', data, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  })

    return res; 
  }
  catch (error) {
    console.log('ddd', error.response)
    return error.response;
  }
}

async function editEmployee (id,data) {
  try {
    let res =  await Auth.post(SERVER_URL+'/api/employees/'+id, data,{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  })
  return res;
}
  catch (error) {
   return error.response;
 }
 }

 async function getEmployee (id) {
  try {
    let res =  await Auth.get(SERVER_URL+'/api/employees/'+id,{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
      }
  })
  return res;
}
  catch (error) {
   return error.response;
 }
 }




async function login (data) {
    const LOGIN_ENDPOINT = `${SERVER_URL}/api/login`;
    try {
        let response = await Auth.post(LOGIN_ENDPOINT, data);
         console.log(response)
      //  if(response.status === 200 && response.data.remember_token && response.data.expireAt){
        if(response.status === 200 && response.data.success===true){
            let jwt = response.data.token;
          //  let expire_at = response.data.expireAt;
          localStorage.setItem("access_token", jwt);
         
        } 
        return response.data.success;

    } catch(e){
        console.log(e);
    }
}



/*
const register = async (data) => {
    const SIGNUP_ENDPOINT = `${SERVER_URL}/api/user/register`;
    try {
        let response = await axios({
            method: 'post',
            responseType: 'json',
            url: SIGNUP_ENDPOINT,
            data: data
          });
    } catch(e){
        console.log(e);
    }
}*/
/*
const logout = (props) => {
    localStorage.removeItem("access_token");
    props.history.push('/login');
   // localStorage.removeItem("expire_at");
}
*/

const isAuth = () => {
    console.log(localStorage.getItem('access_token'));
    if (localStorage.getItem('access_token')==null) {
        return false;
    }
   return true;
}


export { login, isAuth, SERVER_URL ,Auth, getEmployee, editEmployee, createEmployees ,delEmployee, getCompanies, delCompany,createCompanies, editCompanies,getEmployees, getCompany}