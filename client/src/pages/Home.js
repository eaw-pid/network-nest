import React, {useEffect, useState} from 'react'
import AddConnection from '../components/AddConnection'
import ConnectTable from '../components/ConnectTable'
import Login from './Login'
import Signup from './Signup'



function Home() {

    // const [connections, setConnections] = useState([])
    const [loggedIn, setIsLoggedIn] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("/users")
        .then((res) => res.json())
        .then((data) => setUsers(data))
    }, [])

function handleAddUsers(newUser) {
    console.log(newUser)
    // setUsers([...users, newUser ])
}
//if user is not logged in, show login page
    return (
        <div>
            <h1>User home page</h1>
         {loggedIn ?    
            <Login /> : null }
            <Signup onAddUsers={handleAddUsers}/>
            <AddConnection />
            <ConnectTable />
        </div>
    )
}

export default Home