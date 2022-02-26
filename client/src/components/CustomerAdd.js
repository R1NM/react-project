import React,{useState} from "react";
import Axios from "axios";

function CustomerAdd(props) {
    const [customer, setcustomer] = useState(null)

    const handleFormSubmit=(e)=>{
        e.preventDefault();

        const formData= new FormData();
        formData.append('image',customer.file)
        formData.append('name',customer.userName)
        formData.append('birthday',customer.birthday)
        formData.append('gender',customer.gender)
        formData.append('job',customer.job)
        const config={
            headers:{
                'content-type':'multipart/form-data'
            }
        }

        Axios.post('/api/addCustomer',formData,config)
            .then((res)=>{
            console.log(res.data);
        })

    }

    const hadleFileChange=(e)=>{

    }

    const handleValueChange=(e)=>{

    }


    return(
        <form onSubmit={handleFormSubmit}>
            <h1>고객 추가</h1>
            Image: <input type="file" name="file" file={customer.file} 
            value={customer.fileName} onChange={hadleFileChange}/><br/>
            Name: <input type="text" name="userName" value={customer.userName} onChange={handleValueChange}/><br/>
            Birthday: <input type="text" name="birthday" value={customer.birthday} onChange={handleValueChange}/><br/>
            Gender: <input type="text" name="gender" value={customer.gender} onChange={handleValueChange}/><br/>
            Job: <input type="text" name="job" value={customer.job} onChange={handleValueChange}/><br/>
            <button type="submit">ADD</button>

        </form>

    )


}


export default CustomerAdd;
