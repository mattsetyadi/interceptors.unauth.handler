import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Fecth from "./pages/Fecth";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

// import setAuthToken from "./config/setAuthToken";
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   // check for token in LS when app first runs
  //   if (localStorage.token) {
  //     // if there is a token set axios headers for all requests
  //     console.log("use effect app run");
  //     setAuthToken(localStorage.token);
  //     console.log("localStorage.token", localStorage.token);
  //   }
  // }, []);
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Router>
          <>
            <Link to="/">Home</Link>
            <Link to="/fetching">Fetching</Link>
          </>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/fetching" element={<Fecth />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
