import { CREATE_USER, GET_USER, LOGIN, LOGOUT, LOGIN_FAIL, EXTEND_USER } from "../actions/userActions";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
const initialState = {
    users:[],
}

export const userReducer = (state = initialState, action) => {
    switch(action.type)
    {
        // case GET_USER:
        //     let item = {
        //         firstName: action.payload.firstName,
        //         lastName: action.payload.lastName,
        //         email: action.payload.email,
        //         password: action.payload.password,
        //         timeExpired : action.payload.timeExpired,
        //     }
        //     let dbuser2 = [...state.users,item]
        //     // AsyncStorage.clear()
        //     AsyncStorage.setItem('user',JSON.stringify(dbuser2))
        //     return {
        //         ...state, 
        //         users:dbuser2
        //     }
        case CREATE_USER:
            return{
                ...state,
                users:[...state.users,action.payload]
            }
        case LOGIN:
            {  
                let newuser = {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    password: action.payload.password,
                    timeExpired : action.payload.timeExpired,
                }
                let dbuser = [...state.users,newuser]
                // AsyncStorage.clear()
                AsyncStorage.setItem('user',JSON.stringify(dbuser))
                console.log(dbuser)
                return{
                    ...state,
                    users:dbuser,
                }
            }
        case EXTEND_USER:
            {
                return{
                    ...state,
                }
            }
        case LOGIN_FAIL:
            {
                AsyncStorage.clear()
                return{
                    ...state,
                }
            }
        default:
            return {...state}
    }
}
