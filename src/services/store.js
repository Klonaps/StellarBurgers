import { rootReducer } from './reducers'
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhancer)