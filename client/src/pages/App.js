import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Home from "./Home"



function App() {
  return (
    <>
    <header className="App">
      <NavBar />
    </header>
      <Outlet />
    </>
  )
}

export default App;