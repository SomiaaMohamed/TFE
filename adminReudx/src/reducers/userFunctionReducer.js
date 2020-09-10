import { GET_ALL_USERS, DELETE_USER, GET_USER } from '../actions/types';

const initialState ={
    users :[],
    user:''
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ALL_USERS:
            return {
               // ...state,
                users: action.payload.data,
            }
           
            case DELETE_USER:
            let newUsers = state.users.filter(user=>{
                return action.payload.id !== user._id
            })
            return {
                ...state,
                users:newUsers
            }
            case GET_USER:
            let newUser = state.users.filter(user=>{
                return action.payload.email === user.email
            })
            return {
                ...state,
                user:newUser[0]
               
            }
        default: 
       
            return state;
    }
}