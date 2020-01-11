import React, { useContext, useEffect, useState } from 'react'
import FoodContext from "../context/food/foodContext"
import AuthContext from "../context/author/authContext"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';





const Stats = () => {
const foodContext = useContext(FoodContext);
const authContext = useContext(AuthContext);
const {loadUser, user} = authContext;
const { foods, getFoods, getWeek, date, parseDate, setDate} = foodContext;


const [check, setCheck] = useState({
  carbs: true,
  fat: true,
  goals: true
});




useEffect(()=> {
  loadUser();
    getFoods()

    //eslint-disable-next-line
  }, []);
  if(foods !== null && user !== null){
    var data = getWeek(date, user);
  }



  const onChange = (e)=>{setDate(e.target.value)}

  const onCheck = (e)=>setCheck({...check, [e.target.name]: e.target.checked})

  const today = new Date();


    return (
        <div id = "graph">
          <div className = "d-flex m-4">
          <label className = "ml-auto mr-1" htmlFor="start">Select end date:</label>
   
          <input className = "mr-1" type="date" id="start" name="day"
            defaultValue = {date}
            onChange = {onChange}
            min="2020-01-01" max={parseDate(today)} /> 
          
          <input className = "m-2" checked = {check.carbs} onChange = {onCheck} type="checkbox" name="carbs" value="carbs"/> <label htmlFor = "carbs"> carbs</label>
          <input className = "m-2"  checked = {check.fat} onChange = {onCheck} type="checkbox" name="fat" value="fat"/> <label  htmlFor = "fat"> fat</label>
          <input className = "m-2"  checked = {check.goals} onChange = {onCheck} type="checkbox" name="goals" value="goals"/> <label className = "mr-auto" htmlFor = "goals"> Show Goal</label>
          </div>
          <div className = "d-flex">
          <div className = "m-auto">
          <LineChart width={800} height={400} data={data}>
          {check.carbs && <Line type="monotone" dataKey="carbs" stroke="#8884d8" /> }
          {check.carbs && check.goals && <Line type="dashed" dataKey="carbsGoal" stroke="#8884d8" /> }
          {check.fat &&<Line type="monotone" dataKey="fat" stroke="#000" />}
          {check.fat && check.goals && <Line type="dashed" dataKey="fatGoal" stroke="#000" />}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
          </div>

          </div>
          <div className = "d-flex">
            <div className = "m-auto">
              <h2>Instructions:</h2>
            <p className = "max">Above you can track your daily intake of both fat and carbs over
            the last week. Simply enter the last day you would like to see and
            end check the type of information you would like to track and the graph
            will populate with the full week previous to the date selected.
          </p>
            </div>
          </div>

                  
        </div>
    )
}

export default Stats
