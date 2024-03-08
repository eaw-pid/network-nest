import React, {useEffect, useState} from 'react'
import ConnectTable from '../components/ConnectTable'
import AddConnectForm from '../components/AddConnectForm'

import { useOutletContext } from 'react-router-dom'
import Button from 'react-bootstrap'


function MyConnects() {

    const {userInfo, setUserInfo, currentUser} = useOutletContext()
    const [clicked, setIsClicked] = useState(false)
   

    
    useEffect(() => {
        const userId = currentUser.id
        fetch(`/users/${userId}`)
        .then(r => r.json())
        .then(data => setUserInfo(data))
    }, [])

    console.log(userInfo)
    const connections = userInfo.connections
    console.log(connections)

    
    
    function handleClick() {
        setIsClicked((clicked) => !clicked)
    }
   
    
    return (
        
      
            <div>
                <h1 className="connection-header">My Connections</h1>
                <button onClick={handleClick}>Add a Connection</button>
                
                {clicked ? <AddConnectForm clicked={clicked} setIsClicked={setIsClicked}/> : null}
                <div className="connect-table">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date Contacted</th>
                        <th scope="col">Connection Type</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Status</th>
                    </tr> 
                </thead>
                <tbody>
                    
                {connections && connections.map((connect) => (

                    <ConnectTable key={connect.id} connect={connect} />
                ))}
                   
                </tbody>
                </table>
                </div>
            </div>
            
      
    )
}

export default MyConnects
