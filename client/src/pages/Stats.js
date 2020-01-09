import React, { useContext, useEffect, useState } from 'react'
import FoodContext from "../context/food/foodContext"
import AuthContext from "../context/author/authContext"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';





const Stats = () => {
const foodContext = useContext(FoodContext);
const authContext = useContext(AuthContext);
const {loadUser} = authContext;
const { foods, getFoods, getWeek, date, parseDate, setDate} = foodContext;


const [check, setCheck] = useState({
  carbs: true,
  fat: true
});




useEffect(()=> {
  loadUser();
    getFoods()

    //eslint-disable-next-line
  }, []);
  if(foods !== null){
    var data = getWeek(date);
  }



  const onChange = (e)=>{setDate(e.target.value)}

  const onCheck = (e)=>setCheck({...check, [e.target.name]: e.target.checked})

  const today = new Date();


    return (
        <div id = "graph">
          <label htmlFor="start">Select end date:</label>
   
          <input type="date" id="start" name="day"
            defaultValue = {date}
            onChange = {onChange}
            min="2020-01-01" max={parseDate(today)} /> 
          
          <input checked = {check.carbs} onChange = {onCheck} type="checkbox" name="carbs" value="carbs"/> carbs
          <input checked = {check.fat} onChange = {onCheck} type="checkbox" name="fat" value="fat"/> fat
          
          <LineChart width={800} height={400} data={data}>
          {check.carbs && <Line type="monotone" dataKey="carbs" stroke="#8884d8" /> }
          {check.fat &&<Line type="monotone" dataKey="fat" stroke="#000" />}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
                  
        </div>
    )
}

export default Stats
