import axios from 'axios';
import { SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}));
    history.push('/login');
}