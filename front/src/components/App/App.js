import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
} from "react-router-dom";

import { connect } from 'react-redux'


import Nav from '../Nav';
import Footer from '../Footer';
import MainPage from '../MainPage';
import EnterForm from '../EnterForm';
import CheckInForm from '../CheckInForm';
import UserPage from '../UserPage';
import AdminPage from '../AdminPage';

import actionsRedux from '../actionsRedux';


const mapStateToProps = (state) => state;




class App extends Component {

    state = {
        data: null
    }

    componentDidMount() {
        const jwt = localStorage.getItem('superJWT_')
        if(jwt) {

        }
        console.log(this.props)
        
    }

    render() {

        let ovnerId = this.state.data ? this.state.data._id: null;

        return(
            <>
                <div className='wrapper'>
                    <div className='main-background'></div>
                    <section className='main-part'>
                        <Nav ovnerHere={ovnerId}/>

                        <Switch>

                            <Route exact path='/'>
                                <MainPage/>
                            </Route>

                            <Route exact path='/user/:id'>
                                <UserPage/>
                            </Route>
                                
                            <Route path='/enterform'>
                                <EnterForm/>
                            </Route>

                            <Route path='/checkinform'>
                                <CheckInForm/>
                            </Route>

                            <Route path='/adminpage' >
                                <AdminPage/>
                            </Route>

                            <Redirect to="/"/>
                        </Switch>

                    </section>
                    <Footer/>
                </div>
            </>
        )
    }
};

export default connect( mapStateToProps, actionsRedux )(App);