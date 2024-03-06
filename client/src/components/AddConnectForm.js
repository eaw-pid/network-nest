import React, {useState, useEffect} from 'react'
import { useOutlet, useOutletContext } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

// TODO {companies, onAddCompany}
function AddConnectForm() {

  const {companies, onAddCompany} = useOutletContext()
  const [company, setCompany] = useState({})
  const [employee, setEmployee] = useState({})
  const [selectCompany, setSelectedCompany] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [address, setAddress] = useState("")
  const [website, setWebsite] = useState("")
  const [employeeName, setEmployeeName] = useState("")
  const [employeeEmail, setEmployeeEmail] = useState("")
  const [employeeWebsite, setEmployeeWebsite] = useState("")
  
  console.log(companies)

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter company name"),
    address: yup.string().required("*required"),
    website_url: yup.string().required("*required")
  })

  const formik = useFormik({
    initialValues: {
        name: "",
        address: "",
        website_url: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
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
                })
            }
        })
    }
    

  })

  function handleChange(e) {
    const selectedCompany= companies.find((company) => company.name == e.target.value)
    setCompany(selectedCompany)
  }


  function handleExistingSubmit(e) {
    
    setSelectedCompany((selectCompany) => !selectCompany)
  }

  
  function handleNewSubmit(e) {
    e.preventDefault()

    const newCompany = {
        name: companyName,
        address: address,
        website_url: website,
    }
    fetch('/companies', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCompany)
    })
    .then(res => res.json())
    .then(data => {
        onAddCompany(data)
        setCompany(data)})
  }

//   setSelectedCompany((selectCompany) => !selectCompany)
//   console.log(company)
  
  function handleEmployeeSubmit(e) {
    e.preventDefault()
    

    const newEmployee = {
        name: employeeName,
        email: employeeEmail,
        website: employeeWebsite,
        contacted: 1,
        company_id: company.id
    }

    console.log(newEmployee)
    fetch('/employees', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })
    .then(res => res.json())
    .then(data => setEmployee(data))
  }

//onSubmit: handleEmployeeSubmit(values)

//function handleEmployeeSubmit(values)
//....{...value, company_id: company.id}
console.log(companies)
    return (
        <div>
            <div>
            <h3>Step 1: Select Company</h3>
            <h4>Choose Existing Company</h4>
            <form onSubmit={handleExistingSubmit}>
                <div className="form-group col-md-4">
                <select id="inputState" onChange={handleChange}>
                    <option value="default"></option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.name}>{company.name}</option>
                    ))}
                 </select>
                 <button>Next</button>
                 </div>
                 </form>
                 <form >
                 <div>
                    <h4>Or Add New Company</h4>
                    <label>Company Name</label>
                    <input name="name"
                        placeholder="Company Name" 
                        value={formik.values.name}
                        onChange={formik.handleChange} />
                       
                    <label>Company Address</label>
                    <input name="address" 
                        placeholder="Company Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}/>
                    
                        
                    <label>Company Website</label>
                    <input name="website" 
                        placeholder="Company Website"
                        value={formik.values.website_url}
                        onChange={formik.handleChange}/>
                        
                    <button>Submit</button>
                 </div>
            </form>
            </div>
            
            <div>
                <h3>Step 2: Add Employee</h3>
                <form onSubmit={handleEmployeeSubmit}>
                    <div className="form-group col-md-4">
                        <label>Contact Name</label>
                        <input 
                        name="name" 
                        placeholder="Contact Name"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        ></input>
                        <label>Contact Email</label>
                        <input 
                        name="email" 
                        placeholder='Email'
                        value={employeeEmail}
                        onChange={(e) => setEmployeeEmail(e.target.value)}
                        ></input>
                        <label>Website</label>
                        <input 
                        name="website" 
                        placeholder="Website"
                        value={employeeWebsite}
                        onChange={(e) => setEmployeeWebsite(e.target.value)}
                        ></input>
                        <button>Submit</button>
                    </div>
                </form>
            </div> 
        </div> 
    )
}

export default AddConnectForm


// function Signup() {
    
//     const [errors, setErrors] = useState([])

//     const navigate = useNavigate()
//     const {login} = useOutletContext()
    
//     function handleSubmit(user) {
//         login(user)
//     }
//     //formik makes sure we're going to display errors and handle onChanges and onSubmit
// //it will check for errors onChange
    
//     //schema is like the backend - what attributes make up the user 
//     const formSchema = yup.object().shape({
//         username: yup.string().required("Must enter username").min(3).max(20),
//         first_name: yup.string().required("Must enter First Name"),
//         last_name: yup.string().required("Must enter Last Name"),
//         email: yup.string().email("Invalid email").required("Must enter email"),
//         password: yup.string().required("Must enter a password"),
    
//       });
      
//     const formik = useFormik({
//         initialValues: {
//             username: "",
//             first_name: "",
//             last_name: "",
//             email: "",
//             password: "",
//         },
//         validationSchema: formSchema,
//         onSubmit: (values) => {
//             setErrors([])
//             console.log(values)
//             fetch('/signup' , {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(values, null, 2)
//             })
//             .then(r => {
//                 if(r.ok) {
//                     r.json()
//                     .then
//                     (user => handleSubmit(user))
//                     // // (navigate('/'))
//                 } else {
//                     r.json().then(err => setErrors(err.errors))
//                 }
//             })
//             // .then((res) => res.json())
//             // .then((newUser) => onAddUsers(newUser))
//         }
// });

//     function displayErrors(error) {
//         return error ? <p style={{color: "red"}}>{error}</p> : null
//     }

//     return(
//         <div>
//         <div className="Auth-form-container">
//            <Form className="Auth-form" onSubmit={formik.handleSubmit}>
//                <div className="Auth-form-content">
//                 <Form.Label className="Auth-form-title">Sign Up</Form.Label>
//                 <Form.Group>    
//                     <Form.Label htmlFor="username">Username</Form.Label>
//                     <Form.Control 
//                     type="text" 
//                     name="username"
//                     placeholder="Enter Username" 
//                     value={formik.values.username}
//                     onChange={formik.handleChange}
//                     />
//                     {displayErrors(formik.errors.username)}
//                 </Form.Group>  
//                 <Form.Group className="mb-3" controlId="formGroupFirstName">    
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control 
//                     type="text" 
//                     name="first_name"
//                     placeholder="Enter First Name" 
//                     value={formik.values.first_name}
//                     onChange={formik.handleChange}/>
//                 </Form.Group>
//                 {displayErrors(formik.errors.first_name)}
//                 <Form.Group className="mb-3" controlId="formGroupLastName">    
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control 
//                     type="text" 
//                     name="last_name"
//                     placeholder="Enter Last Name" 
//                     onChange={formik.handleChange}
//                     value={formik.values.last_name}/>
//                 </Form.Group>
//                 {displayErrors(formik.errors.last_name)}
//                 <Form.Group className="mb-3" controlId="formGroupEmail">    
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control 
//                     type="text" 
//                     name="email"
//                     placeholder="Enter Email" 
//                     onChange={formik.handleChange}
//                     value={formik.values.email}/>
//                 </Form.Group>
//                 {displayErrors(formik.errors.email)}
//                 <Form.Group className="mb-3" controlId="formGroupPassword">    
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control 
//                     type="text" 
//                     name="password"
//                     placeholder="Password" 
//                     onChange={formik.handleChange}
//                     value={formik.values.password}/>
//                 </Form.Group>  
//                 {displayErrors(formik.errors.password)} 
//                 <Button variant="primary" type="submit">Sign Up!</Button> 
//             </div>
//         </Form>
//         </div>
//         </div>
//     )
// }