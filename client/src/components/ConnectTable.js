import React, {useEffect, useState} from 'react'
import UpdateConnectForm from '../components/UpdateConnectForm'



function ConnectTable({connect}) {

    const [updatedClicked, setUpdatedClicked] = useState(false)


   
    function handleClick() {
        setUpdatedClicked((updatedClicked) => !updatedClicked)
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
                <td>{connect.employee.email}</td>
                <td>{fulldate}</td>
                <td>{connect.action}</td>
                <td>{connect.notes}</td>
                <td><button onClick={handleClick}>Update</button></td>
                <td><button>Remove</button></td>
            </tr>
            {updatedClicked ?
                <UpdateConnectForm connect={connect}/> : null}
       </>         
    )
}

export default ConnectTable



