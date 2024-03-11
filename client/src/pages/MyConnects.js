import React, {useEffect, useState} from 'react'
import ConnectTable from '../components/ConnectTable'
import AddConnectForm from '../components/AddConnectForm'

import { useOutletContext } from 'react-router-dom'
import Button from 'react-bootstrap'


function MyConnects() {

    const {userInfo, setUserInfo, currentUser} = useOutletContext()
    const [clicked, setIsClicked] = useState(false)
    const [connectList, setConnectList] =  useState([])
   

    
    useEffect(() => {
        const userId = currentUser.id
        fetch(`/users/${userId}`)
        .then(r => r.json())
        .then(data => {
            setUserInfo(data)
            setConnectList(data.connections)})
    }, [])



    // console.log(userInfo)
    // const connections = userInfo.connections
    // setConnectList(connections)

    
    
    function handleClick() {
        setIsClicked((clicked) => !clicked)
    }
   
    function handleDeleteConnection(id) {
        const updatedConnections = connectList.filter((connect) => connect.id !== id)
        setConnectList(updatedConnections)
    }
    
    return (
        
      
            <div>
                <h1 className="connection-header">My Connections</h1>
                {!clicked ?
                <div className="add-connection-button-container">

                <button onClick={handleClick}>Add a Connection</button>
                </div>
                : null }
                
                {clicked ? <AddConnectForm className="add-connect-button" clicked={clicked} setIsClicked={setIsClicked}/> : null}
                <br/>
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
                    
                {connectList && connectList.map((connect) => (

                    <ConnectTable key={connect.id} connect={connect} handleDeleteConnection={handleDeleteConnection}/>
                ))}
                   
                </tbody>
                </table>
                </div>
            </div>
            
      
    )
}

export default MyConnects
