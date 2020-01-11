import React, {useContext, useState, } from 'react'
import AuthContext from '../../context/author/authContext'
import AlertContext from '../../context/alert/alertContext'

const ChangeGoals = () => {

    const [state, setState] = useState({
        carbsGoal: "",
        fatGoal: ""
    })

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext)
    const { user, hideShowChange, submitGoals } = authContext;
    const { setAlert, clearAlerts } = alertContext;
    const { carbsGoal, fatGoal } = state;
    
    const onChange = e=> setState({ ...state, [e.target.name]: e.target.value }); 

    const cancel = ()=>{ 
        setState({
        carbsGoal: "",
        fatGoal: "",
        })
        hideShowChange();
    }
    const submit = ()=>{
        clearAlerts();
        if(isNaN(carbsGoal) || isNaN(fatGoal) || carbsGoal < 0 || fatGoal <0 || carbsGoal === "" || fatGoal === ""){
            setAlert("Please fill out all goals with positive numbers", "danger")

        }else{
        let object = {
            ...state,
            id: user._id
        }

        submitGoals(object);
        }
        setState({
            carbsGoal: "",
            fatGoal: "",
            })
    }

    


    return (
        <div className = "col-sm container">
            <div className = "input-group btn-block mb-2">
                         <input
             className = "rounded mr-auto"
             type = "number" 
             min = "0"
            placeholder = "Carbs Goal" 
            name = "carbsGoal"
            value = {carbsGoal}
            onChange = {onChange} />
            </div>

            <div className = "input-group btn-block mb-2">


             <input
             className = "rounded mr-auto"
             type = "number" 
            placeholder = "Fat Goal" 
            name = "fatGoal"
            min = "0"
            value = {fatGoal}
            onChange = {onChange} />
            </div>
            <button className = "btn btn-danger" onClick = {cancel}>Cancel</button>
            <button className = "btn btn-primary" onClick = {submit}>Submit</button>


        </div>
    )
    
}

export default ChangeGoals;
