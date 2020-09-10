import axios from 'axios';
import { SET_CURRENT_USER } from '../actions/types';
import jwt_decode from 'jwt-decode';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { setCurrentUser } from '../actions/authActions'
//import console = require('console');

export const registerUser = (user, history) => dispatch => {

    axios.post('/users/register', user)
        .then(res => {
            if (res.data.succes) {
                confirmAlert({
                    message: 'Admin Added ',
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () =>history.push('/users')
                        },
                    ]
                })


               // history.push('/users')
            }
            else {
                confirmAlert({
                    message: 'Email already in use',
                    buttons: [
                        {
                            label: 'Ok',
                        },
                    ]
                })
            }
        }
        )

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

export const loginUser = (user) => dispatch => {
    axios.post('/users/login', user)
        .then(res => {
            if (res.data.succes) {
                if (res.data.admin) {
                    const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                }
                else {
                    confirmAlert({
                        title: '',
                        message: 'Only Admin have acces to this app',
                        buttons: [
                            {
                                label: 'Ok',
                            },
                        ]
    
                    })
                }

            }
            else {
                confirmAlert({
                    title: '',
                    message: 'The email adress or password provided is incorrect',
                    buttons: [
                        {
                            label: 'Ok',
                        },
                    ]

                })
            }
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
