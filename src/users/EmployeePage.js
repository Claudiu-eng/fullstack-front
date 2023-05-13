import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerPage.css";

const EmployeePage = () => {
  const [seeProducts, setSeeProducts] = useState(false);
  let navigate = useNavigate(0);

  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [seeReviews, setSeeReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState(false);
  const [users, setUsers] = useState([]);
  const [seeOrderClient, setSeeOrderClient] = useState(false);
  const [seeClients, setSeeClients] = useState(false);
  const [productReviewed, setProductReviewed] = useState();
  const [emailSearched, setEmailSearched] = useState("");
  const [userSelected, setUserSelected] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "nu",
    numberOfTelephone: "",
    userType: "guest",
  });

  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserConected(foundUser);
      console.log(foundUser);
    }
  };

  const [userConnected, setUserConected] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "nu",
    password: "",
    userType: "guest",
  });

  const logOut = (e) => {
    const result = axios.post(
      "http://localhost:8070/logIn/logOut/" + userConnected.email
    );
    setUserConected({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userRole: "guest",
    });
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const seeOrders = async (user) => {
    const result = await axios.post(
      "http://localhost:8070/client_page/see_orders/" + user.email
    );
    setSeeOrderClient(true);
    setOrders(result.data);
    setUserSelected(user);
  };

  const loadClients = async () => {
    const result = await axios.get(
      "http://localhost:8070/client_page/see_clients"
    );
    setUsers(result.data);
  };

  const loadProducts = async () => {
    const result = await axios.get(
      "http://localhost:8070/product_page/see_products"
    );
    setProducts(result.data);
  };

  const deleteReview = async (review) => {
    await axios.delete(
      "http://localhost:8070/employee_page/delete_review/" +
        productReviewed.id +
        "/" +
        review.id
    );
    veziReview(productReviewed);
  };

  const veziReview = async (product) => {
    setSeeProducts(false);
    setSeeReviews(true);
    setSeeOrderClient(false);
    setSeeClients(false);
    setProductReviewed(product);
    const result = await axios.post(
      "http://localhost:8070/client_page/see_reviews/" + product.id
    );
    setReviews(result.data);
  };

  const rejectOrder = async (order) => {
    try {
      const result = await axios.put(
        "http://localhost:8070/client_page/reject_order/" + order.id+"/"+userSelected.email
      );

      // result = await axios.post(
      //   "http://localhost:8070/client_page/notify/" + order.id
      // );

      seeOrders(userSelected);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setAlert(true);
    }
  };

  const validateOrder = async (order) => {
    try {
      const result = await axios.put(
        "http://localhost:8070/client_page/validate_order/" + order.id+"/"+userSelected.email
      );

      // result = await axios.post(
      //   "http://localhost:8070/client_page/notify/" + order.id
      // );

      seeOrders(userSelected);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setAlert(true);
    }
  };

  const deleteProduct = async (product) => {
    const result = await axios.delete(
      "http://localhost:8070/product_page/delete_product/" + product.id
    );

    loadProducts();
  };

  const insertProduct = (e) => {
    navigate("/employee/insert_product");
  };

  const manageProducts = (e) => {
    e.preventDefault();
    setSeeProducts(true);
    setSeeOrderClient(false);
    setSeeClients(false);
    setSeeReviews(false);
    loadProducts();
  };

  const onInputChangeSearch = (e) => {
    const { name, value } = e.target;
    setEmailSearched(value);
  };

  const manageClients = (e) => {
    e.preventDefault();
    setSeeProducts(false);
    setSeeClients(true);
    setSeeOrderClient(false);
    setSeeReviews(false);
    loadClients();
  };

  const handleExitAlert = () => {
    setAlert(false);
  };

  return (
    <div className="container">
      <div>
        <header role="banner">
          <h1>Welcome</h1>
          <ul className="utilities">
            <br />
            <li className="logout warn"></li>
          </ul>

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
        </header>

        <div>
          <nav role="navigation">
            <ul className="main">
              <li className="write">
                <a
                  onClick={(e) => {
                    insertProduct(e);
                  }}
                >
                  Insert Product
                </a>
              </li>
              <li className="users">
                <a onClick={(e) => manageClients(e)}>Manage Orders</a>
              </li>
              <li className="users">
                <a
                  onClick={(e) => {
                    manageProducts(e);
                  }}
                >
                  See Products
                </a>
              </li>

              <li className="users">
                <a>Manage Reviews</a>
              </li>
              <li className="logout warn">
                <a onClick={(e) => logOut(e)}>Log Out</a>
              </li>
            </ul>
          </nav>

          {seeClients ? (
            <div>
              <div className="input-container">
                <label htmlFor="Name" className="form-label">
                  Email
                </label>
                <input
                  type={"text"}
                  minLength="1"
                  maxLength="100"
                  required
                  placeholder="Enter email"
                  value={emailSearched}
                  name="emailSearched"
                  onChange={onInputChangeSearch}
                ></input>
              </div>
              <main role="main">
                <section className="panel important">
                  <h1>All Clients</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email </th>
                        <th>Telephone</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.numberOfTelephone}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => seeOrders(user)}
                            >
                              Vezi comenzi
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          ) : (
            <>
              <div id="adm"></div>
            </>
          )}
          {seeProducts ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>The best employee ever!!</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>nr crt</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.stock}</td>
                          <td>{product.category.name}</td>
                          <td>{product.price}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary mx-2"
                              onClick={() => veziReview(product)}
                            >
                              See reviews
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => deleteProduct(product)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          ) : null}

          {seeOrderClient ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>User Activity</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>E-mail</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={0}>
                        <td>{userSelected.email}</td>
                        <td>{userSelected.firstName}</td>
                        <td>{userSelected.lastName}</td>
                        <td>{userSelected.numberOfTelephone}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table>
                    <thead>
                      <tr>
                        <th>OrderID</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.message}</td>
                          <td>{order.orderStatus}</td>
                          <td>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => rejectOrder(order)}
                            >
                              Reject
                            </button>
                            <button
                              className="btn btn-success"
                              onClick={() => validateOrder(order)}
                            >
                              Validate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          ) : null}

          {seeReviews ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>The best employee ever!!</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>IDX</th>
                        <th>Review</th>
                        <th>Stars</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{review.message}</td>
                          <td>{review.numberOfStars}</td>
                          <td>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => deleteReview(review)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
