
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import usersPicture from '../../icons/profile-picture.png';
import gotTime from '../gotTime/gotTime';
import gotService from '../gotService/gotService.js';
import withUnmounted from '@ishawnwang/withunmounted';
import mapDispatchToProps from '../actionsRedux';


const mapStateToProps = (store) => ({...store});



class UserPageOwner extends Component {
    gotService = new gotService();
    hasUnmounted = false;


    state = {
        disabled: false,
        skip: 0,
        postsArr: [],
        amountPosts: null,
        allow: true,
        search: '',
        msg: ''
    }

    componentDidMount() {
        if(this.state.link) {
            return;
        }
        window.addEventListener('scroll', this.onScrollList);


        const  abc =()=> {

            
            this.gotService.findAmountUsersPosts(this.props.data._id, this.state.skip, true)
            .then(res=>{
    
                setTimeout(()=> 
                    {
                        if (this.hasUnmounted) {
                            return;
                            }
                                this.setState((state)=>({
                                postsArr: res.postsArr,
                                user: {avatar: res.avatar, admin: res.admin, email: res.email, nick: res.nick},
                                amountPosts: res.count,
                                skip: state.skip + this.props.addSkip
                            }))  
                        }, err=> console.log(err))}
                , 100);
                    }
                    setTimeout(()=> abc(),300);
        }

        





    onScrollList = (event) => {

        let scrollBottom = event.target.scrollingElement.scrollTop + 
            event.target.scrollingElement.offsetHeight > event.target.scrollingElement.scrollHeight/100*85;
            
        if (scrollBottom && this.state.allow) {
            this.setState({allow: false})
            this.updateAgain()
        }
    }

    updateAgain=()=>{
        
        if (this.state.amountPosts - this.state.skip > (-this.props.addSkip +1)){


            setTimeout(()=>this.gotService.findAmountUsersPosts(this.props.data._id)
            .then(res=> 
            {let arr = res.postsArr.map(item => {
                let time = item.time
                return {...item._doc, ...{time}}
            });
                return this.setState((state)=>({
                skip: state.skip + this.props.addSkip,
                postsArr: [...state.postsArr, ... arr],
                allow: true
            })) }
        )
        .catch(err=> console.log(err)),100)

        }
    }

    deleteMessage = (_id) => {
        
        this.gotService.deletePost(_id)
        .then(() => {
                let arr = this.state.postsArr.filter(i => (i._doc && i._doc._id ?
                                                                    !(i._doc._id === _id) : 
                                                                    !(i._id === _id)))
                this.setState((state)=>({postsArr: arr, amountPosts: state.amountPosts - 1}))

        })
            .catch(err=> console.log(err));
    }



    logOut = () => {
        
        localStorage.removeItem('superJWT_');

        this.props.cleanStore();
    }


    changeSearch = (e) => {
        if (e.target.value === '') {
            this.setState({search: e.target.value, nowSearch: false})
        } else {
            this.setState({search: e.target.value})
        }
        
    }

    userSearch = () => {
        this.gotService.restoreOrDelete(this.state.search)
            .then(res=> this.setState({msg: res.msg}))
            .catch(err=> console.log(err));
    }

    render() {

        if(!this.props.data) {
            return null;
        }

        if (this.props.data.admin === true) {

            return <div className="container">
                            <Link exact to="/">
                                <button disabled={this.state.disabled} 
                                    onClick={this.logOut} 
                                    className='btn btn-secondary mb-5'>Выйти</button>
                            </Link> 
                <div className="form-inline w-100">
                <br/>
                    <div className='row w-100'>
                        <div className='col-8 col-md-10'>
                        <input onChange={this.changeSearch} value={this.state.search} className="form-control w-100" placeholder="Поиск" aria-label="Search"/>
                        </div>
                        <div className='col-4 col-md-2'>
                        <button onClick={this.userSearch} className="btn btn-secondary w-100">Найти</button>
                        </div>
                    </div>     
                    </div>
                    <input value={this.state.msg} className='outside-data'></input>
                </div>

        }

        let data = this.props.data;
        const ava = data.avatar === 'false' ? usersPicture : data.avatar;

        let context;

        if (!this.state.postsArr) {            
            context = null;
        } else {
            context  = this.state.postsArr.map(i => {

                return <ListItem  key={getSuperId()}>
                    <div className='p-0 container'>
                            <div className='page-posts-profile'>
                                <pre className='page-posts-time'>{gotTime(i._doc && i._doc.time ? i._doc.time: i.time)}</pre>
                                <br/>
                                <h2>{(i._doc && i._doc.title ? i._doc.title: i.title)}</h2>
                                <hr/>
                                <div className='superText' 
                                contentEditable='false' 
                                dangerouslySetInnerHTML={{ __html: `${(i._doc && i._doc.text ? i._doc.text: i.text)}` }}></div>  
    
                                <div className='edit-posts'>
                                    <button onClick={()=>this.deleteMessage((i._doc && i._doc._id ? i._doc._id: i._id))} className='btn btn-outline-danger'>Удалить</button>
                                </div>
                            </div> 
                        </div>
                </ListItem>}
                );
        }

        


        return (
            <>
            <div className='container bg-white'>
            <div onScroll={event => this.onScrollList(event)} className='user-page bg-white'>
                <div className="d-flex w_100">
                    
                    <div className="user-page-info d-flex justify-content-between">
                        <div className='d-flex'>
                            <div className='user-page-img'>
                                <img src={ava} alt="User's profole"/>
                            </div>
                            <div>
                                <h4 className="mt-0">{data.nick}</h4>
                                <div>Email: <i>{data.email}</i></div>
                                <div>Посты: <b>{this.state.amountPosts}</b></div>
                            </div>
                            
                        </div>
                        <div>
                        <Link exact to="/createpost">
                            <button className='btn btn-primary mr-4'>Создать пост</button>
                        </Link>

                            <Link exact to="/">
                                <button disabled={this.state.disabled} 
                                    onClick={this.logOut} 
                                    className='btn btn-secondary'>Выйти</button>
                            </Link>
                            
                        </div>
                        
                    </div>
                    <hr/>
                </div>
                
            </div>
            </div>

            {context}

            </>
        )
    }
}

class ListItem extends Component{
    render(){
        return (
            <>
                {this.props.children}
            </>
        )
    }
}


function getSuperId() {
    return ''+ Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
}
export default connect( mapStateToProps, mapDispatchToProps )(withUnmounted(UserPageOwner));