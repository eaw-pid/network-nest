import React, {useState, useEffect} from 'react'

function AddConnectForm({companies}) {

  console.log(companies)  

    

  
    return (
        <div>
            <h3>Step 1: Select Company</h3>
            <form>
                <div class="form-group col-md-4">
                <select id="inputState" >
                    <option selected>Existing Company</option>
                    {companies.map((company) => (
                        <option>{company.name}</option>
                    ))}
                 </select>
                 <button>Submit</button>
                 </div>
                 <div>
                    <h4>Or Add New Company</h4>
                    <label>Company Name</label>
                    <input placeholder="Company Name"></input>
                    <label>Company Address</label>
                    <input placeholder="Company Address"></input>
                    <label>Company Website</label>
                    <input placeholder="Company Website"></input>
                    <button>Submit</button>
                 </div>
            </form>
        </div>
    )
}

export default AddConnectForm