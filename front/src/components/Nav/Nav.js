import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../../icons/logo.png'
import searchIcon from '../../icons/search.png';
import usersPicture from '../../icons/profile-picture.png';


class EnterButton extends Component {
    render() {
        return (
            <button className='btn btn-outline-success'>Войти</button>
        )
    }
}

class Profile extends Component {
    render() {
        return (
            <div className='nav-profile'>
                <img src={usersPicture} alt='Profile icon'/>
            </div>
        )
    }
}



export default class Nav extends Component {
    render () {

        return (
            <header>
                <nav className="nav-bar bg-dark">
                    <div className='container d-flex justify-content-between align-items-center position-relative'>

                        <Link to='/' className='react-Link'>
                            <div className='nav-logo'>
                                <img src={logo} alt='Logotype'/>
                            </div>
                            <span className='nav-logo-text'>ProBird</span>
                        </Link>
                        
                        <div className='d-flex'>
                            <Link  to='/searching' className='react-Link'>
                                <div className='search-icon d-flex justify-content-center align-items-center'>
                                    <img src={searchIcon} alt='search icon'/>
                                </div>
                            </Link>

                            {this.props.ovnerHere ? <Link to='/owner' className='react-Link'>
                                                        <Profile/>
                                                    </Link> :

                                                <Link to='/users/get' className='react-Link'>
                                                    <EnterButton/>
                                                </Link>
                            }
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}