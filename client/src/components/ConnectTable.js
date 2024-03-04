import React, {useEffect, useState} from 'react'

function ConnectTable({connections}) {

   

    return (
       <>
       {connections && connections.map((connect) => {
            const date1 = connect.connection_date.slice(5, 7)
            const date2 = connect.connection_date.slice(8, 10)
            const date3 = connect.connection_date.slice(0,4)
            const fulldate = `${date1}-${date2}-${date3}`
            return (
                <>
                <tr>
                    <td>{connect.employee.name}</td>
                    <td>{connect.employee.company.name}</td>
                    <td>{connect.employee.email}</td>
                    <td>{fulldate}</td>
                    <td>{connect.action}</td>
                    <td>{connect.notes}</td>
                    <button>Update</button>
                    <button>Remove</button>
                </tr>
                </> 
            )
        })}
       </>         
    )
}

export default ConnectTable



