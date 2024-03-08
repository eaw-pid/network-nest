import { setNestedObjectValues } from "formik";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function UpdateConnectForm({connect}) {

    const [action, setAction] = useState("")
    const [notes, setNotes] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        const newData = {
            action: action,
            notes: notes
        }
        fetch(`connections/${connect.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
        .then(res => res.json())
        .then(navigate('/my-connections'))

    }
    
    console.log(connect)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Type of Contact:</label>
                <select name ="action" value={action} onChange={(e) => setAction(e.target.value)}>
                        <option>Select an Option</option>
                        <option  value="Phone Call">Phone Call</option>
                        <option  value="Email">Email</option>
                        <option  value="LinkedIn Message">LinkedIn Message</option>
                </select>
                <label>Notes:</label>
                <input 
                className="form-control input-lg"
                type="text" 
                name="notes" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}></input>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateConnectForm