import React, {useState, useEffect} from 'react'
import CompanyCard from '../components/CompanyCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useOutletContext } from 'react-router-dom';


function Companies() {

    
    const {companies, setCompanies} = useOutletContext()
    
    useEffect(() => {
        fetch('/companies')
        .then(r => r.json())
        .then(companies => {
       
            setCompanies(companies)})
    }, [])


    return (
        <div className="page-body">
            <h1 className="page-header">Company List</h1>
          
            <div >
            <Container fluid>
                <Row>
            {companies.map((company) => {
                return (
                    <CompanyCard key={company.id} company={company}/>
                )
            })}
            </Row>
            </Container>
            </div>
        </div>
    )


}

export default Companies