import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Login from "./Login";
import Signup from "./Signup"




function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [connections, setConnections] = useState([])

  function login(user) {
      setCurrentUser(user)
      setLoggedIn(true)
    }
    
  function logout(user) {
      setCurrentUser(null)
      setLoggedIn(false)
    }
  
    console.log(currentUser)
    return (
    <>
    <header className="App">
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} logout={logout}/>
    </header>
      <Outlet 
        context={[login, loggedIn, setConnections, connections, currentUser]}/>
  
    </>
  )
}

export default App;