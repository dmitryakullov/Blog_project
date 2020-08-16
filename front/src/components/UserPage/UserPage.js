import React, {Component} from 'react';
import { connect } from 'react-redux';

import usersPicture from '../../icons/profile-picture.png';
import gotService from '../gotService/gotService.js';
import gotTime from '../gotTime/gotTime';
import mapDispatchToProps from '../actionsRedux';



const mapStateToProps = (store) => ({...store});




class UserPage extends Component {
    gotService = new gotService();


    state = {
        allow: true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList);

        this.gotService.findAmountUsersPosts(this.props.idU.params.id, this.props.userPage.skip, true)
            .then(res=>
                    this.props.putUserPageStore({
                        postsArr: res.postsArr,
                        user: {avatar: res.avatar, email: res.email, nick: res.nick},
                        amountPosts: res.count,
                        skip: this.props.userPage.skip + this.props.addSkip
                    }), 
                    err=> console.log(err))
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
        let props = this.props.userPage
        
        if (props.amountPosts - props.skip > (-this.props.addSkip)){

            this.gotService.findAmountUsersPosts(this.props.idU.params.id, props.skip)
                .then(res=> {
                    this.props.putUserPageStore({
                        skip: props.skip + this.props.addSkip,
                        postsArr: [...props.postsArr, ...res.postsArr]
                    })
                    this.setState({allow: true})
                }
            )
            .catch(err=> console.log(err));

        }
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollList);
        this.props.putUserPageStore({
            postsArr: [],
            skip: 0,
            user: {},
            amountPosts: null
        })
    }




    render() {

        let props = this.props.userPage

        if (!props.user || !props.postsArr) {
            return null;
        }

        const user = props.user;
        const ava = user.avatar === 'false' ? usersPicture : user.avatar;

        let context = props.postsArr.map(i => {
            return <ListItem key={getSuperId()}>
                <div className='p-0 container'>
                        <div className='page-posts-profile'>
                            <pre className='page-posts-time'>{gotTime(i.time)}</pre>
                            <br/>
                            <h2>{i.title}</h2>
                            <hr/>
                            <div className='superText' 
                            contentEditable='false' 
                            dangerouslySetInnerHTML={{ __html: `${i.text}` }}></div>  
                        </div>            
                    </div>
            </ListItem>}
        );



        return (
            <>
                <div className='container bg-white'>
                <div onScroll={event => this.onScrollList(event)} className='user-page bg-white'>
                    <div className="d-flex flex-column w_100">
                        
                        <div className="user-page-info d-flex justify-content-between">
                            <div className='d-flex'>
                                <div className='user-page-img'>
                                    <img src={ava} alt="User's profole"/>
                                </div>
                                <div>
                                    <h4 className="mt-0">{user.nick}</h4>
                                    <div>Email: <i>{user.email}</i></div>
                                    <div>Посты: <b>{props.amountPosts}</b></div>
                                </div>
                                
                            </div>
                            
                        </div>
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


export default connect( mapStateToProps, mapDispatchToProps )(UserPage);