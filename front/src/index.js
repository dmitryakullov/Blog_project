import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";


import { Provider } from 'react-redux';
import { createStore } from 'redux';




const initialState = {
	data: null
}
const reducer = (state = initialState, action) => {
	if (action.type === 'CLEAN_STATE') {
		return {data: null}
	} else if (action.type === 'SET_STATE'){
		return  {...action.userData}
	} else
		return state;
}


const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root'));

