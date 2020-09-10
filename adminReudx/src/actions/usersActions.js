import { GET_ALL_USERS, DELETE_USER, GET_USER } from './types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


export const getAllActions = data => {
    return {
        type: GET_ALL_USERS,
        payload: { data }
    }
}

export const getUserAction = email => {
    return {
        type: GET_USER,
        payload: { email }
    }
}

export const deleteUserActions = id => {
    return {
        type: DELETE_USER,
        payload: { id }
    }
}