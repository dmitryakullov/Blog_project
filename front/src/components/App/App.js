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
import logo from '../../icons/logo.png';
import Nav from '../Nav';
import Footer from '../Footer';
import MainPage from '../MainPage';


const Ddd = () => {
    return <h1>iuygfgeer</h1>;
}



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

                        </Switch>

                    </section>
                    <Footer/>
                </div>
            </React.Fragment>
        )
    }
};