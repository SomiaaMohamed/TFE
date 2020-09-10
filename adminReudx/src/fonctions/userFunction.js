import axios from 'axios';
import { GET_ALL_USERS,DELETE_USER, GET_USER } from '../actions/types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getAllActions,deleteUserActions,getUserAction } from '../actions/usersActions'

export const getAllUsers =() => dispatch => {

    axios.get("/users/getAll", { headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwtToken'), 
 
      }})   
    .then(res=>{
        console.log(res)
        dispatch(getAllActions(res.data))
    })
    .catch(err => {
        confirmAlert({
            message: 'Serveur Error Please Try Later',
            buttons: [
                {
                    label: 'Ok',
                },
            ]
        })
    });
}
export const updateUser = (user,history) => dispatch => {
    
    if(!user.email){

        confirmAlert({
                     message:  ' email is required',
                     buttons: [
                         {
                             label: 'Ok',
                            
                         },
                     ]
                 })


    }

    else {

    history.push('/users')
     axios.post('/users/update/'+user.id,user)
     .then(res=> {
         confirmAlert({
             message: user.email+ ' Updated',
             buttons: [
                 {
                     label: 'Ok',
                     onClick: () => history.push('/users')
                 },
             ]
         })
     })
     .catch(err => {
         confirmAlert({
             message: 'Please check your server',
             buttons: [
                 {
                     label: 'Ok',
                 },
             ]
         })
     })
    }
 } 

 export const deleteUser =(id) => dispatch => {
    axios.delete("/users/"+id)   
    .then(res=>{
         dispatch(deleteUserActions(id))
         confirmAlert({
            message: 'User Deleted ',
            buttons: [
                {
                    label: 'Ok',
                },
            ]
        })

    })
    .catch(err => {
        confirmAlert({
            message: 'Serveur Error Please Try Later',
            buttons: [
                {
                    label: 'Ok',
                },
            ]
        })
    });

 
}

export const getUser =(email) => dispatch => {
    dispatch(getUserAction(email))
 
}



