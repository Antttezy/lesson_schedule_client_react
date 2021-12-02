import { AUTHENTICATION } from "./constants"

const initialState = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }

        case AUTHENTICATION.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null,
                refreshToken: null
            }

        default:
            return state
    }
}
