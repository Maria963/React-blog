import axios from 'axios';
const SERVER_URL = "http://127.0.0.1:8000"

const login = async (data) => {
    const LOGIN_ENDPOINT = `${SERVER_URL}/api/login`;
    console.log('ddd');
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


export { login, isAuth, SERVER_URL }