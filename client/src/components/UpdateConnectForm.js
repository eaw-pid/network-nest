
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function UpdateConnectForm({connect, handleUpdateItem, setUpdatedClicked}) {

    const navigate = useNavigate()
    
    const formSchema = yup.object().shape({
        action: yup.string().required("Must select action"),
        notes: yup.string().required("*required")
    })

    function handleSubmit(values){
 
        console.log(values)
       
        fetch(`connections/${connect.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then((updatedItem) => {
            console.log(updatedItem)
            handleUpdateItem(connect.id, updatedItem)
            setUpdatedClicked(false)
            navigate('/my-connections')
        })
        
    }
    
    const formik = useFormik({
        initialValues: {
            action: "",
            notes: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => handleSubmit(values)
    })

    function displayErrors(error) {
        return error ? <p style={{color: "red"}}>{error}</p> : null
    }
    
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Type of Contact:</label>
                <select name ="action" value={formik.values.action} onChange={formik.handleChange} >
                        <option>Select an Option</option>
                        <option  value="Phone Call">Phone Call</option>
                        <option  value="Email">Email</option>
                        <option  value="LinkedIn Message">LinkedIn Message</option>
                </select>
                {displayErrors(formik.errors.action)}
                <label>Notes:</label>
                <input 
                className="form-control input-lg"
                type="text" 
                name="notes" 
                value={formik.values.notes} 
                onChange={formik.handleChange}></input>
                {displayErrors(formik.errors.action)}
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateConnectForm


// const [action, setAction] = useState("")
// const [notes, setNotes] = useState("")