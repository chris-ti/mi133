
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store, {history} from "../store/configureStore"
import routes from '../routes/routes';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import {Router} from 'react-router'


//const store = createStore(reducer);

export default class App extends React.Component {
    render() {
        return <div className="root component">
          </div>
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}>
        </Router>
    </Provider>,
document.getElementById('root'));
