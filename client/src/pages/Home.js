import React, {useEffect, useState} from 'react'
import { useOutlet, useOutletContext } from 'react-router-dom'
// import AddConnection from '../components/AddConnection'
// import ConnectTable from '../components/ConnectTable'
import MyConnects from './MyConnects'



function Home() {

    const [currentUser] = useOutletContext()

    console.log(currentUser)
    if (!currentUser) {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>User home page</h1>
                <MyConnects />
            </div> 
        )
    }
    return (
        <h1>LoggedIn</h1>
        )
}

export default Home 




