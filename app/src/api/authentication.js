import axios from 'axios'

const authenticationUrl = process.env.REACT_APP_AUTHENTICATION_URL

export async function login(request) {
    try {
        let response = await axios.post(`${authenticationUrl}/login`, request)
        return response.data
    } catch (error) {
        // eslint-disable-next-line
        throw {
            message: 'Wrong login or password'
        }
    }
}

export async function logout(request) {
    try {
        await axios.post(`${authenticationUrl}/logout`, request)
    } catch (error) {
        throw error;
    }
}

export async function getAccessToken(refreshToken) {
    try {
        let response = await axios.post(`${authenticationUrl}/refresh`, {
            refreshToken
        })
        return response.data.accessToken
    } catch (error) {
        throw error;
    }
}
