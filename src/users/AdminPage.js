import React from "react";
import "./AdminPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  let navigate = useNavigate(0);
  const [users, setUsers] = useState([]);
  const [seeUsers, setSeeUsers] = useState(false);

  const [seeNoOfTotalConnectedUsers, setSeeNoOfTotalConnectedUsers] =
    useState(false);
  const [totalNo, setTotalNo] = useState();
  const [seeActivity, setSeeActivity] = useState(false);
  const [loginS, setLoginS] = useState([]);
  const [logoutS, setLogoutS] = useState([]);
  const [userSelected, setUserSelected] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "nu",
    numberOfTelephone: "",
    userType: "guest",
  });

  const [userConnected, setUserConected] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "nu",
    numberOfTelephone: "",
    userType: "guest",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "http://localhost:8070/admin_page/see_users"
    );
    setUsers(result.data);
  };

  const totalNumberConnectedUsers = async () => {
    const result = await axios.get(
      "http://localhost:8070/admin_page/total_users_connected"
    );
    setTotalNo(result.data);
  };

  const deleteUser = async (user) => {
    if (user.userRole != "ADMIN") {
      const result = await axios.delete(
        "http://localhost:8070/admin_page/delete_user/" + user.email
      );
      loadUsers();
    }
  };

  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserConected(foundUser);
      console.log(foundUser);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const manageUsers = (e) => {
    setSeeUsers(true);
    setSeeNoOfTotalConnectedUsers(false);
    setSeeActivity(false);
  };

  const seeTotalUserConnected = (e) => {
    setSeeUsers(false);
    setSeeNoOfTotalConnectedUsers(true);
    setSeeActivity(false);
    totalNumberConnectedUsers();
  };

  const seeActivityUser = async (user) => {
    setSeeUsers(false);
    setSeeNoOfTotalConnectedUsers(false);
    setSeeActivity(true);

    setUserSelected(user);

    const result = await axios.post(
      "http://localhost:8070/user_page/see_activity/" + user.email
    );
    setLoginS(result.data.logInS);
    setLogoutS(result.data.logOutS);

  };

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

  const insertEmployee = (e) => {
    navigate("/admin_page/insert_employee");
  };

  const insertCategory = (e) => {
    navigate("/admin_page/insert_category");
  };

  return (
    <>
      <div>
        <div>
          <h1>Admin Page</h1>
        </div>

        <div>
          <nav role="navigation">
            <ul className="main">
              <li className="See users">
                <a onClick={(e) => insertEmployee(e)}>Add Employee</a>
              </li>
              <li className="write">
                <a onClick={(e) => insertCategory(e)}>Add Category</a>
              </li>
              <li className="users">
                <a href="#">Manage Products</a>
              </li>
              <li className="users">
                <a onClick={(e) => manageUsers(e)}>Manage Users</a>
              </li>
              <li className="users">
                <a onClick={(e) => seeTotalUserConnected(e)}>
                  See total no Of connected users
                </a>
              </li>
              <li className="logout warn">
                <a onClick={(e) => logOut(e)}>Log Out</a>
              </li>
            </ul>
          </nav>

          {seeNoOfTotalConnectedUsers ? (
            <div>
              <p>There are {totalNo} connected users</p>
            </div>
          ) : null}

          {seeActivity ? (
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
                          <th>Date LogIn</th>
                          <th>Date LogOut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginS.map((timeIn, index) => (
                          <tr key={index}>
                            <td>{timeIn}</td>
                            <td>{logoutS[index]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                </section>
              </main>
            </div>
          ) : null}

          {seeUsers ? (
            <div>
              <main role="main">
                <section className="panel important">
                  <h1>All users</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email </th>
                        <th>Role</th>
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
                          <td>{user.userRole}</td>
                          <td>{user.numberOfTelephone}</td>
                          <td>
                            <button className="btn btn-outline-primary mx-2">
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => deleteUser(user)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-success"
                              onClick={() => seeActivityUser(user)}
                            >
                              Vezi activitate
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
        </div>
      </div>
    </>
  );
};

export default AdminPage;
