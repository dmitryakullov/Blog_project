import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

import mapDispatchToProps from '../actionsRedux';
import gotService from '../gotService/gotService.js';
import WarnMessage from '../WarnMessage';


class EnterForm extends Component {
    gotService = new gotService();

    state = {
        email: '',
        password: '',
        validate: true,
        disabled: false,
    }

    inputEmailChange = (event) => {
        this.setState({
            email: event.target.value,
            validate: true
        });
    }
    
    inputPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            validate: true
        });
    }

    registerUser =() => {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (this.state.password.length >= 4 && reg.test(this.state.email)) {
            this.setState({disabled: true})

            this.gotService.makeEnter(this.state.email, this.state.password)
                .then(res=> {
                    if (res.msg === 'SOMETHING_WRONG'){
                        this.setState({disabled: false, validate: false})
                    } else {
                        localStorage.setItem('superJWT_', res.token);
                        const {_id, nick, email, avatar, active, admin} = res

                        this.props.putState({data: {_id, nick, email, avatar, active, admin}})
                        let a = document.getElementById('linkEnterForm');
                        a.click()
                        
                    }
                })
                .catch(err=> console.log(err))

        } else {
            this.setState({validate: false})
        }
    }





    render() {
        


        return (
            <div className='enter-form-bg'>
                <div className='enter-form my-enter-form'>
                    
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

                        <input 
                            onChange={this.inputEmailChange}
                            value={this.state.email}
                            type="email" className="form-control"
                            id="inputEmail1" aria-describedby="emailHelp"/>

                    </div>


                    <div className="form-group">
                        <label htmlFor="inputPassword1">Пароль</label>

                        <input 
                            onChange={this.inputPasswordChange}
                            value={this.state.password}
                            type="password" className="form-control"
                            id="inputPassword1"/>
                        <span className='form-hint'>Пароль должен содержать минимум 4 символа</span>

                    </div>


                    <div className='form-wrap-btn'>

                        {this.state.validate ? 
                                <button disabled={this.state.disabled} onClick={this.registerUser} className="btn btn-primary form-btn">Войти</button>
                                            :
                            <WarnMessage msg='Некоректный пароль или email'/>
                        }

                        <Link to='/users/new' className='react-Link'>
                            <button className="btn btn-outline-dark form-btn">Зарегистрироваться</button>
                        </Link>
                    </div>
                    <Link id='linkEnterForm' to="/" ><div></div></Link>;
                </div>
            </div>
        )
    }
}

export default connect( null, mapDispatchToProps )(EnterForm);