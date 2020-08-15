
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import usersPicture from '../../icons/profile-picture.png';
import gotTime from '../gotTime/gotTime';
import gotService from '../gotService/gotService.js';
import mapDispatchToProps from '../actionsRedux';

const mapStateToProps = (store) => ({...store});



class UserPageOwner extends Component {
    gotService = new gotService();


    state = {
        allow: true,
        toCreatePost: false
    }


    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList); 
        this.getPostsFirst();
    }

    getPostsFirst = () => {
        const props = this.props.ownerPage;
        
        let interval = setInterval(()=>{
            if(this.props.data) {
                clearInterval(interval)

                this.gotService.findAmountUsersPosts(this.props.data._id, props.skip, true)
                .then(res=> this.props.putOwnerPageStore({
                                            postsArr: res.postsArr,
                                            amountPosts: res.count,
                                            skip: props.skip + this.props.addSkip
                                }) , err=> console.log(err))
            }
        }, 10);
    }




    onScrollList = (event) => {
        if(!event.target.scrollingElement) return;
        
        let scrollBottom = event.target.scrollingElement.scrollTop + 
            event.target.scrollingElement.offsetHeight > event.target.scrollingElement.scrollHeight/100*85;
            
        if (scrollBottom && this.state.allow) {
            this.setState({allow: false})
            this.updateAgain()
        }
    }



    updateAgain=()=>{
        const props = this.props.ownerPage;
        
        if (props.amountPosts - props.skip > (-this.props.addSkip +1)){

            this.gotService.findAmountUsersPosts(this.props.data._id, props.skip)
                    .then(res=> {
                        this.props.putOwnerPageStore({
                            skip: props.skip + this.props.addSkip,
                            postsArr: [...props.postsArr, ...res.postsArr]
                        })
                        this.setState({ allow: true })
                })
                .catch(err=> console.log(err))
        }
    }


    changeMessage = (_id, title, text) => {
        if(_id && title && text) {
            this.props.putInfoPost({_id, title, text});
            this.setState({toCreatePost: true})
        } else {
            console.log('Something go wrong')
        }
    }


    deleteMessage = (_id) => {
        const data = this.props.data
        
        this.gotService.deletePost(_id, data.token, data._id)
        .then(res => {
                console.log({res})
                if (res.msg === 'DELETE') {
                    let arr = this.props.ownerPage.postsArr.filter(i => (i._id !== _id))
                    
                    this.props.putOwnerPageStore({
                        postsArr: arr, 
                        amountPosts: this.props.ownerPage.amountPosts - 1})
                } else {
                    console.log('ERROR')
                }
        })
        .catch(err=> console.log(err));
    }



    logOut = () => {
        localStorage.removeItem('superJWT_');
        this.props.cleanStore();
    }



    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollList);
        this.props.putOwnerPageStore({
            skip: 0,
            postsArr: [],
            amountPosts: null
        });
    }

    render() {
        if(!this.props.data) {
            return <Redirect to="/"/>
        }

        if (this.state.toCreatePost) {
            return <Redirect to="/createpost"/>
        }


        const data = this.props.data;
        const ava = data.avatar === 'false' ? usersPicture : data.avatar;

        const props = this.props.ownerPage;

        let context;
        if (props.postsArr) {
            context = props.postsArr.map(i => {
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
                                    <button onClick={()=>this.changeMessage(i._id, i.title, i.text)} className='btn btn-outline-primary'>Изменить</button>
                                    <button onClick={()=>this.deleteMessage(i._id)} className='btn btn-outline-danger'>Удалить</button>
                                </div>
                            </div> 
                        </div>
                </ListItem>}
                );
        } else {
            context = null;
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
                                <div>Посты: <b>{props.amountPosts}</b></div>
                            </div>
                            
                        </div>
                        <div>
                        <Link to="/createpost">
                            <button className='btn btn-primary mr-4'>Создать пост</button>
                        </Link>

                            <Link to="/">
                                <button 
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



const ListItem = (p) => <>{p.children}</>;

function getSuperId() {
    return ''+ Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
}

export default connect( mapStateToProps, mapDispatchToProps )(UserPageOwner);