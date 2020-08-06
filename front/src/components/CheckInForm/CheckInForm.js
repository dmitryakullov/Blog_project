import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

import mapDispatchToProps from '../actionsRedux';
import gotService from '../gotService/gotService.js';
import WarnMessage from '../WarnMessage';





class CheckInForm extends Component {
    gotService = new gotService();

    state = {
        email: '',
        password: '',
        nick: '',
        validate: true,
        disabled: false,
        haveExistYet: false
    }

    inputEmailChange = (event) => {
        this.setState({
            email: event.target.value,
            validate: true,
            haveExistYet: false
        });
    }

    inputNickChange = (event) => {
        this.setState({
            nick: event.target.value,
            validate: true,
            haveExistYet: false
        });
    }
    
    inputPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            validate: true,
            haveExistYet: false
        });
    }



    registerUser =() => {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (this.state.password.length >= 4 && 
            reg.test(this.state.email) &&
            this.state.nick.length > 0) 
            
            {
            this.setState({disabled: true})

            this.gotService.makeCheckIn( this.state.nick, this.state.email.toLocaleLowerCase(), this.state.password)
                .then(res=> {
                    if (res.msg === 'USER_OR_EMAIL_EXIST'){
                        this.setState({disabled: false, haveExistYet: true , validate: false})

                    } else {
                        localStorage.setItem('superJWT_', res.token);
                        const {_id, nick, email, avatar, active, admin} = res
                        this.props.putStore({data: {_id, nick, email, avatar, active, admin}})
                        window.location = "/";
                    }
                })
                .catch(err=> console.log(err))

        } else {
            this.setState({validate: false})
        }
    }




    render() {

        let msg = this.state.haveExistYet ? 'Юзер с таким ником или эмейлом уже существует!' : 'Некоректный пароль, email или Ник';

        return (
            <div className='enter-form-bg'>
                <div className='enter-form my-register-form'>
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

                        <input onChange={this.inputEmailChange}
                                value={this.state.email}
                                type="email" className="form-control" 
                                id="inputEmail2" aria-describedby="emailHelp"
                                />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputText2">Никнейм</label>

                        <input onChange={this.inputNickChange}
                                value={this.state.nick}
                                type="text" className="form-control"
                                id="inputText2"
                                />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword2">Пароль</label>

                        <input onChange={this.inputPasswordChange}
                                value={this.state.pasword}
                                type="password" className="form-control" 
                                id="inputPassword2"
                                />
                        <span className='form-hint'>Пароль должен содержать минимум 4 символа</span>
                    </div>

                    <div className='form-wrap-btn'>

                        {this.state.validate ? 
                                    <button 
                                        disabled={this.state.disabled} 
                                        onClick={this.registerUser} 
                                        className="btn btn-success form-btn">Зарегистрироваться</button>
                                                :
                                <WarnMessage msg={msg}/>
                        }
                        
                    </div>

                </div>
            </div>
        )
    }
}

export default connect( null, mapDispatchToProps )(CheckInForm);