import {createStore} from "redux"
import React from 'react'
import ReactDOM from 'react-dom'
import Loginview from './Loginview'
import reducer from '../model/reducer'

//isloogedin--> isadmin, conditional rendering here?

const store = createStore(reducer);

export default class App extends React.Component {
    render() {
        return <div className="root component">
            <Loginview/>
        </div>
    }
}

ReactDOM.render(
<div className="pageContent">
<App/>
</div>,
document.getElementById('root'))
