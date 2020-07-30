import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";

import { createStore } from 'redux';
import { Provider } from 'react-redux';




const reducer = (state = {data: null}, action) => {
	switch (action.type) {
		case 'CLEAN_STATE':
			return {data: null};
		case 'SET_STATE':
			return {data: action.userData}
		default:
			return state
	}
}

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root'));

