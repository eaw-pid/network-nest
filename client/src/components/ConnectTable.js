import React, {useEffect, useState} from 'react'
import UpdateConnectForm from '../components/UpdateConnectForm'
import { useOutletContext } from 'react-router-dom'

function ConnectTable({connect, handleDeleteConnection, handleUpdateItem}) {

    const [updatedClicked, setUpdatedClicked] = useState(false)
    const {connectList, setConnectList} = useOutletContext()

    // console.log(connect)
   
    function handleClick() {
        setUpdatedClicked((updatedClicked) => !updatedClicked)
    }

    

    function handleRemove() {
        fetch(`/connections/${connect.id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(() => handleDeleteConnection(connect.id))
    }

   
    function handleUpdateItem(id, item) {
        console.log(id, item)
        console.log(connectList)
        const updatedConnectList = connectList.map((connect) => {
            if (connect.id === id) {
                return item
            } else {
                return connect
            }
        });
        setConnectList(updatedConnectList)}

        const date1 = connect.connection_date.slice(5, 7)
        const date2 = connect.connection_date.slice(8, 10)
        const date3 = connect.connection_date.slice(0,4)
        const fulldate = `${date1}-${date2}-${date3}`

    return (
       <>  
            <tr key={connect.id}>
                <td>{connect.employee.name}</td>
                <td>{connect.employee.company.name}</td>
                <td>Email: {connect.employee.email} 
                <br/>
                Website: <a href={connect.employee.website}>{connect.employee.website}</a></td>
                <td>{fulldate}</td>
                <td>{connect.action}</td>
                <td>{connect.notes}</td>
                <td><button onClick={handleClick}>Update</button></td>
                <td><button onClick={handleRemove}>Remove</button></td>
            </tr>
            {updatedClicked ?
                <UpdateConnectForm connect={connect} setUpdatedClicked={setUpdatedClicked} handleUpdateItem={handleUpdateItem}/> : null}
       </>         
    )
}

export default ConnectTable



