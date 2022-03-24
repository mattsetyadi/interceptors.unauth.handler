import React from "react";
import api from "../config/api";
import setAuthToken from "../config/setAuthToken";
import { toast } from "react-toastify";
import { useForm } from "../config/customHook";
const Home = () => {
  const { onSubmit, onChange, values } = useForm(loginAction, {
    username: "",
    password: "",
  });
  const logOutUser = async () => {
    const res = await api.post("/logout");
    console.log("res logoutx", res);
    if (res) {
      if (res.status === 200) {
        // localStorage.removeItem("token");
        setAuthToken(null, null);
        toast.success("sudah logout");
      } else {
        toast.error("logout gagal");
      }
    }
  };

  const loginUser = async () => {
    try {
      const { data } = await api.post("/Login", values);
      setAuthToken(data.token, data.tokenRefresh);
      toast.success("berhasil login");
    } catch (error) {
      console.log("err respon login", error.response);
    }
  };
  function loginAction() {
    loginUser();
  }
  return (
    <div>
      <h1>Home page</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" onChange={onChange} />
        <input type="text" name="password" onChange={onChange} />
        <button type="submit">Login</button>
      </form>
      <button onClick={logOutUser} style={{ cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
};

export default Home;
