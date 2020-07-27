import React, {Component} from 'react';
import {Link} from "react-router-dom";


export default class EnterForm extends Component {
    render() {
        return (
            <div className='enter-form-bg'>
                <div className='enter-form'>
                    
                    <div className='d-flex w-100 justify-content-between align-items-start'>
                        <h2>Вход</h2>
                        <Link to='/'>
                            <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Link>
                    </div>

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
                        <Link to='/checkinform' className='react-Link'>
                            <button className="btn btn-outline-dark form-btn">Зарегистрироваться</button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}