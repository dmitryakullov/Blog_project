import React, {Component} from 'react';
import {Link} from "react-router-dom";






export default class CheckInForm extends Component {
    render() {
        return (
            <div className='enter-form-bg'>
                <div className='enter-form'>
                    <div className='d-flex w-100 justify-content-between align-items-start'>
                        <h2>Регестрация</h2>
                        <Link to='/'>
                            <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Link>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputEmail2">E-mail</label>
                        <input type="email" className="form-control" id="inputEmail2" aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputText2">Никнейм</label>
                        <input type="text" className="form-control" id="inputText2"/>
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