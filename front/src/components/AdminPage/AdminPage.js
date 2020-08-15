import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import usersPicture from '../../icons/profile-picture.png';
import gotTime from '../gotTime/gotTime';
import gotServices from '../gotService/gotService.js';
import mapDispatchToProps from '../actionsRedux';

const mapStateToProps = (store) => ({...store});



const AdminPage = (props) => {
    let gotService = new gotServices();

    const [searchText, setSearchText] = useState('');
    const [allow, setAllow] = useState(true);


    useEffect(()=>{
        window.addEventListener('scroll', onScrollList);

        return ()=> {
            window.removeEventListener('scroll', onScrollList);
            props.putInfoAdmin({skip: 0, user: {}, postsArr: [], amountPosts: null, status: true})
        };
    },[])


    function search() {
        if(searchText !== '') {

            gotService.findUser(0, props.data.token, null, searchText)
                .then(res=> {
                    const {_id, nick, email, avatar, amountPosts, postsArr} = res
                    if (_id && nick && email && avatar && postsArr) {
                        props.putInfoAdmin({
                            skip: props.addSkip,
                            user: {_id, nick, email, avatar},
                            postsArr,
                            amountPosts,
                            status: true
                        })
                    } else {
                        props.putInfoAdmin({
                            skip: 0, user: {}, postsArr: [], amountPosts: null, status: false
                        })
                    }
                }, err=> console.log(err))
        }
    }


    function onScrollList(event) {
        
        if(!event.target.scrollingElement) return;

        let scrollBottom = event.target.scrollingElement.scrollTop + 
            event.target.scrollingElement.offsetHeight > event.target.scrollingElement.scrollHeight/100*85;

        if (scrollBottom && allow) {
            setAllow(false)
        }
    }

    useEffect(()=> {
        if (!allow) {
            updateAgain();
        }
    })

    const updateAgain = () => {
        const adminInfo = props.adminInfo;

        if (adminInfo.amountPosts - adminInfo.skip > (-props.addSkip +1)){ /////???????????????????????????













































            

            gotService.findUser(adminInfo.skip, props.data.token, adminInfo.user._id)
            .then(res=> {
                console.log(res)
                props.putInfoAdmin({
                    skip: adminInfo.user.skip + props.addSkip,
                    postsArr: [...adminInfo.postsArr, ... res.postsArr],
                });
                setAllow(true);
            })
            .catch(err=> console.log(err));
        }
    }


    const deleteMessage = (_id) => {
        
        gotService.deletePost(_id, props.data.token)
        .then(res => {
                console.log({res});

                if (res.msg === 'DELETE') {
                    const arr = props.adminInfo.postsArr.filter(i => (i._id !== _id))
                    
                    props.putInfoAdmin({
                        postsArr: arr, 
                        amountPosts: props.adminInfo.amountPosts - 1})
                } else {
                    console.log('ERROR')
                }
        })
        .catch(err=> console.log(err));
    }

    const  logOut = () => {
        localStorage.removeItem('superJWT_');
        props.cleanStore();
    }


    if (!props.data) {
        return <Redirect to="/"/>
    } else if (!props.data.admin) {
        return <Redirect to="/"/>
    }


    const userProps = props.adminInfo;
    let user, posts, message = null;

    if (!userProps.user._id) {
        user = null;

    } else {
        const ava = userProps.user.avatar === 'false' ? usersPicture : userProps.user.avatar;
        user = (<>
                    <div className="d-flex flex-column bg-white w_100">
                        <div className="user-page-info d-flex justify-content-between">
                            <div className='d-flex'>
                                <div className='user-page-img'>
                                    <img src={ava} alt="User's profole"/>
                                </div>
                                <div>
                                    <h4 className="mt-0">{userProps.user.nick}</h4>
                                    <div>Email: <i>{userProps.user.email}</i></div>
                                    <div>Посты: <b>{userProps.amountPosts}</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
    }

    posts = userProps.postsArr.map(i => {
        return <ListItem  key={getSuperId()}>
                    <div className='p-0 container'>
                        <div className='page-posts-profile'>
                            <pre className='page-posts-time'>{gotTime(i.time)}</pre>
                            <br/>
                            <h2>{(i.title)}</h2>
                            <hr/>
                            <div className='superText' 
                            contentEditable='false' 
                            dangerouslySetInnerHTML={{ __html: `${(i.text)}` }}></div>  

                            <div className='edit-posts'>
                                <button onClick={()=>deleteMessage(i._id)} className='btn btn-outline-danger'>Удалить</button>
                            </div>
                        </div> 
                    </div>
                </ListItem>}
        );



    if (!userProps.status) {
        user = posts = null;
        message = (<><div className='nothing-find'>Ничего не найдено :(</div></>)
    }


    return (

        <div onScroll={event => onScrollList(event)} className="container">
            <Link to="/">
                <button
                    onClick={()=> logOut()} 
                    className='btn btn-danger mb-3'>Выйти
                </button>
            </Link> 

            <div className="form-inline w-100 mb-3">
                <div className='row w-100'>
                    <div className='col-12'>
                        <div className='d-flex search-inp-btn-width w-100'>
                            <input value={searchText} onChange={(e)=> 
                                setSearchText(e.target.value)} className="form-control" 
                                placeholder="Ник или E-mail" aria-label="Search"
                            />

                            <button onClick={()=> search()} className="btn btn-secondary">Найти</button>
                        </div>
                    </div>
                </div>     
            </div>
            {message}
            {user}
            {posts}

        </div>

    )
}


const ListItem = (p) => <>{p.children}</>;


function getSuperId() {
    return ''+ Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
}


export default connect( mapStateToProps, mapDispatchToProps )(AdminPage);