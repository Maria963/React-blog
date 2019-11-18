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
  }
);



function getCompanies () {
  try {
          let res =  Auth.get(SERVER_URL+'/api/companies',
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
     let res =  axios.delete(SERVER_URL+'/api/companies/'+id, {
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


const login = async (data) => {
    const LOGIN_ENDPOINT = `${SERVER_URL}/api/login`;
    try {
        let response = await axios.post(LOGIN_ENDPOINT, data);
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


export { login, isAuth, SERVER_URL ,Auth, getCompanies, delCompany}