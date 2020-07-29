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
import Nav from '../Nav';
import Footer from '../Footer';
import MainPage from '../MainPage';
import EnterForm from '../EnterForm';
import CheckInForm from '../CheckInForm';
import UserPage from '../UserPage';
import AdminPage from '../AdminPage';





export default class App extends Component {
    render() {
        return(
            <React.Fragment>
                <div className='wrapper'>
                    <div className='main-background'></div>
                    <section className='main-part'>
                        <Nav/>

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
            </React.Fragment>
        )
    }
};