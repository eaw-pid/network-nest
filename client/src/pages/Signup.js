import React, {useEffect, useState} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Signup() {
    
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()
    const {login, clicked, setLoggedIn} = useOutletContext()
    
    function handleSubmit(user) {
        login(user)
    }
    //formik makes sure we're going to display errors and handle onChanges and onSubmit
//it will check for errors onChange
    
    //schema is like the backend - what attributes make up the user 
    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username").min(3).max(20),
        first_name: yup.string().required("Must enter First Name"),
        last_name: yup.string().required("Must enter Last Name"),
        email: yup.string().email("Invalid email").required("Must enter email"),
        password: yup.string().required("Must enter a password"),
    
      });
      
    const formik = useFormik({
        initialValues: {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            setErrors([])
            console.log(values)
            fetch('/signup' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            })
            .then(r => {
                if(r.ok) {
                    r.json()
                    .then
                    (user => handleSubmit(user))
                    navigate('/')
                   
                } else {
                    r.json().then(err => setErrors(err.errors))
                }
            })
            // .then((res) => res.json())
            // .then((newUser) => onAddUsers(newUser))
        }
});

    function displayErrors(error) {
        return error ? <p style={{color: "red"}}>{error}</p> : null
    }

    return(
        <div>
        <div className="Auth-form-container">
           <Form className="Auth-form" onSubmit={formik.handleSubmit}>
               <div className="Auth-form-content">
                <Form.Label className="Auth-form-title">Sign Up</Form.Label>
                <Form.Group>    
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="username"
                    placeholder="Enter Username" 
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    />
                    {displayErrors(formik.errors.username)}
                </Form.Group>  
                <Form.Group className="mb-3" controlId="formGroupFirstName">    
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="first_name"
                    placeholder="Enter First Name" 
                    value={formik.values.first_name}
                    onChange={formik.handleChange}/>
                </Form.Group>
                {displayErrors(formik.errors.first_name)}
                <Form.Group className="mb-3" controlId="formGroupLastName">    
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="last_name"
                    placeholder="Enter Last Name" 
                    onChange={formik.handleChange}
                    value={formik.values.last_name}/>
                </Form.Group>
                {displayErrors(formik.errors.last_name)}
                <Form.Group className="mb-3" controlId="formGroupEmail">    
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="email"
                    placeholder="Enter Email" 
                    onChange={formik.handleChange}
                    value={formik.values.email}/>
                </Form.Group>
                {displayErrors(formik.errors.email)}
                <Form.Group className="mb-3" controlId="formGroupPassword">    
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="password"
                    placeholder="Password" 
                    onChange={formik.handleChange}
                    value={formik.values.password}/>
                </Form.Group>  
                {displayErrors(formik.errors.password)} 
                <Button variant="primary" type="submit">Sign Up!</Button> 
            </div>
        </Form>
        </div>
        </div>
    )
}



export default Signup

