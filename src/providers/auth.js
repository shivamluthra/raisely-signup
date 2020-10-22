import { baseURL } from './endpoint.js'
import axios from 'axios'

const signup = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/signup`, body).then(res => {
            resolve(res.data.data)
        }).catch(err => reject(err.response.data.errors[0].message))
    })
}

const checkUser = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseURL}/check-user`, body).then(res => {
            if (res.data.data.status === 'EXISTS') {
                reject("Email already exists! Please try with another email.")
            } else {
                resolve(res.data.data)
            }
        }).catch(err => {})
    })
}

export { signup, checkUser }
