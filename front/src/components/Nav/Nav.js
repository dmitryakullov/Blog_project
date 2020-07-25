import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../../icons/logo.png'
import profileIcon from '../../icons/profile.png';


class EnterButton extends Component {
    render() {
        return (
            <button className='btn btn-outline-success'>Войти</button>
        )
    }
}

class ProfileIcon extends Component {
    render() {
        return (
            <Link to='#'>
                <div className='nav-profile'>
                    <img src={profileIcon} alt='Profile icon'/>
                </div>
            </Link>
        )
    }
}

class EnterForm extends Component {
    render() {
        return (
            <div className='enter-form-bg'>
                <div className='enter-form'>
                    <h2>Вход</h2>

                    <div className="form-group">
                        <label htmlFor="inputEmail1">E-mail</label>
                        <input type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword1">Пароль</label>
                        <input type="password" className="form-control" id="inputPassword1"/>
                    </div>

                    <div className='form-wrap-btn'>
                        <button className="btn btn-primary form-btn">Войти</button>
                        <button className="btn btn-outline-dark form-btn">Зарегистрироваться</button>
                    </div>

                </div>
            </div>
        )
    }
}

class CheckInForm extends Component {
    render() {
        return (
            <div className='enter-form-bg'>
                <div className='enter-form'>
                    <h2>Регестрация</h2>

                    <div className="form-group">
                        <label htmlFor="inputEmail2">E-mail</label>
                        <input type="email" className="form-control" id="inputEmail2" aria-describedby="emailHelp"/>
                    </div>

                    <div class="form-group">
                        <label for="inputText2">Никнейм</label>
                        <input type="text" class="form-control" id="inputText2"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword2">Пароль</label>
                        <input type="password" className="form-control" id="inputPassword2"/>
                    </div>

                    <div className='form-wrap-btn'>
                        <button className="btn btn-success form-btn">Зарегистрироваться</button>
                    </div>

                </div>
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
                        <EnterButton/>

                    </div>
                </nav>
            </header>
        )
    }
}