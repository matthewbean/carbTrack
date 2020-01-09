import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/author/authContext';
import Alerts from '../layout/Alerts'


const Register = (props) => {


    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const{ setAlert, clearAlerts } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=>{
        
        if(isAuthenticated){
            props.history.push('/')
        }
        if(error === 'User already exists'){
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

      const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        carbsGoal: '',
        fatGoal: ''
    });
    const { name, email, password, password2, carbsGoal, fatGoal } = user;

    const onChange = e=> setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        clearAlerts();
        if(name === '' || email === '' || password === ''){
            setAlert('Please fill out all fields', 'danger');
        } else if(password !== password2){
            setAlert('Passwords do not match', 'danger');
        }
        else{
        register({
            name,
            email,
            password,
            carbsGoal,
            fatGoal
        })
        }
        }


    return (
        <div>
                <Alerts />
                <div className = 'd-flex justify-content-center mt-4'>
                    <div className = "bg-light p-4 rounded">
            <h1>
                Account <span className = "text-primary">Register</span>
            </h1>
            <form className = "d-flex flex-column justify-content-right" onSubmit = {onSubmit}>
            <div className = "input-group input-group-sm mb-3">
                <div className ="input-group-prepend">
                    <label className ="input-group-text" htmlFor = "name">Name:</label>
                </div>
                <input className = "form-control" type = "text" name = "name" value = {name} onChange={onChange} />
                </div>
                <div className = "input-group input-group-sm mb-3">
                <div className ="input-group-prepend">
                <label className ="input-group-text" htmlFor = "email">Email Adress:</label>
                </div>
                <input className = "form-control" type = "email" name = "email" value = {email} onChange={onChange}/>
                </div>
                <div className = "input-group input-group-sm mb-3">
                <div className ="input-group-prepend">
                <label className ="input-group-text" htmlFor = "password">Password:</label>
                </div>
                <input className = "form-control" type = "password" name = "password" value = {password} onChange={onChange}/>
                </div>
                <div className = "input-group input-group-sm mb-3">
                <div className ="input-group-prepend">
                <label className ="input-group-text" htmlFor = "password2">Confirm Password:</label>
                </div>
                <input className = "form-control" type = "password" name = "password2" value = {password2} onChange={onChange}/>
                </div>
                <div className = "input-group input-group-sm mb-3">
                    <div className ="input-group-prepend">
                        <label className ="input-group-text" htmlFor = "carbsGoal">Daily Carbs Goal:</label>
                    </div>
                <input className = "form-control" type = "text" name = "carbsGoal" value = {carbsGoal} onChange={onChange}/>
                </div>
                <div className = "input-group input-group-sm mb-3">
                <div className ="input-group-prepend">
                <label className ="input-group-text" htmlFor = "fatGoal">Daily Fat Goal:</label>
                </div>
                <input className = "form-control" type = "text" name = "fatGoal" value = {fatGoal} onChange={onChange}/>
                </div>
                <input type="submit" value = "Register" className="btn btn-primary btn-block" />
            </form>
        </div>
        </div>
        </div>
    )
}

export default Register