import React from 'react'

function Signup() {
    return (
        <div className="Auth-form-container">
           <form className="Auth-form">
               <div className="Auth-form-content">
                     <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="form-group mt-3">
                    <label>First Name</label>
                    <input
                        type="first name"
                        className="form-control mt-1"
                        placeholder="Enter first name"/>
                    </div>
                    <div>
                    <label>Last Name</label>
                    <input
                        type="last name"
                        className="form-control mt-1"
                        placeholder="Enter last name"/>
                    </div>
                    <div>
                    <label>Username</label>
                    <input
                        type="username"
                        className="form-control mt-1"
                        placeholder="Enter username"/>
                    </div>
                    <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"/>
                    </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
        </div>
    )}

export default Signup

