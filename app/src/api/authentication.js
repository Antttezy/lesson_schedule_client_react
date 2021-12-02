import axios from 'axios'

const authenticationUrl = process.env.REACT_APP_AUTHENTICATION_URL

export async function login(request) {
    try {
        let response = await axios.post(`${authenticationUrl}/login`, request)
        return response.data
    } catch(error) {
        throw {
            message: 'Wrong login or password'
        }
    }
}

export async function logout(request) {
    try {
        let response = await axios.post(`${authenticationUrl}/logout`, request)
    } catch(error) {
        throw error;
    }
}