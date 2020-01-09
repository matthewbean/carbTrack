import React, { useContext } from 'react'
import FoodContext from '../../context/food/foodContext'

const DailyTotalCarbs = () => {
    const foodContext = useContext(FoodContext);
    const { getTotalCarbs, getTotalFat } = foodContext
    return (
        <div className = "bg-light px-2 my-2 row border rounded">
        <div className = "p-1">
Daily Carbs: {getTotalCarbs()}
        </div>
        <div className = "p-1 ml-auto">
        Daily Fat: {getTotalFat()}
        </div>
        </div>
    )
}




export default DailyTotalCarbs
