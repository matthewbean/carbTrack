import React, { useReducer } from 'react';
import foodReducer from './foodReducer';
import FoodContext from './foodContext';
import axios from 'axios';
import{
    ADD_FOOD,
    FOOD_ERROR,
    GET_FOODS,
    DELETE_FOOD,
    CLEAR_FOODS,
    CHANGE_DATE
} from '../types'



const FoodState = props => { 


const getWeek = (base, user)=>{

        let result = [];
    for( let i = 6; i >= 0; i--){
        let prev_date = new Date(unparseDate(base));
        let new_date = new Date(prev_date.setDate(prev_date.getDate() - i));
        new_date = parseDate(new_date);
        getTotalCarbs(new_date);
        let item = {"date":new_date.substring(5,11), 
        "fat":getTotalFat(new_date), 
        "carbs": getTotalCarbs(new_date), 
        "carbsGoal": user.carbsGoal, 
        "fatGoal": user.fatGoal};
        result.push(item)
    }



    return result;

}







const unparseDate = (y)=>{
    return(y.split("-"));
}

const parseDate = (x)=>{
let year = x.getFullYear().toString();
let month = (x.getMonth() + 1);
let day = x.getDate();
if(month < 10){
    month = "0" + month.toString();
}else{
    month = month.toString();
}
if(day < 10){
    day = "0" + day.toString();
}else{
    day = day.toString();
}

return `${year}-${month}-${day}`

}
const today = new Date();


    const initialState = 
        {
            foods:null,
            error: null,
            date: parseDate(today),
            week:[]

        
        };
    const [state, dispatch] = useReducer(foodReducer, initialState);
        //Set Date
        const setDate = (newDate)=>{
            dispatch({
                type:CHANGE_DATE,
                payload:newDate
            })
        }

    //Get Foods
    const getFoods = async () => {


        try {
            
            const res = await axios.get('/api/foods');
            dispatch({ type: GET_FOODS, 
                payload:res.data });
        
        } catch (err) {
            dispatch({ type: FOOD_ERROR,
            payload: err})
        }
        
    }



    //Add a food
    const addFood = async food => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/foods', food, config);
            dispatch({ type: ADD_FOOD, 
                payload:res.data });
        
        } catch (err) {
            dispatch({ type: FOOD_ERROR,
            payload: err.response.msg})
        }
        
    }


    //Delete a food
    const deleteFood = async id => {

        try {
            await axios.delete(`/api/foods/${id}`);
            dispatch({ type: DELETE_FOOD, 
                payload:id });
        
        } catch (err) {
            dispatch({ type: FOOD_ERROR,
            payload: err.response.msg})
        }
        
    }
    //Clear Foods
        const clearFoods = ()=>{
            dispatch({
                type: CLEAR_FOODS
            })
        }


    //get daily totals

    const getTotalCarbs = (time = state.date)=>{

        let x = 0;
        state.foods.filter(food=>parseDate(new Date(food.date)) === time).forEach(food => {
            x += parseInt(food.carbs);
        });
        return x
    }
    const getTotalFat = (time = state.date)=>{
        let y = 0;
        state.foods.filter(food=>parseDate(new Date(food.date)) === time).forEach(food => {
            y += parseInt(food.fat);
        });
        return y
    }


    return (
        <FoodContext.Provider
        value = {{
            foods: state.foods,
            dailyTotal: state.dailyTotal,
            date: state.date,
            getTotalCarbs,
            getFoods,
            addFood,
            deleteFood,
            clearFoods,
            getTotalFat,
            setDate,
            parseDate,
            unparseDate,
            getWeek
        }}
        >
            {props.children}
        </FoodContext.Provider>
    )
}

export default FoodState
