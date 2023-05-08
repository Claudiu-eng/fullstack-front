import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  let navigate = useNavigate(0);

  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleExitAlert = () => {
    setAlert(false);
  };

  const forgotPassword = () => {
    navigate("/reset_password");
  };

  const createAccount = () => {
    navigate("/register");
  };

  const onInputChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8070/logIn", user);
    if (response.data) {
      const { userRole } = response.data;

      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));

      if (userRole == "CUSTOMER") navigate("/customer_page");
      if (userRole == "ADMIN") navigate("/admin_page");
      if (userRole == "EMPLOYEE") navigate("/employee_page");
    } else {
      setAlert(true);
      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <div className="container">
        <>
          {alert ? (
            <div className="alert alert-primary" role="alert">
              Wrong credentials!!
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={handleExitAlert}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : null}
        </>

        <center>
          <div>
            <h2 id="title">HS Shopping</h2>
            <h5 id="subtitle">Converse About IT</h5>
          </div>

          <h1 id="bodymessage1">Log In</h1>
          <div id="line"></div>
          <input
            name="email"
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => onInputChangeUser(e)}
            required
          />
          <br />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => onInputChangeUser(e)}
            required
          />
          <br />
          <h4 id="forgetyourpassword" onClick={(e) => forgotPassword(e)}>
            Forgot your password?
          </h4>
          <h4 id="createAccount" onClick={(e) => createAccount(e)}>
            Create account!
          </h4>

          <button id="loginbutton" onClick={(e) => onSubmit(e)}>
            Log In
          </button>
          <div id="footer">
            <h4 id="footertitle">Monvos ©</h4>
            <h4 id="footercontent">
              Where Movie Buffs Can Converse About Cinema
              <br />
              Questions? Comments? Contact us at contact@monvos.org or call
              888-888-888
              <br />
              Founded in 2016
            </h4>
          </div>
        </center>
      </div>
    </>
  );
};

export default LogIn;
