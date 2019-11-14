import axios from 'axios';
const SERVER_URL = "http://127.0.0.1:8000";
const SERVER_URL2 = "http://127.0.0.1:8001"

const login = async (data) => {
    const LOGIN_ENDPOINT = `${SERVER_URL2}/api/login`;
    console.log('ddd');
    try {

        let response = await axios.post(LOGIN_ENDPOINT, data);
        console.log(response.data.success)
      //  if(response.status === 200 && response.data.remember_token && response.data.expireAt){
        if(response.status === 200 && response.data.success===true){
            let jwt = response.data.token;
          //  let expire_at = response.data.expireAt;
          localStorage.setItem("access_token", jwt);
    
          //  localStorage.setItem("expire_at", expire_at);
            return 'ok';
        }else {
            return response.data;
        }


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

const logout = () => {
    localStorage.removeItem("access_token");
   // localStorage.removeItem("expire_at");
}


export { login, logout, SERVER_URL, SERVER_URL2 }