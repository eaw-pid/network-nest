import React, {useEffect, useState} from 'react'
import UpdateConnectForm from '../components/UpdateConnectForm'



function ConnectTable({connect, handleDeleteConnection}) {

    const [updatedClicked, setUpdatedClicked] = useState(false)

    console.log(connect)
   
    function handleClick() {
        setUpdatedClicked((updatedClicked) => !updatedClicked)
    }

    function handleRemove() {
        fetch(`/connections/${connect.id}`, {
            method: "DELETE",
        })
        .then(res => {
            handleDeleteConnection(connect.id)
        })
    }
   
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
                <UpdateConnectForm connect={connect}/> : null}
       </>         
    )
}

export default ConnectTable



