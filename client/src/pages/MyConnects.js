import React, {useEffect, useState} from 'react'
import ConnectTable from '../components/ConnectTable'
import { useOutletContext } from 'react-router-dom'
import Button from 'react-bootstrap'


function MyConnects() {

    const {userInfo, setUserInfo, currentUser} = useOutletContext()

    console.log(currentUser)
    useEffect(() => {
        const userId = currentUser.id
        fetch(`/users/${userId}`)
        .then(r => r.json())
        .then(data => setUserInfo(data))
    }, [])

        console.log(userInfo)
        
    
    const {connections} = userInfo
    console.log(connections)
   
    
    const list = connections.map((connect) => {
        return (
            <>
            <h1>Name: {connect.employee.name}</h1>
            <p>Contacted: {connect.employee.email}</p>
            
            </>
        )
    })
    

    

    return (
        
      
            <div>
                <h1 className="connection-header">My Connections</h1>
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
                    </tr> 
                </thead>
                    <tr>
                        <td>Row</td>
                        <td>Row</td>
                        <td>Row</td>
                        <td>Row</td>
                        <td>Row</td>
                        <td>Row</td>
                    </tr>

                {/* <ConnectTable connections={connections}/>  */}
                </table>
                {/* {connections.map((connect) => {
                        return (
                            <>
                            <h1>Name: {connect.employee.name}</h1>
                            <p>Contacted: {connect.employee.email}</p>
                            
                            </>
                        )
                    })} */}
                    {list}
                </div>
            </div>
            
      
    )
}

export default MyConnects