import React, {useState, useEffect} from 'react'
import { useNavigate, useOutlet, useOutletContext } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import {Form, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'

function AddConnectForm({clicked, setIsClicked, onAddConnect}) {

  const {companies, onAddCompany, currentUser} = useOutletContext()
  const [company, setCompany] = useState({})
  const [employee, setEmployee] = useState({})
  const [selectCompany, setSelectCompany] = useState(false)
  const [selectEmployee, setSelectEmployee] = useState(false)
  const [value, setValue] = useState(null);
 
  
  
  const navigate = useNavigate()

  

//SELECT EMPLOYEE/ADD EMPLOYEE
  const formOneSchema = yup.object().shape({
    name: yup.string().required("Must enter company name"),
    address: yup.string().required("*required"),
    website_url: yup.string().required("*required")
  })


  function handleSubmitOne(values) {
        fetch('/companies', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(r => {
            if(r.ok) {
                r.json()
                .then(data => {
                    onAddCompany(data)
                    setCompany(data)
                    setSelectCompany((selectCompany) => !selectCompany)
                })
            }
        })
    }
  const formik1 = useFormik({
    initialValues: {
        name: "",
        address: "",
        website_url: "",
    },
    validationSchema: formOneSchema,
    onSubmit: (values) => handleSubmitOne(values)
  })

  function handleChange(e) {
    const selectedCompany= companies.find((company) => company.name == e.target.value)
    setCompany(selectedCompany)
  }


  function handleExistingSubmit(e) {
    e.preventDefault()
    setSelectCompany((selectCompany) => !selectCompany)
  }

  //ADD EMPLOYEE
  const formTwoSchema = yup.object().shape({
    name: yup.string().required("Must enter company name"),
    email: yup.string().required("*required"),
    website: yup.string().required("*required")
  })

  const formik2 = useFormik({
    initialValues: {
        name: "",
        email: "",
        website: "",
    },
    validationSchema: formTwoSchema,
    onSubmit: (values) => handleSubmitTwo(values)

  })

  function handleSubmitTwo(values) {
    
    const newEmployee = {...values, contacted: 1, company_id:company.id}
    
    fetch('/employees', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })
    .then(res => res.json())
    .then(data => {
        setEmployee(data)
        setSelectEmployee(true)})
  }
  
//ADD CONNECTION

const formThreeSchema = yup.object().shape({

})
const formik3 = useFormik({
    initialValues: {
        action: "",
        notes: ""
    },
    validationSchema: formThreeSchema,
    onSubmit: (values) => handleSubmitThree(values)
})

function handleSubmitThree(values) {
    const newConnection = {
        user_id: currentUser.id,
        employee_id: employee.id,
        ...values
    }
    fetch('/connections', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newConnection)
    })
    .then(res => res.json())
    .then((connectionData) => {
        onAddConnect(connectionData)
        setIsClicked(false)
        navigate('/my-connections')
    })
    
}

  function displayErrors(error) {
    return error ? <p style={{color: "red"}}>{error}</p> : null
}


    return (
        <div className="add-connection-container">
            <div className="add-connection-form">
            <h3>Step 1: Select Company</h3>
            <ToggleButtonGroup type="radio" value={value} onChange={(val) => setValue(val)} name="toggleGroup">
                <ToggleButton id="tbg-btn-1" value={1}>
                    Choose Existing Company
                </ToggleButton>
                <ToggleButton id="tbg-btn-2" value={2}>
                    Add New Company
                </ToggleButton>
            </ToggleButtonGroup>
            {(value === 1) ?
            <div> 
            <h4>Choose Existing Company</h4>
            <Form onSubmit={handleExistingSubmit}>
                <div >
                <select className="dropdown" id="inputState" onChange={handleChange}>
                    <option value="default"></option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.name}>{company.name}</option>
                    ))}
                 </select>
                 <button>Next</button>
                 </div>
            </Form> </div>: null}
            
            {(value === 2) ?
                 <Form onSubmit={formik1.handleSubmit} >
                 <div className="add-connection-form">
                    <h4>Or Add New Company</h4>
                    <label>Company Name</label>
                    <input
                        type="text"  
                        name="name"
                        placeholder="Company Name" 
                        value={formik1.values.name}
                        onChange={formik1.handleChange} />
                       {displayErrors(formik1.errors.name)}
                    <label>Company Address</label>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder="Company Address"
                        value={formik1.values.address}
                        onChange={formik1.handleChange}/>
                        {displayErrors(formik1.errors.name)}
                    <label>Company Website</label>
                    <input 
                        type="text" 
                        name="website_url" 
                        placeholder="Company Website"
                        value={formik1.values.website_url}
                        onChange={formik1.handleChange}/>
                        {displayErrors(formik1.errors.name)}
                    <button type="submit">Submit</button>
                 </div>
            </Form>
            : null}
            
            {selectCompany ? 
            
            <div className="add-connection-form">
                <h3>Step 2: Add Employee</h3>
                <form onSubmit={formik2.handleSubmit}>
                    <div>
                        <label>Contact Name</label>
                        <input 
                        type="text"
                        name="name" 
                        placeholder="Contact Name"
                        value={formik2.values.name}
                        onChange={formik2.handleChange}/>
                        {displayErrors(formik2.errors.name)}
                        <label>Contact Email</label>
                        <input 
                        name="email" 
                        placeholder='Email'
                        value={formik2.values.email}
                        onChange={formik2.handleChange}/>
                        {displayErrors(formik2.errors.email)}
                        <br/>
                        <label>Website</label>
                        <input 
                        name="website" 
                        placeholder="Website"
                        value={formik2.values.website}
                        onChange={formik2.handleChange}/>
                        {displayErrors(formik2.errors.website)}
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div> : null }

            {selectEmployee ? 
            <div className="add-connection-form">
                <h3>Step 3: Add Connection</h3>
                <form onSubmit={formik3.handleSubmit}>
                    <label>Type of Contact:</label>
                    <select name ="action" value={formik3.values.action} onChange={formik3.handleChange}>
                        <option>Select an Option</option>
                        <option  value="Phone Call">Phone Call</option>
                        <option  value="Email">Email</option>
                        <option  value="LinkedIn Message">LinkedIn Message</option>
                    </select>
                    {displayErrors(formik3.errors.action)}
                    <br/>
                    <label>Notes</label>
                    <input
                        className="form-control input-lg"
                        type="text"
                        name="notes"
                        placeholder="Add Details"
                        value={formik3.values.notes}
                        onChange={formik3.handleChange}/>
                        {displayErrors(formik3.errors.notes)}
                    <button type="submit">Add Connection!</button>
                </form>
            </div>
            : null }
            </div>
        </div> 
    )
}

export default AddConnectForm




//   function handleNewSubmit(e) {
//     e.preventDefault()

//     const newCompany = {
//         name: companyName,
//         address: address,
//         website_url: website,
//     }
//     fetch('/companies', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newCompany)
//     })
//     .then(res => res.json())
//     .then(data => {
//         onAddCompany(data)
//         setCompany(data)})
//   }

//   setSelectedCompany((selectCompany) => !selectCompany)
//   console.log(company)