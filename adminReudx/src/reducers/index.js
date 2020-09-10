import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userFunctionReducer from './userFunctionReducer';
import categoriesReducer from './categoriesReducer'

export default combineReducers({
    auth: authReducer,
    userFunctionReducer: userFunctionReducer,
    categoriesReducer: categoriesReducer
});