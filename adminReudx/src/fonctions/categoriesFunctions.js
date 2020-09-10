import axios from 'axios';
import {getSuggCatActions, getAllCatActions ,delCatAction, newCatActions,conCatActions, delSuggAction} from '../actions/categoriesActions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export const getAllCat = () => dispatch => {
    axios.get('/categories/getAll',{ headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwtToken'), 
 
      }})
    .then( res => {
       dispatch(getAllCatActions(res.data))
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


export const getSugg = () => dispatch => {
    axios.get('/categories/getNonConfirmer',{ headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwtToken'), 
 
      }})
    .then( res => {
       dispatch(getSuggCatActions(res.data))
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

export const delSugg = (id) => dispatch => {
    console.log(id)
    // axios.get('/categories/getAll',{ headers: {
    //     'Authorization': 'Bearer '+localStorage.getItem('jwtToken'), 
 
    //   }})
    // .then( res => {
    //    dispatch(delSuggAction(id))
    // })
    // .catch(err => {
    //     confirmAlert({
    //         message: 'Serveur Error Please Try Later',
    //         buttons: [
    //             {
    //                 label: 'Ok',
    //             },
    //         ]
    //     })
    // });
}


export const delCat = (id) => dispatch => {
    axios.get('/categories/getAll',{ headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwtToken'), 
 
      }})
    .then( res => {
       dispatch(delCatAction(id))
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


export const conCat = (id) => dispatch => {
    axios.post('/categories/update/'+id)
    .then(res=> {
        dispatch(conCatActions(id))
       // console.log(id)
    })
    // dispatch(newCatActions(data))
}

export const newCat = (data) => dispatch => {
    axios.post('/categories/createByAdmin', data)
    .then(res=> {
        dispatch(newCatActions(res.data.cat))
    })
    // dispatch(newCatActions(data))
}