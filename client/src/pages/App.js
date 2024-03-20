import React, {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Login from "./Login";
import Signup from "./Signup"
import { useNavigate } from "react-router-dom";




function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [userInfo, setUserInfo] = useState({})
  const [companies, setCompanies] = useState([])
  const [clicked, setIsClicked] = useState(false)
  const [connectList, setConnectList] =  useState([])


  const navigate = useNavigate()

  useEffect(() => {
    fetch("/checksession").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch('/companies')
    .then(r => r.json())
    .then(data => setCompanies(data))
  }, [])

  function login(user) {
      setCurrentUser(user)
      setLoggedIn(true)
      navigate('/')
    }
    
  function logout() {
      fetch("/logout", {
        method: "DELETE"
      })
      .then((r) => {
        if (r.ok) {
          setCurrentUser(null)
          setLoggedIn(false)
          navigate('/')
        }
      })
    }
  
  
  function onAddCompany(newCompany) {
    setCompanies([...companies, newCompany])
  }

    return (
    <>
    <header className="App">
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} logout={logout}/>
    </header>
      <Outlet 
        context={{login, 
        loggedIn, 
        setUserInfo, 
        userInfo, 
        currentUser, 
        companies, 
        setCompanies, 
        onAddCompany,
        clicked,
        setIsClicked,
        setLoggedIn,
        connectList,
        setConnectList}}/>
  
    </>
  )
}

export default App;