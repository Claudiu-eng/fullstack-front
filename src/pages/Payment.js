import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  let navigate = useNavigate(0);

  const [alert, setAlert] = useState(false);
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

  

  const cancel = (e) => {
    navigate("/customer_page");
  };


  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      console.log(foundUser);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
 
  const onSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post(
      "http://localhost:8070/client_page/place_order/" + user.email
    );
    navigate("/customer_page");
  };

  return (
    <div className="container">
      <div className="row">
        <div
          id="screen"
          className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"
        >
          <h2 className="text-center m-4">Pay</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Number From Card
              </label>
              <input
                type="text"
                placeholder="Numar card"
                name="numarCard"
                minLength="16"
                maxLength="16"
                pattern="^\d+$"
                title="Must contain only digits"
                required
              />
              <label htmlFor="Name" className="form-label">
                Name card
              </label>
              <input
                type="text"
                placeholder="Nume detinator"
                name="numeDetinator"
                minLength="8"
                maxLength="40"
                pattern="^[a-zA-Z\s]*$"
                title="Must contain only letters"
                required
              />
              <label htmlFor="Name" className="form-label">
                CVV
              </label>
              <input
                type="text"
                placeholder="Cod Securitate"
                name="CVV"
                minLength="3"
                maxLength="3"
                pattern="^\d+$"
                title="Must contain only digits"
                required
              />
              <label htmlFor="Name" className="form-label">
                Date
              </label>
              <input
                type="text"
                placeholder="Data expirarii(yyyy-mm)"
                name="dataExpirare"
                minLength="7"
                maxLength="7"
                pattern="([12]\d{3}-(0[1-9]|1[0-2]))"
                title="Formatul este (yyyy-mm)"
                required
              />
            </div>

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

export default Payment;
