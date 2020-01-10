import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../../context/food/foodContext';

const FoodItem = ({ food }) => {


    const foodContext  = useContext(FoodContext);
    const { deleteFood } = foodContext;
    const { name, carbs, fat, _id} = food;

    const onDelete = ()=>{
        deleteFood(_id)
    }

    return (
        <li className = "list-unstyled bg-light px-2 my-2 border rounded ">

            <div className = "   d-flex">
            <div >Food: {name}  </div>
            <div className = "ml-auto">Carbs: {carbs} </div>
            </div>


            <div className = "d-flex">
            <button className = "btn btn-danger btn-sm" onClick = {onDelete} >
            <i className="far fa-trash-alt"></i>
                </button>
                <div className = "ml-auto">Fat: {fat}</div>
            </div>
        </li>
    )
}
FoodItem.propTypes = {
    food: PropTypes.object.isRequired
}


export default FoodItem
