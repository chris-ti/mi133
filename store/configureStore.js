import { createStore, combineReducers,applyMiddleware } from "redux"
import auth from "../reducers/auth_reducer"
import {userList} from "../reducers/admin"
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import { routerReducer } from 'react-router-redux';
import {logBook} from "../reducers/admin"

const store = createStore(combineReducers({
    auth, logBook,userList
        ,routing: routerReducer
    }),
    {},
    applyMiddleware(thunk, logger));

export default store;
export const history = syncHistoryWithStore(browserHistory, store);