import { USER } from "./constants";

const initialState = {
    id: null,
    firstName: null,
    secondName: null,
    group: null,
    position: null,
    isLoggedIn: false
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER.SET_DATA:
            return {
                ...state,
                id: action.payload.id,
                firstName: action.payload.firstName,
                secondName: action.payload.secondName,
                group: action.payload.groupName,
                position: action.payload.position,
                isLoggedIn: true
            }

        case USER.CLEAR:
            return {
                ...state,
                id: null,
                firstName: null,
                secondName: null,
                group: null,
                position: null,
                isLoggedIn: false
            }

        default:
            return state;
    }
}
