import { createStore, combineReducers,applyMiddleware } from "redux"
import auth from "../reducers/auth_reducer"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import { routerReducer } from 'react-router-redux';
import {logBook} from "../reducers/admin"

const store = createStore(combineReducers({
    auth, logBook
        ,routing: routerReducer
    }),
    {},
    applyMiddleware(thunk, logger));

export default store;
export const history = syncHistoryWithStore(browserHistory, store);