import { createStore, combineReducers } from 'redux'
import { authenticationReducer } from './authentication/reducers'

export const store = createStore(combineReducers(
    {
        authenticationReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
