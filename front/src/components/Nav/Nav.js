import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../../icons/logo.png'
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
            <Link to='/'>
                <div className='nav-profile'>
                    <img src={usersPicture} alt='Profile icon'/>
                </div>
            </Link>
        )
    }
}



export default class Nav extends Component {
    
    render () {

        console.log(this.props)

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
                        
                        {this.props.ovnerHere ? <Link to={`/user/${this.props.ovnerHere}`} className='react-Link'>
                                                <Profile/>
                                            </Link> :

                                            <Link to='/enterform' className='react-Link'>
                                            <EnterButton/>
                                            </Link>
                        }

                    </div>
                </nav>
            </header>
        )
    }
}