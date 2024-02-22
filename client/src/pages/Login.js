
import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function Login() {
    return(
        <div className="Auth-form-container">
        <Form className="Auth-form">
        <div className="Auth-form-content">
        <Form.Label className="Auth-form-title">Sign In</Form.Label>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter Username" />
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

export default Login

//regular bootstrap

{/* <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div> */}