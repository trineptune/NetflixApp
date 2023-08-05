import { GETALL_MOVIES, GET_MOVIE } from "../actions/movieActions";

const initialState = {
    movies:[],
}

export const movieReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case GETALL_MOVIES:
            return {
                ...state,
                movies:[...action.payload]
            }
        case GET_MOVIE:
            {
                console.log('action payload',action.payload)
            return {
                ...state,
                movies:[...state.movies,action.payload],
            }
        }
        default:
            return {...state}
    }
}