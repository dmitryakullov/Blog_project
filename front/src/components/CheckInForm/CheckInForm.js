import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

import mapDispatchToProps from '../actionsRedux';
import gotService from '../gotService/gotService.js';




class CheckInForm extends Component {
    gotService = new gotService();

    state = {
        email: '',
        password: '',
        nick: '',
        validate: 1,
        disabled: false
    }

    inputEmailChange = (event) => {
        this.setState({
            email: event.target.value,
            validate: 1,
        });
    }

    inputNickChange = (event) => {
        this.setState({
            nick: event.target.value,
            validate: 1,
        });
    }
    
    inputPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            validate: 1,
        });
    }



    registerUser =() => {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const s = this.state;

        if (s.email==='' || s.password==='' || s.nick==='') {
            this.setState({ validate: 2 });
        }
        else if (!reg.test(s.email)) {
            this.setState({ validate: 3 });
        }
        else if (!chackNick(s.nick)) {
            this.setState({ validate: 4 });
        }
        else if (s.password.length < 4 || s.password.length > 30) {
            console.log('gjutfjf')
            this.setState({ validate: 5 });
        }
        else {
            this.setState({disabled: true});

            this.gotService.makeCheckIn( s.nick, s.email.toLocaleLowerCase(), s.password)
                .then(res=>{
                    if (res.msg === 'NICK_EXIST'){
                        this.setState({disabled: false, validate: 6})

                    } 
                    else if(res.msg === 'EMAIL_EXIST') {
                        this.setState({disabled: false, validate: 7})
                    }
                    else if(res._id){
                        localStorage.setItem('superJWT_', res.token);
                        
                        this.props.putStore(res)
                        window.location = "/";
                    }
                    else {
                        this.setState({disabled: false, validate: 8})
                    }
                })
                .catch(err=> console.log(err))
        }
    }




    render() {

        if (this.props.data) {
            return null;
        }


        const s = this.state;
        let save;


        if (s.disabled) {
            save = <button disabled className="btn btn-success form-btn">Зарегистрироваться</button>
        }
        else {
            switch(s.validate) {
                case 1:
                    save = <button onClick={this.registerUser} className="btn btn-success form-btn">Зарегистрироваться</button>;
                    break;
                case 2:
                    save = <button disabled className="btn btn-outline-danger form-btn">Поля не должны быть пустыми</button>;
                    break;
                case 3:
                    save = <button disabled className="btn btn-outline-danger form-btn">Некоректный E-mail</button>;
                    break;
                case 4:
                    save = <button disabled className="btn btn-outline-danger form-btn">Nick должен содержать только: A-Za-z0-9_</button>;
                    break;
                case 5:
                    save = <button disabled className="btn btn-outline-danger form-btn">Пароль должен содержать 4-30 символов</button>;
                    break;
                case 6:
                    save = <button disabled className="btn btn-outline-danger form-btn">Такой Ник уже существует</button>;
                    break;
                case 7:
                    save = <button disabled className="btn btn-outline-danger form-btn">Такой E-mail уже существует</button>;
                    break;
                case 8:
                    save = <button disabled className="btn btn-outline-danger form-btn">Ошибка!</button>;
                    break;
    }
        }


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
                        <span className='form-hint'>Пароль должен содержать 4-30 символов</span>
                    </div>

                    <div className='form-wrap-btn'>

                        {save}
                        
                    </div>

                </div>
            </div>
        )
    }
}

function chackNick(str) {
    if (str.length > 30) {
        return false
    }
    const arr = str.split('');
    for (let item of arr) {
        let i = item.charCodeAt();
        if (i===95 || (i>47 && i<58) || (i>63 && i<91) || (i>96 && i<123)) {}
        else return false;
    }
    return true;
}

export default connect( null, mapDispatchToProps )(CheckInForm);