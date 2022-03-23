import axios from "axios";
import setAuthToken from "./setAuthToken";
// import { browserHistory } from "react-router-dom";
import { toast } from "react-toastify";
// Create an instance of axios

const token = localStorage.getItem("token");
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});
/*
NOTE: intercept any error responses from the api
and check if the token is no longer valid.
ie. Token has expired or user is no longer
authenticated.
logout the user if the token has expired
*/

let authTokenRequest;

// This function makes a call to get the auth token
// or it returns the same promise as an in-progress call to get the auth token
const reqLogin = async () => {
  const res = await api.post("/login", {
    username: "asep.user",
    password: "User@123",
  });
  return res;
};

function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = reqLogin();
    console.log("do some get auth token");
    toast.error("401 woiii");

    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

api.interceptors.response.use(undefined, (err) => {
  const error = err.response;
  if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
    return getAuthToken().then((response) => {
      if (response) {
        setAuthToken(response.data.auth_token);
        console.log("localStorage.token", localStorage.token);
        if (localStorage.token) {
          error.config.__isRetryRequest = true;
        }
        return axios(error.config);
      }
    });
  }
});

export default api;
