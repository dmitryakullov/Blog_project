import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import gotServices from '../gotService/gotService.js';
import usersPicture from '../../icons/profile-picture.png';
import gotTime from '../gotTime/gotTime'
import mapDispatchToProps from '../actionsRedux';

const mapStateToProps = (store) => ({...store});





function SearchInfo (props) {
    let gotService = new gotServices();

    const [typeSearch, setTypeSearch] = useState(true);
    const [searchText, setSearchText] = useState('');

    function chengeBtn1() {
        if (!typeSearch) {
            setTypeSearch(true);
        }
    }
    function chengeBtn2() {
        if (typeSearch) {
            setTypeSearch(false);
        }
    }

    function search() {
        if(searchText !== '') {
            gotService.findUsersAndPosts(searchText)
                .then(res=> props.putInfoSearch(res), err=> console.log(err))
        }
    }


    useEffect(()=> {
        return ()=> props.putInfoSearch({postsArr: null, usersArr: null});
    },[])





    const val1 = typeSearch ? "btn btn-dark btn-change" : "btn btn-outline-dark btn-change";
    const val2 = typeSearch ? "btn btn-outline-dark btn-change" : "btn btn-dark btn-change";
    const postsArr = props.search.postsArr;
    const usersArr = props.search.usersArr;
    let posts, users;



    if (!postsArr || !usersArr) {
        posts = users = null;
    } else {

        if(postsArr.length === 0) {
            posts = (<><div className='nothing-find'>Ничего не найдено :(</div></>)
        } else {
            posts = postsArr.map(i => {

                return (
                        <div key={i._id} className='page-posts'>
                            <div className='d-flex justify-content-between'>
                            <Link to={`/user/${i.userId}`} className='react-Link'>
                                <div className='page-posts-user'>
                                    <div className='page-posts-ava'>
                                        <div>
                                            <img src={i.avatar === 'false'? usersPicture : i.avatar} alt="User's pictures" />
                                        </div>
                                    </div>
                                    <span className='page-posts-nick'>{i.nick}</span>
                                </div>
                            </Link>
                            <pre className='page-posts-time'>{gotTime(i.time)}</pre>
                            </div>
                            <hr/>
                            <h2>{i.title}</h2>
                            <div className='superText' 
                                contentEditable='false' 
                                dangerouslySetInnerHTML={{ __html: `${i.text}` }}></div>              
                        </div>
                )
            });
        }

        if(usersArr.length === 0) {
            users = (<><div className='nothing-find'>Ничего не найдено :(</div></>)
        } else {
            users = usersArr.map(i=> 
                <div key={i._id} className='page-posts'>
                    <div className='d-flex justify-content-between'>
                    <Link to={`/user/${i._id}`} className='react-Link'>
                        <div className='page-posts-user'>
                            <div className='page-posts-ava'>
                                <div>
                                    <img src={i.avatar === 'false'? usersPicture : i.avatar} alt="User's pictures" />
                                </div>
                            </div>
                            <span className='page-posts-nick'>{i.nick}</span>
                        </div>
                    </Link>
                    </div>        
                </div>
                )
        }
    }


    const content = typeSearch ? posts : users;

    return (
        <>
            <div className='container'>
                    <div className="form-inline w-100">
                        <div className='row w-100'>
                            <div className='col-12'>
                                <div className='d-flex search-inp-btn-width w-100'>
                                    <input value={searchText} onChange={(e)=> setSearchText(e.target.value)} className="form-control" placeholder="Поиск" aria-label="Search"/>
                                    <button onClick={()=> search()} className="btn btn-secondary">Найти</button>
                                </div>
                            </div>
                        </div>     
                    </div>
                    <div className='row'>
                        <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3'>
                            <div className='d-flex'>
                                <button onClick={() => chengeBtn1()} className={val1}>Посты</button>
                                <button onClick={() => chengeBtn2()} className={val2}>Пользователи</button>
                            </div>
                        </div>
                    </div>

                    {content}

            </div>
        </>
    )
}


const ListItem = (p) => <>{p.children}</>;

export default connect( mapStateToProps, mapDispatchToProps )(SearchInfo);