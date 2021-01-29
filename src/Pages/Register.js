import { useState } from "react";


function Register(props){
    const [checked, setChecked] = useState([]);
    const [user, setUser] = useState({full_name: '', email:'' , type_of_user: '', languages: '', phone:''});

    const handleCheckChieldElement = (event) => {
        const {name, value} = event.target;
        setChecked([...checked, value]);
    }
    
    const onSave = (event) =>{
        event.preventDefault();
        const newUser = {
            full_name: user.full_name,
            email: user.email,
            type_of_user: user.type_of_user,
            languages: checked,
            phone:user.phone,
        }
        props.addUser(newUser);
    }

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        console.log(name);
        console.log([name]);
        setUser({...user,[name]:value });
        console.log(user);
    }

    return(
        <form onSubmit={onSave}>
            <label>
                Full Name:<input type="text" name="full_name" required onChange={handleInputChange}/><br/>
            </label>
            <label>
                Email:<input type="email" required name="email" onChange={handleInputChange}/><br/>
            </label>
            <label>
                Type of user:
                <select name="type_of_user" onChange={handleInputChange}>
                    <option value="Traveler">Traveler</option>
                    <option value="Tour Guide">Tour Guide</option>
                </select><br/>
            </label>
            
            <label>
                Phone Number: <input type="tel" name="phone" required onChange={handleInputChange}/><br/>
            </label>

            <label>
                Languages Spoken:<br/>
                <input type="checkbox" name="languages" value="hebrew" onChange={handleCheckChieldElement} />Hebrew
                <input type="checkbox" name="languages" value="english" onChange={handleCheckChieldElement} />English
                <input type="checkbox" name="languages" value="spanish" onChange={handleCheckChieldElement} />Spanish
                <input type="checkbox" name="languages" value="german" onChange={handleCheckChieldElement} />German
                <input type="checkbox" name="languages" value="japanese" onChange={handleCheckChieldElement} />Japanese
                <input type="checkbox" name="languages" value="french" onChange={handleCheckChieldElement} />French<br/>
            </label>

            <button>Sign Up</button>
        </form>
    )

}

export default Register;
