//import config from 'config';
import { handleResponse } from '../helpers/handle-response';
import { authHeader } from '../helpers/auth-header';
export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
  //  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}