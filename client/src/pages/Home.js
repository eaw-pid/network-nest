import React, {useEffect, useState} from 'react'
import { useOutlet, useOutletContext } from 'react-router-dom'

import MyConnects from './MyConnects'



function Home() {

    const {currentUser, loggedIn} = useOutletContext()

    console.log(currentUser)
    if (currentUser) {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>User home page</h1>
                <h1></h1>
                <MyConnects />
            </div> 
        )
    }
    return (
        <h1>LoggedOut</h1>
        )
}

export default Home 




// import AddConnection from '../components/AddConnection'
// import ConnectTable from '../components/ConnectTable'