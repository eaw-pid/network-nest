import React, {useState} from "react";
import {Outlet, useOutletContext} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";


function LoginForm() {

    

    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [login] = useOutletContext()
    
    function handleSubmit(values) {
        login(values)
    }

    const formSchema = yup.object().shape({
        username: yup.string().required("Username required"),
        password: yup.string().required("password required")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            
            console.log(values)
            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type":  "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(r => {
                if(r.ok) {
                    r.json()
                    .then(user => handleSubmit(user))
                    navigate('/')
                } 
                else {
                    r.json().then(err => setErrors(err))
                }
            })
        }
    })

    return (
        <div className="Auth-form-container">
        <Form className="Auth-form" onSubmit={formik.handleSubmit}>
        <div className="Auth-form-content">
        <Form.Label className="Auth-form-title">Sign In</Form.Label>
        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
          type="username"
          name="username" 
          placeholder="Enter Username"
          value={formik.values.username}
          onChange={formik.handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password"
          name="password"
          placeholder="Password" 
          value={formik.values.password}
          onChange={formik.handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </div>
      </Form>
      </div>
    )
}

export default LoginForm