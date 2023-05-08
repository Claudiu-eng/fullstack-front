import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  let navigate = useNavigate(0);

  const [alert, setAlert] = useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    numberOfTelephone: "",
    email: "",
    password: "",
    address: {
      city: "",
      street: "",
      number: "",
    },
  });

  const { firstName, email, lastName, numberOfTelephone, password, address } =
    user;

  const handleExitAlert = () => {
    setAlert(false);
  };

  const cancel = (e) => {
    navigate("/");
  };

  const onInputChangeUser = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "street" || name === "number") {
      setUser((prevUser) => ({
        ...prevUser,
        address: { ...prevUser.address, [name]: value },
      }));
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post(
      "http://localhost:8070/logIn/register_customer",
      user
    );
    
    if (response.data) navigate("/");
    else {
      setAlert(true);
      setUser({
        firstName: "",
        lastName: "",
        numberOfTelephone: "",
        email: "",
        password: "",
        address: {
          city: "",
          street: "",
          number: "",
        },
      });
    }
  }catch(error){
    console.log(error);
    setErrorMessage(error.response.data.message);
    setAlert(true);
  }
  };



  return (
    <div className="container">
      <>
        {alert ? (
          <div className="alert alert-secondary" role="alert">
            {errorMessage}
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

      <div className="row">
        <div
          id="screen"
          className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
        >
          <h2 className="text-center m-4">Register User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter First Name"
                name="firstName"
                minLength="1"
                maxLength="35"
                required
                value={firstName}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Name" className="form-label">
                Last Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Last Name"
                name="lastName"
                minLength="1"
                maxLength="35"
                required
                value={lastName}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                // type={"email"}
                type={"Name"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChangeUser(e)}
              ></input>
            </div>
            <label htmlFor="Name" className="form-label">
              City
            </label>
            <input
              type={"text"}
              className="form-control"
              // minLength="3"
              // maxLength="30"
              // pattern="^[a-zA-Z\s]*$"
              title="Must contain only letters"
              required
              placeholder="Enter City"
              name="city"
              value={address.city}
              onChange={(e) => onInputChangeUser(e)}
            ></input>
            <label htmlFor="Name" className="form-label">
              Street
            </label>
            <input
              type={"text"}
              className="form-control"
              minLength="1"
              maxLength="50"
              required
              placeholder="Enter street"
              name="street"
              value={address.street}
              onChange={(e) => onInputChangeUser(e)}
            ></input>
            <label htmlFor="Name" className="form-label">
              Number of your home
            </label>
            <input
              type={"text"}
              minLength="1"
              maxLength="50"
              // pattern="^\d+$"
              title="Must contain only digits"
              required
              className="form-control"
              placeholder="Enter number of your home"
              name="number"
              value={address.number}
              onChange={(e) => onInputChangeUser(e)}
            ></input>
            <label htmlFor="Name" className="form-label">
              Number of telephone
            </label>
            <input
              type={"text"}
              minLength="0"
              maxLength="100"
              // pattern="0\d+$"
              title="Must contain only digits"
              required
              className="form-control"
              placeholder="Enter number of telephone"
              name="numberOfTelephone"
              value={numberOfTelephone}
              onChange={(e) => onInputChangeUser(e)}
            ></input>

            <button type="submit" id="button">
              Submit
            </button>
          </form>
          <button
            type="submit"
            id="button-cancel"
            onClick={(e) => {
              cancel(e);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
