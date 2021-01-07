import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';

const Login = ({LoggedIn})=>{
    var [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    //var done = false;

    const changeStatus = async () => {
        setValues({...values, isSignedUp: true});
        LoggedIn();
    }

    const resetForm = ()=>{
        setValues({username : "", password : "",name: ""});
    }

    const submitForm = (event) => {
        event.preventDefault();
        //setValues(values);
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        //console.log(user);
        /* axios.post('http://localhost:5000/users/login',user)
            .then(res=> {
                if(res.status === 200){
                    changeStatus()
                    
                }
            })
            .catch(err=>console.log(err)); */

            AuthService.login(user).then(data=>{
                console.log(data);
                const { isAuthenticated,user,message} = data;
                if(isAuthenticated){
                    authContext.setUser(user);
                    authContext.setIsAuthenticated(isAuthenticated);
                    resetForm();
                }
            }
    }

    /* if(values.isSignedUp){
        console.log('in render: ' + values.isSignedUp)
        return (<Redirect to ={'/main'}/>);
    } */
    return (
        <form className="form">
            <p>Login!</p>
            <input placeholder="Enter emailid..." type="email" value={values.email} onChange={handleChange('email')}></input><br/>
            <input placeholder="Enter password..." type="password" value={values.password} onChange={handleChange('password')}></input><br/>
            <button type="submit" onClick={submitForm}>Login</button>
        </form>
    )
}

export default Login;