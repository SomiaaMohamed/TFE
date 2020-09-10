import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,
        })
        .then(res => {
            console.log('Registered!')
        })
        
}
/*
export const login = user => {
    return axios
        .post('http://192.168.56.1:5000/users/login', {
            email: user.email,
            password: user.password,
            
        })
       alert(user.email)
        
        .then(res => {
            alert('je suis dans le service'+res.data.error)
            localStorage.setItem('usertoken', res.data.token)
            localStorage.setItem('email', res.data.user.email)

            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

*/

