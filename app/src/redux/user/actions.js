import { USER } from "./constants";

export function setData(userData) {
    return {
        type: USER.SET_DATA,
        payload: userData
    }
}

export function clearAll() {
    return {
        type: USER.CLEAR
    }
}
