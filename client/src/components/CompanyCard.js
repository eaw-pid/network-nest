import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

//Need to add an onClick for Add to My Connections Button

function CompanyCard({company}) {

    const {employees} = company
    

    const employeeList = employees.map((employee) => {
        return (
            <React.Fragment key={employee.id}>
            <Card.Text>Name: {employee.name} </Card.Text>
            <Card.Text>Email: {employee.email}</Card.Text>
            <Card.Text>Contacted: {employee.contacted ? "✔️" : "✖️"}</Card.Text>
            <a href="" className="btn btn-outline-primary btn-sm">Add to "My Connections"</a>
            </React.Fragment>
        )
    })

    return (
        <div>
        
            <Col lg={6}>
                   
            {/* <div className="holder"> */}
            <Card style={{ width: '35rem' }}>
            <Card.Img  src="https://t3.ftcdn.net/jpg/02/55/86/12/360_F_255861239_viu6hRNcURzeKUoyPJBFOyTu1fA8aJtM.jpg" alt="Card image cap"/>
                <Card.Body>
                    <Card.Title>{company.name}</Card.Title>
                    <Card.Text>{company.address}</Card.Text>
                    <a href={company.website_url} className="btn btn-primary">Website</a>
                </Card.Body>
                <Card.Footer>
                    <Card.Title>Employees</Card.Title>
                    {employeeList}
                </Card.Footer>
            </Card>
            {/* </div> */}
            <br/>
            <br/>
            </Col>
           
        </div>
       
    )
}

export default CompanyCard