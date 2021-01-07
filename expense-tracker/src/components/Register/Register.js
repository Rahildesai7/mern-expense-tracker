import React,{useState, useEffect} from 'react';
import axios from 'axios';

const Register = ()=>{
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(()=>{
        
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
      }

    const resetForm = ()=>{
        setValues({username : "", password : "",name: ""});
    }

    const submitForm = (event) => {
        event.preventDefault();
        //setValues(values);
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        /* axios.post('http://localhost:5000/users/add',user)
            .then(res=> console.log(res))
            .catch(err=>console.log(err)); */
        AuthService.register(user).then(data=>{
            console.log(data);
            resetForm();
            });
    }

    return (
        <form className="form">
            <p>Register!</p>
            <input placeholder="Enter name..." type="text" value={values.name} onChange={handleChange('name')}></input><br/>
            <input placeholder="Enter emailid..." type="email" value={values.email} onChange={handleChange('email')}></input><br/>
            <input placeholder="Enter password..." type="password" value={values.password} onChange={handleChange('password')}></input><br/>
            <button type="submit" onClick={submitForm}>Register</button>
        </form>
    )
}

export default Register;