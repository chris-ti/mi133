import {createStore} from "redux"
import React from 'react'
import ReactDOM from 'react-dom'
import Loginview from './Loginview'
import {Provider} from 'react-redux'
import store from "../store/configureStore"
//const store = createStore(reducer);

export default class App extends React.Component {
    render() {
        return <div className="root component">
            <Loginview/>
        </div>
    }
}

ReactDOM.render(
    <Provider store={store}>
        <div className="pageContent">
        <Loginview/>
        </div></Provider>,
document.getElementById('root'));
