import React, {Component} from 'react';
import { connect } from 'react-redux';

import usersPicture from '../../icons/profile-picture.png';
import mapDispatchToProps from '../actionsRedux';
import gotTime from '../gotTime/gotTime';
import gotService from '../gotService/gotService.js';
import withUnmounted from '@ishawnwang/withunmounted';

const mapStateToProps = (state) => ({...state});



class UserPageOwner extends Component {
    gotService = new gotService();
    hasUnmounted = false;

    constructor(){
        super();
        this.addSkip =20;
    }

    state = {
        disabled: false,
        skip: 0,
        postsArr: [],
        amountPosts: null,
        allow: true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList);

        this.gotService.findAmountUsersPosts(this.props.idU.params.id, this.state.skip, true)
            .then(res=>{
                if (this.hasUnmounted) {
                    return;
                    }
                        this.setState((state)=>({
                        postsArr: res.postsArr,
                        user: {avatar: res.avatar, admin: res.admin, email: res.email, nick: res.nick},
                        amountPosts: res.count,
                        skip: state.skip + this.addSkip
                    }))  
                }, err=> console.log(err))
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
        
        if (this.state.amountPosts - this.state.skip > (-this.addSkip +1)){

            this.gotService.findAmountUsersPosts(this.props.idU.params.id, this.state.skip)
                .then(res=> 
                {let arr = res.postsArr.map(item => {
                    let time = item.time
                    return {...item._doc, ...{time}}
                });
                    return this.setState((state)=>({
                    skip: state.skip + this.addSkip,
                    postsArr: [...state.postsArr, ... arr],
                    allow: true
                }))}
            )
            .catch(err=> console.log(err));

        }
    }


    logOut = () => {
        this.setState({disabled: true});
        localStorage.removeItem('superJWT_');
        this.props.cleanState();
    }

    render() {

        let data = this.props.data;
        const ava = data.avatar === 'false' ? usersPicture : data.avatar;

        let context = this.state.postsArr.map(i => {
            return <ListItem key={getSuperId()}>
                <div className='p-0 container'>
                        <div className='page-posts-profile'>
                            <pre className='page-posts-time'>{gotTime(i._doc && i._doc.time ? i._doc.time: i.time)}</pre>
                            <br/>
                            <h2>{(i._doc && i._doc.title ? i._doc.title: i.title)}</h2>
                            <hr/>
                            <div>{(i._doc && i._doc.text ? i._doc.text: i.text)}</div>  
                        </div>            
                    </div>
            </ListItem>}
        );



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
                                {/* <div>Посты: <b>{this.state.amountPosts}</b></div> */}
                            </div>
                            
                        </div>
                        
                        <button disabled={this.state.disabled} 
                            onClick={this.logOut} 
                            className='btn btn-secondary'>Выйти</button>
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