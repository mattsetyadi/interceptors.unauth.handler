import React from "react";
import api from "../config/api";
import { toast } from "react-toastify";
const Home = () => {
  const logOutUser = async () => {
    const res = await api.post("/logout");
    console.log("res logoutx", res);
    if (res) {
      if (res.status === 200) {
        localStorage.removeItem("token");
        toast.success("sudah logout");
      } else {
        toast.error("logout gagal");
      }
    }
  };
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={logOutUser} style={{ cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
};

export default Home;
