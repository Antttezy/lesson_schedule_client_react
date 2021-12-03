import { AUTHENTICATION } from "./constants"

const initialState = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    role: null
}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                role: action.payload.role
            }

        case AUTHENTICATION.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null,
                refreshToken: null,
                role: null
            }

        case AUTHENTICATION.UPDATE_ACCESS:
            return {
                ...state,
                accessToken: action.payload
            }

        default:
            return state
    }
}
