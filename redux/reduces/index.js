import  {movieReducer}  from "./movieReducer";
import {userReducer} from './userReducer'
import {myListReducer} from './myListReducer'
import {createStore, combineReducers} from "redux";

export const rootReducer = combineReducers({
    movies : movieReducer,
    users : userReducer,
    myLists : myListReducer
});