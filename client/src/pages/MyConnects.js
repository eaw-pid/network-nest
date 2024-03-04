import React, {useEffect, useState} from 'react'
import ConnectTable from '../components/ConnectTable'
import AddConnectForm from '../components/AddConnectForm'
import { useOutletContext } from 'react-router-dom'
import Button from 'react-bootstrap'


function MyConnects({companies}) {

    const {userInfo, setUserInfo, currentUser} = useOutletContext()
    const [clicked, setIsClicked] = useState(false)

    console.log(currentUser)
    useEffect(() => {
        const userId = currentUser.id
        fetch(`/users/${userId}`)
        .then(r => r.json())
        .then(data => setUserInfo(data))
    }, [])

        
    const {connections} = userInfo
    
    function handleClick() {
        setIsClicked((clicked) => !clicked)
    }
   


    

    return (
        
      
            <div>
                <h1 className="connection-header">My Connections</h1>
                <button onClick={handleClick}>Add a Connection</button>
                {clicked ? <AddConnectForm companies={companies}/> : null}
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
                    <ConnectTable connections={connections}/>
                </table>
                </div>
            </div>
            
      
    )
}

export default MyConnects
