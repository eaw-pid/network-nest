import React from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'


//need to figure out 'contacted' attribute in Employee - to only reflect a connection with that user
function EmployeeList({employee}) {

    const employeeConnects = employee.connections.length

    function handleClick() {
       console.log(employee.connections.length)
    }

    return (
        <div key={employee.id} className="employee-card">

        <Card.Text><strong style={{ fontWeight: "bold" }}>Name:</strong> {employee.name} </Card.Text>
        <Card.Text><strong style={{ fontWeight: "bold" }}>Email: </strong>{employee.email}</Card.Text>
        <Card.Text><strong style={{ fontWeight: "bold" }}>Number of Connections Made:</strong> {employeeConnects}</Card.Text>
        {/* {!employee.contacted ? 
        <button className="btn btn-outline-primary btn-sm" onClick={handleClick}>Add to "My Connections"</button>
        : null} */}
        </div>
    )

}

export default EmployeeList