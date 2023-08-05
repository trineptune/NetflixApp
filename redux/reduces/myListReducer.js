import {GETALL_MYLIST} from '../actions/myListActions'

const initialState = {
    myList:[],
}

export const myListReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case GETALL_MYLIST:
            return {
                ...state,
                myList:[action.payload]
            }
        default:
            return {...state}
    }
}