import { AUTHENTICATION } from "./constants";

export const Login = (tokenObject) => {
    return {
        type: AUTHENTICATION.LOGIN,
        payload: tokenObject
    }
}

export const Logout = () => {
    return {
        type: AUTHENTICATION.LOGOUT
    }
}

export const UpdateAccessToken = (accessToken) => {
    return {
        type: AUTHENTICATION.UPDATE_ACCESS,
        payload: accessToken
    }
}