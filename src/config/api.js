import axios from "axios";
import setAuthToken from "./setAuthToken";
// import { browserHistory } from "react-router-dom";
import { toast } from "react-toastify";
// Create an instance of axios

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
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
  toast.info("Sedang renew token");
  const res = await api.post(`Token/refresh/${refreshToken}`, `"${token}"`);
  console.log("res refresh", res);
  return res;
};

function getAuthToken() {
  if (!authTokenRequest) {
    toast.error("401 woiii");
    authTokenRequest = reqLogin();

    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

api.interceptors.response.use(undefined, (err) => {
  const error = err.response;
  console.log("err messg", error);
  if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
    return getAuthToken().then((response) => {
      // if (response) {
      // localStorage.setItem("token", response.data.auth_token);
      setAuthToken(response.data.token, response.data.tokenRefresh);
      toast.success("renew berhasil");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      error.headers["Authorization"] = "Bearer " + response.data.token;
      error.config.__isRetryRequest = true;
      toast.success("Sedang mengulangi request yang tertunda");
      return axios(error.config);
      // }
    });
    // const resolvedRes = async () => {
    //   const res = await getAuthToken();
    //   console.log("res in async", res);
    //   setAuthToken(res.data.auth_token);
    //   console.log("localStorage.token", localStorage.token);
    //   error.config.__isRetryRequest = true;
    //   return axios(error.config);
    // };
    // return resolvedRes();
  }
});

export default api;
