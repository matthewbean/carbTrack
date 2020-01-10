import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/author/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts'

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const{ setAlert, clearAlerts } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/')
        }
        if(error === 'Invalid Username/Password'){
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


      const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const { email, password } = user;

    const onChange = e=> setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        clearAlerts();
        if(email === ''|| password === ""){
            setAlert('Please fill in all fields', 'danger')
        }else{
                login({
                    email,
                    password
                })
        }
        }


    return (
        <div>
            <Alerts />
                <div className = 'd-flex justify-content-center mt-4'>
                    <div className = "bg-light p-4 rounded">
            <h1>
                Account <span className = "text-primary">Login</span>
            </h1>
            <form className = "d-flex flex-column justify-content-right" onSubmit = {onSubmit}>

                
                
                <div className = "input-group input-group-sm mb-3">
                    <div className ="input-group-prepend">
                        <label className ="input-group-text" htmlFor = "email">Email Adress: </label>
                    </div>
                <input className = "form-control" type = "email" name = "email" value = {email} onChange={onChange}/>
                </div>
                <div className = "input-group input-group-sm mb-3">
                    <div className = "input-group-prepend">
                <label className = "input-group-text" htmlFor = "password">Password: </label>
                </div>
                <input className = "form-control" type = "password" name = "password" value = {password} onChange={onChange}/>
                </div>
                <input type="submit" value = "Login" className="btn btn-primary" />
            </form>
            <div className = "mt-2">Don't have an account? <Link to ='/register' >Create one now</Link></div>
            </div>
        </div>

        </div>
    )
}

export default Login