import React, { useEffect } from 'react';
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

import mapDispatchToProps from '../actionsRedux';
import gotServices from '../gotService/gotService.js';



const mapStateToProps = (store) => ({...store});





function App(props) {
    const gotService = new gotServices();


    useEffect(()=>{
        const jwt = localStorage.getItem('superJWT_')

        if(jwt && !props.data) {
            gotService.getJWT(jwt)
                .then(res=> props.putStore(res), err=> console.log(err))
        } 
    })



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




























































// class App extends Component {
//     gotService = new gotService();

    
//     getUserByJWT = () => {
//         const jwt = localStorage.getItem('superJWT_')

//         if(jwt && !this.props.data) {

//             this.gotService.getJWT(jwt)
//                 .then(res=> this.props.putStore(res), err=> console.log(err))
//         } 
//     }


//     componentDidMount() {
//         this.getUserByJWT();
//     }
//     componentDidUpdate() {
//         this.getUserByJWT();
//     }




//     render() {
//         let ovnerId = this.props.data ? true: null;

//         return(
//             <>
//                 <div className='wrapper'>
//                     <div className='main-background'></div>
//                     <section className='main-part'>

//                         <Nav ovnerHere={ovnerId} />

//                         <Switch>

//                             <Route exact path='/'>
//                                 <MainPage/>
//                             </Route>

//                             <Route exact path='/searching'>
//                                 <SearchInfo/>
//                             </Route>

//                             <Route exact path='/user/:id' render={({match}) => (
//                                     <UserPage idU={match}/>
//                             )}/>

//                             <Route path='/owner'>
//                                 <UserPageOwner/>
//                             </Route>
                                
//                             <Route path='/users/get'>
//                                 <EnterForm/>
//                             </Route>

//                             <Route path='/createpost'>
//                                 <CreatePost/>
//                             </Route>

//                             <Route path='/users/new'>
//                                 <CheckInForm/>
//                             </Route>

//                             <Route path="*">
//                                 <MainPage/>
//                             </Route>

//                             <Redirect to="/"/>
//                         </Switch>

//                     </section>
//                     <Footer/>
//                 </div>
//             </>
//         )
//     }
// };

// export default connect( mapStateToProps, mapDispatchToProps )(App);