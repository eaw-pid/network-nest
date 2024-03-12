import React from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

function EmployeeList({employee}) {

    function handleClick() {
       console.log(employee)
    }

    return (
        <React.Fragment key={employee.id}>
        <Card.Text>Name: {employee.name} </Card.Text>
        <Card.Text>Email: {employee.email}</Card.Text>
        <Card.Text>Contacted: {employee.contacted ? "✔️" : "✖️"}</Card.Text>
        {!employee.contacted ? 
        
        <button className="btn btn-outline-primary btn-sm" onClick={handleClick}>Add to "My Connections"</button>
        : null}
        </React.Fragment>
    )

}

export default EmployeeList