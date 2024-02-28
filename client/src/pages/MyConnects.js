import React, {useEffect, useState} from 'react'
import ConnectTable from '../components/ConnectTable'
import { useOutletContext } from 'react-router-dom'


function MyConnects() {

    const [connections, setConnections, currentUser] = useOutletContext()
    console.log(currentUser)

    useEffect(() => {

    })

    return (
        
      
            <div>
                <h1 className="connection-header">My Connections</h1>
                <ConnectTable />
            </div>
            
      
    )
}

export default MyConnects