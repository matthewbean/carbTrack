import{
    ADD_FOOD,
    FOOD_ERROR,
    GET_FOODS,
    DELETE_FOOD,
    CLEAR_FOODS,
    CHANGE_DATE
} from '../types';

export default (state, action)=>{
    switch(action.type){
        case ADD_FOOD:
            return{
                ...state,
                foods: [...state.foods, action.payload]
            }
        case GET_FOODS:
            return{
                ...state,
                foods: action.payload
            }
        case DELETE_FOOD:
            return{
                ...state,
                    foods: state.foods.filter(food => food._id !== action.payload)
            }
        case CLEAR_FOODS:
            return{
                ...state,
                foods: null
            }
        case FOOD_ERROR:
            return{
                ...state,
                error:action.payload
            }
        case CHANGE_DATE:
            return{
                ...state,
                date:action.payload
            }
        default:
            return state;
    }
}