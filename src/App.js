import './App.css';
import React, { useState, useEffect } from "react";
import { CircularProgress } from '@mui/material';

function App() {
  const [show, setShow] = useState(false);

  // handles button click, set show to true to display list
  const handleClick = () => {
    setShow(true);
  }
  
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        {!show && <button onClick={handleClick}>See a list of users</button>}
        {show && <FetchUsers />}
      </div>
    </div>
  );
}

// the Header component
function Header() {
  return (
    <div className="App-header">
      Welcome to User List App :D
    </div>
  )
}

// handles fetching request
// returns component LoadingIndicator, UserList, and ErrorDisplay
function FetchUsers() {
  const url = "https://jsonplaceholder.typicode.com/user";

  const [allUsers, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => {
        if (!response.ok) setError(true);
        return response.json()})
      .then(data => {
        setUsers(data);
        setLoading(false);
      }).catch (() => setError(true))
      .catch (() => setError(true));
  }, []);

  // if there is no error, either display loading indicator or user list
  // else, display error message
  if (!isError) {
    return (
      <div>
        {loading ? <LoadingIndicator /> : <UserList users={allUsers}/>}
      </div>
    )
  } else {
    return (
      <ErrorDisplay />
    )
  }
}

// Display a list of user's names, usernames, and email addresses
function UserList(props) {
  return (
    <div>
      <h2>Here is a list of all users</h2>
      <center>
        <table>
          <thead>
              <tr>
                <th scope="col">Name of user</th>
                <th scope="col">Username</th>
                <th scope="col">Email address</th>
              </tr>
          </thead>
          <tbody>

          {props.users.map((dataObj, index) => {
            return (
                <tr key={index}>
                  <td>{dataObj.name}</td>
                  <td>{dataObj.username}</td>
                  <td>{dataObj.email}</td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </center>
    </div>
  )
}

function LoadingIndicator() {
  console.log("displaying loading indicator");
  return (
    <div>
      <CircularProgress size={100} style={{alignSelf: "center"}}/>
    </div>
  )
}

function ErrorDisplay() {
  return (
    <div>
      There is an error fetching user list!
    </div>
  )
}

export default App;
