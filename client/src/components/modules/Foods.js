import React, { useContext, useEffect } from 'react';
import FoodItem from './FoodItem';
import FoodContext from '../../context/food/foodContext';
import AuthContext from '../../context/author/authContext';
import DailyTotals from './DailyTotals';



const Foods = () => {
    const foodContext = useContext(FoodContext);
    const authContext = useContext(AuthContext);

    const{ user } = authContext;
    
    const { foods, getFoods, setDate, date, parseDate, unparseDate } = foodContext;
    const today = new Date();
    
    
    useEffect(()=> {
        getFoods();
        

        //eslint-disable-next-line
      }, []);

      if(foods === null || foods.length ===0 ){
        return<h4>Please add a food</h4>
      }
      
      const onChange = (e)=>{setDate(e.target.value)}



    return (
        <div className = "col-sm container">
                 
             <label htmlFor="start">Select date:</label>
   
         <input type="date" id="start" name="day"
        defaultValue = {date}
        onChange = {onChange}
        min="2020-01-01" max={parseDate(today)} /> 
        

        
        <ul className = "normal">
            {foods.filter(food=>parseDate(new Date(food.date)) === date).map(food=>(
                <FoodItem food = {food} key = {food._id}/>
            ))}
            
        </ul>
        
        <DailyTotals />
        
        </div>
    )
        }
export default Foods
