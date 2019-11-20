import axios from "axios";
const SERVER_URL = "http://127.0.0.1:8000";

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

function getCompanies() {
  let response = Auth.get(SERVER_URL + "/api/companies", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function delCompany(id) {
  let response = Auth.delete(SERVER_URL + "/api/companies/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function createCompanies(data) {
  let response = Auth.post(SERVER_URL + "/api/companies", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function editCompanies(id, data) {
  let response = Auth.post(SERVER_URL + "/api/companies/" + id, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function getCompany(id) {
  let response = Auth.get(SERVER_URL + "/api/companies/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function getEmployees() {
  let response = Auth.get(SERVER_URL + "/api/employees", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function delEmployee(id) {
  let response = Auth.delete(SERVER_URL + "/api/employees/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function createEmployees(data) {
  let response = Auth.post(SERVER_URL + "/api/employees", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function editEmployee(id, data) {
  let response = Auth.post(SERVER_URL + "/api/employees/" + id, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function getEmployee(id) {
  let response = Auth.get(SERVER_URL + "/api/employees/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    }
  });
  return response;
}

function login(data) {
  let response = Auth.post(`${SERVER_URL}/api/login`, data);
  return response;
}

export default {
  login,
  SERVER_URL,
  Auth,
  getEmployee,
  editEmployee,
  createEmployees,
  delEmployee,
  getCompanies,
  delCompany,
  createCompanies,
  editCompanies,
  getEmployees,
  getCompany
};
