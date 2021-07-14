import { combineReducers } from "redux";
import detailReducer from "../modules/details/reducer";
import authReducer from "../modules/auth/reducer";


//Reducers
import movieReducer from '../modules/home/reducer';
import profileReducer from "../modules/profile/reducer";

const reducer = combineReducers({
    movie:movieReducer,
    detail:detailReducer,
    user:authReducer,
    profile:profileReducer
})
export default reducer;