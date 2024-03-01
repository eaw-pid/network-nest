import React, {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Login from "./Login";
import Signup from "./Signup"




function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    fetch("/checksession").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  function login(user) {
      setCurrentUser(user)
      setLoggedIn(true)
    }
    
  function logout() {
      setCurrentUser(null)
      setLoggedIn(false)
    }
  
    // console.log(currentUser)
    return (
    <>
    <header className="App">
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} logout={logout}/>
    </header>
      <Outlet 
        context={{login, loggedIn, setUserInfo, userInfo, currentUser}}/>
  
    </>
  )
}

export default App;