import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

import Nav from '../Nav';
import Footer from '../Footer';
import MainPage from '../MainPage';
import EnterForm from '../EnterForm';
import CheckInForm from '../CheckInForm';
import UserPage from '../UserPage';
import UserPageOwner from '../UserPageOwner';
import CreatePost from '../CreatePost';
import SearchInfo from '../SearchInfo';
import AdminPage from '../AdminPage';
import EditProfile from '../EditProfile';

import mapDispatchToProps from '../actionsRedux';
import gotServices from '../gotService/gotService.js';



const mapStateToProps = (store) => ({...store});




// AUTH_LOGIN - приходит токен
// редьюсер его парсит, возвращает это в хранилище
// +локалсторедж
// AUTH_LOGOUT - empty {}, localStorage.removeItem

// on load (just in global scope, below createStore(..))
// if localstorage contains token, dispatch AUTH_LOGIN with localstorage token


function App(props) {
    const gotService = new gotServices();

    const [myInterval, setMyInterval] = useState(-1);

    useEffect(()=>{
        const jwt = localStorage.getItem('superJWT_');

        if(jwt && !props.data) {
            gotService.getJWT(jwt)
                .then(res=> {
                    if (res.msg === 'BLOCKED' || res.msg === 'NOT_FOUND') {
                        localStorage.removeItem('superJWT_');
                    } else {
                        return props.putStore(res)
                    }
                })
                .catch(err=> console.log(err));
        } 
    })

    useEffect(()=>{
        const jwt = localStorage.getItem('superJWT_');
        clearInterval(myInterval);

        if (jwt && props.data && props.data.token) {
            
            const intervalMark = setInterval(async ()=>{
                await setMyInterval(intervalMark);

                gotService.trackUser(props.data.token)
                    .then(res=> {
                        if (res.msg === 'ALL_OK') {

                        } else if (res.msg === 'CLEAN_STORE') {

                            clearInterval(myInterval);
                            localStorage.removeItem('superJWT_');
                            props.cleanStore();

                        } 
                        else {
                            console.log('Error in trackUser')
                        }
                    })
                    .catch(err=> console.log(err));
            }, 5000)
        }
    }, [props.data])


    useEffect(()=>{
        return ()=> clearInterval(myInterval);
    }, [])

    return(
        <>
            <div className='wrapper'>
                <div className='main-background'></div>
                <section className='main-part'>

                    <Nav owner={props.data} />

                    <Switch>

                        <Route exact path='/'>
                            <MainPage/>
                        </Route>

                        <Route exact path='/user/editprofile'>
                            <EditProfile/>
                        </Route>

                        <Route exact path='/searching'>
                            <SearchInfo/>
                        </Route>

                        <Route exact path='/user/:id' render={({match}) => (
                                <UserPage idU={match}/>
                        )}/>

                        <Route path='/owner'>
                            <UserPageOwner/>
                        </Route>

                        <Route path='/adminpage'>
                            <AdminPage/>
                        </Route>
                            
                        <Route path='/users/get'>
                            <EnterForm/>
                        </Route>

                        <Route path='/createpost'>
                            <CreatePost/>
                        </Route>

                        <Route path='/users/new'>
                            <CheckInForm/>
                        </Route>

                        <Route path="*">
                            <MainPage/>
                        </Route>

                        <Redirect to="/"/>
                    </Switch>

                </section>
                <Footer/>
            </div>
        </>
    )

};

export default connect( mapStateToProps, mapDispatchToProps )(App);