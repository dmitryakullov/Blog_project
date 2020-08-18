import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import usersPicture from '../../icons/profile-picture.png';
import gotServices from '../gotService/gotService.js';
import mapDispatchToProps from '../actionsRedux';

const mapStateToProps = (store) => ({...store});



function EditProfile(props) {
    const gotService = new gotServices();

    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');

    const [changePass, setChangePass] = useState(false);

    const [oldPass, setOldPass] = useState('');
    const [newPass1, setNewPass1] = useState('');
    const [newPass2, setNewPass2] = useState('');

    const [warnMsg1, setWarnMsg1] = useState(1);

    useEffect(()=>{
        (async()=>{

            if(props.data) {
                await setNick(props.data.nick);
                await setEmail(props.data.email);
            }

        })();
    }, [props.data])

    const setBtnPass = () => {
        if(changePass) {
            setChangePass(false);
        } else {
            setChangePass(true);
        }
    }


    const saveNickEmail = () => {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (nick === '' || email === '') {
            setWarnMsg1(2);
        } else if (nick === props.data.nick && email === props.data.email) {}

        else if (nick === props.data.nick) {
            if (reg.test(email)) {
                gotService.changeNickEmail(null, email, props.data.token)
                    .then(res=> {
                        if (res.msg) {
                            setWarnMsg1(6);
                        } else {
                            (async()=>{
                                await props.putStore(res);
                                setWarnMsg1(3);
                            })();
                        }
                    })
                    .catch(err=> console.log(err));
            } else {
                setWarnMsg1(4);
            }
        }
        else if (email === props.data.email){
            if (chackNick(nick)) {
                gotService.changeNickEmail(nick, null, props.data.token)
                    .then(res=> {
                        if (res.msg) {
                            setWarnMsg1(7);
                        } else {
                            (async()=>{
                                await props.putStore(res);
                                setWarnMsg1(3);
                            })();
                        }
                    })
                    .catch(err=> console.log(err));
            } else {
                setWarnMsg1(5);
            }
        }
        else {
            if (reg.test(email) && chackNick(nick)) {
                gotService.changeNickEmail(nick, email)
                    .then(res=> {
                        if (res.msg) {
                            setWarnMsg1(9);
                        } else {
                            (async()=>{
                                await props.putStore(res);
                                setWarnMsg1(3);
                            })();
                        }
                    })
                    .catch(err=> console.log(err));
            } else {
                setWarnMsg1(8);
            }
        }
    }

    const saveNewPassword = () => {

    }

    if (!props.data) {
        return null;
    }

    const data = props.data;
    const ava = data.avatar === 'false' ? usersPicture : data.avatar;
    const deleteIMG = data.avatar === 'false' ? null: (<button className="btn btn-outline-danger">Удалить</button>);
    const btnPassword = changePass ? 'Отмена' : 'Изменить пароль';

    let save1;
    switch(warnMsg1) {
        case 1:
            save1 = (<button onClick={()=> saveNickEmail()} className="btn btn-success ml-2">Сохранить</button>)
            break;
        case 2:
            save1 = (<div className='warn1 ml-2'>Поля не должны быть пустыми</div>)
            break;
        case 3: 
            save1 = (<button onClick={()=> saveNickEmail()} className="btn btn-success ml-2">Изменения сохранены!</button>)
            break;
        case 4:
            save1 = (<div className='warn1 ml-2'>Некоректный E-mail</div>)
            break;
        case 5:
            save1 = (<div className='warn1 ml-2'>Nick должен содержать только: A-Za-z0-9._</div>)
            break;
        case 6:
            save1 = (<div className='warn1 ml-2'>Такой E-mail уже существует</div>)
            break;
        case 7:
            save1 = (<div className='warn1 ml-2'>Такой Nick уже существует</div>)
            break;
        case 8:
            save1 = (<div className='warn1 ml-2'>Некоректный Nick или Email<br/> Nick должен содержать только: A-Za-z0-9._</div>)
            break;
        case 9:
            save1 = (<div className='warn1 ml-2'>Nick или E-mail уже существует</div>)
            break;
    }

    const passwordField = !changePass ? null : 
                    (<>
                        <div className='edit-password'>
                            <div className='edit-password-msg'>Изменение пароля</div>
                            <span>Минимальная длина - 4 символа</span>
                            <label> Старый пароль:
                                <input onChange={(e)=> setOldPass(e.target.value)} value={oldPass}></input>
                            </label>
                            <label> Новый пароль:
                                <input onChange={(e)=> setNewPass1(e.target.value)} value={newPass1}></input>
                            </label>
                            <label> Повторите новый пароль:
                                <input onChange={(e)=> setNewPass2(e.target.value)} value={newPass2}></input>
                            </label>
                            <button className="btn btn-success mb-5 mt-3">Сохранить</button>
                        </div>
                    </>)

    return (
        <>
        <div className='container bg-white'>
            <div className='edit-profile'>
                <div className='edit-profile-wrap'>
                    <div>
                        <div className='edit-profile-picture'>
                            <div className='edit-profile-img'>
                                <img src={ava} alt='avatar'/>
                            </div>
                            <button type="button" className="btn btn-outline-primary">Загрузить фото</button>
                            {deleteIMG}
                        </div>
                    </div>
                    <div className='edit-profile-form'>
                        <label>
                            <b>Nick:</b>   <input 
                                            onChange={(e)=> {setNick(e.target.value); setWarnMsg1(1)}} 
                                            value={nick}></input>
                        </label>
                        <br/>
                        <label>
                            <b>Email:</b>   <input 
                                            onChange={(e)=> {setEmail(e.target.value); setWarnMsg1(1)}} 
                                            value={email}></input>
                        </label>
                        <br/>
                            {save1}
                        <br/>
                        <br/>
                        <button onClick={()=> setBtnPass()} className="btn btn-outline-primary ml-2">{btnPassword}</button>
                    </div>
                </div>

                <Link to='/owner'>
                    <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Link>

            </div>
            {passwordField}

        </div>
        </>
    )
}

function chackNick(str) {
    const arr = str.split('');
    for (let item of arr) {
        let i = item.charCodeAt();
        if (i===95 || (i>47 && i<58) || (i>63 && i<91) || (i>96 && i<123)) {}
        else return false;
    }
    return true;
}


export default connect( mapStateToProps, mapDispatchToProps )(EditProfile);