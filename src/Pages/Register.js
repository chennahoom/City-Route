import { useState } from "react";


function Register(props){
    const initForm = {full_name: '', email:'' , type_of_user: '', languages: '', phone:''};
    const [user, setUser] = useState(initForm);
    
    const onSave = (event) =>{
        event.preventDefault();
        props.addUser(user);
        setUser(initForm);
    }

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setUser({...user,[name]:value });
    }

    return(
        <form onSubmit={onSave}>
            <label>
                Full Name:<input type="text" name="full_name" onChange={handleInputChange}/><br/>
            </label>
            <label>
                Email:<input type="email" name="email" onChange={handleInputChange}/><br/>
            </label>
            <label>
                Type of user:
                <select required name="type_of_user" onChange={handleInputChange} >
                    <option value="">Choose</option>
                    <option value="Traveler">Traveler</option>
                    <option value="Tour Guide">Tour Guide</option>
                </select><br/>
            </label>
            
            <label>
                Phone Number: <input type="tel" name="phone" onChange={handleInputChange}/><br/>
            </label>
            <button>Sign Up</button>
        </form>
    )

}

export default Register;
