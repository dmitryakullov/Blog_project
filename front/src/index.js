import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';




const initialState = {
	data: null,
	addSkip: 20,
	mainPage: {
		postsArr: [],
        searchPostArr: [],
        skip: 0,
		amountPosts: null,
	},
	userPage: {
		postsArr: [],
        skip: 0,
        user: {},
        amountPosts: null
	},
	ownerPage: {
        skip: 0,
        postsArr: [],
        amountPosts: null
	}
}

const reducer = (state = initialState, action) => {
	
	if (action.type === 'CLEAN_STATE') {
		return {...state, ...{data: null}}
	}
	else if (action.type === 'PUT_STATE'){
		return  {...state, ...{data: action.userData}}
	}
	else if (action.type === 'PUT_MAIN_PAGE_STATE'){
		return  {...state, ...{mainPage: {...state.mainPage, ...action.mainPageStore}}}
	}
	else if (action.type === 'PUT_USER_PAGE_STATE'){
		return  {...state, ...{userPage: {...state.userPage, ...action.userPageStore}}}
	}
	else if (action.type === 'PUT_OWNER_PAGE_STATE'){
		return  {...state, ...{ownerPage: {...state.ownerPage, ...action.ownerPageStore}}}
	}
	else
		return state;
}


const store = createStore(reducer, applyMiddleware(thunk));




ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root'));

