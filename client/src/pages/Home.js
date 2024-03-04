import React, {useEffect, useState} from 'react'
import { useOutlet, useOutletContext } from 'react-router-dom'

import MyConnects from './MyConnects'



function Home() {

    const {currentUser, loggedIn, companies} = useOutletContext()


    
    if (currentUser) {
        return (
            <div>
                
                <MyConnects companies={companies}/>
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