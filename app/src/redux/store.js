import { createStore, combineReducers } from 'redux'
import { authenticationReducer } from './authentication/reducers'
import { userReducer } from './user/reducers'

export const store = createStore(combineReducers(
    {
        authenticationReducer,
        userReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
