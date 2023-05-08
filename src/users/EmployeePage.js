import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerPage.css";

const EmployeePage = () => {
  const [seeProducts, setSeeProducts] = useState(false);
  let navigate = useNavigate(0);

  const [seeReviews, setSeeReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState(false);
  const [products2, setProducts2] = useState([]);
  const [productReviewed, setProductReviewed] = useState();

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
    const result = axios.post("http://localhost:8070/logIn/logOut/"+userConnected.email);
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
    setProductReviewed(product);
    const result = await axios.post(
      "http://localhost:8070/client_page/see_reviews/" + product.id
    );
    setReviews(result.data);
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
    setSeeReviews(false);
    loadProducts();
  };

  return (
    <>
      <div>
        <header role="banner">
          <h1>Welcome</h1>
          <ul className="utilities">
            <br />
            <li className="logout warn"></li>
          </ul>
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
    </>
  );
};

export default EmployeePage;
