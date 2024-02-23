import React, {UseEffect, useEffect, useInsertionEffect, useState} from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function SignupForm() {

    const [users, SetUsers] = useState([{}])
    const [refreshPage, setRefreshPage] = useState(false)

    useEffect(() => {
        fetch("/users")
            .then((res) => res.json())
            .then((data) => {
                SetUsers(data)
                console.log(data)
            })
    }, [refreshPage]);

    
    return(
        <div className="Auth-form-container">
           <Form className="Auth-form">
               <div className="Auth-form-content">
                <Form.Label className="Auth-form-title">Sign Up</Form.Label>
                <Form.Group className="mb-3" controlId="formGroupFirstName">    
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="first-name" placeholder="Enter First Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupLastName">    
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="last-name" placeholder="Enter Last Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">    
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupUsername">    
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter Username" />
                </Form.Group>    
                <Form.Group className="mb-3" controlId="formGroupPassword">    
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>    
                <Button variant="primary" type="submit">Submit</Button> 
            </div>
        </Form>
        </div>
    )
}

export default SignupForm