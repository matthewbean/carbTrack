import React, { useContext } from 'react';
import FoodContext from '../../context/food/foodContext';
import AuthContext from '../../context/author/authContext';

const DailyTotalCarbs = () => {
    const foodContext = useContext(FoodContext);
    const authContext = useContext(AuthContext);
    const { getTotalCarbs, getTotalFat } = foodContext
    const { user, changeShowChange } = authContext;
    return (
        <div className = "bg-light px-2 my-2  border rounded">
            <div className = "p-1">
                Daily Carbs: {getTotalCarbs()} {user && "/" +user.carbsGoal}
            </div>
            <div className = "p-1">
                Daily Fat: {getTotalFat()} {user && "/" + user.fatGoal}
            </div>
            <div className = "small-text">
                Time to change your goals? <button className = "btn btn-link small-size small-text"  onClick = {changeShowChange}>Click here</button>
            </div>
        </div>
    )
}




export default DailyTotalCarbs
