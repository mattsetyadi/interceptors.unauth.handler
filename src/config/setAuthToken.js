// import api from "./api";

const setAuthToken = (token, refreshToken) => {
  if (token && refreshToken) {
    // Uncomment this for implement inreal app
    // api.defaults.headers.common["Authorization"] = `bearer ${token}`;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    // Uncomment this for implement inreal app
    // delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
};

export default setAuthToken;
