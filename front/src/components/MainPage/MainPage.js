
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

import usersPicture from '../../icons/profile-picture.png';
import gotService from '../gotService/gotService.js';
import gotTime from '../gotTime/gotTime'
import mapDispatchToProps from '../actionsRedux';



const mapStateToProps = (store) => ({...store});



class MainPage extends Component {
    gotService = new gotService();


    state = {
        allow: true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList);
        let amountPosts;
        const props = this.props.mainPage;

        this.gotService.findAmountPosts()
            .then(res=> {amountPosts = res.msg}, err=> console.log(err))
            .then(()=> this.gotService.getPosts(props.skip))
            .then(res=> this.props.putMainPageStore({
                postsArr: res.postsArr,
                skip: props.skip + this.props.addSkip,
                amountPosts
            }), err=> console.log(err))

    }

    onScrollList = (event) => {

        if(!event.target.scrollingElement) return;
        
        let scrollBottom = event.target.scrollingElement.scrollTop + 
            event.target.scrollingElement.offsetHeight > event.target.scrollingElement.scrollHeight/100*92;
            
        if (scrollBottom && this.state.allow) {
            this.setState({allow: false})
            this.updateAgain()
        }
    }

    updateAgain=()=>{
        const props = this.props.mainPage;
        
        if (props.amountPosts - props.skip > (-this.props.addSkip)){

            this.gotService.getPosts(props.skip)
            .then(res=> {
                this.props.putMainPageStore({
                    skip: props.skip + this.props.addSkip,
                    postsArr: [...props.postsArr, ... res.postsArr],
                });
                this.setState({allow: true})
            })
            .catch(err=> console.log(err));
        }
    }



    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollList);

        this.props.putMainPageStore({
            postsArr: [],
            skip: 0,
            amountPosts: null
        })
    }

    render() {
        const props = this.props.mainPage;


        if (!props.postsArr) {return null}

        let context = props.postsArr.map(i => {

            return <ListItem key={getSuperId()}>
                    <div className='page-posts'>
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
            </ListItem>}
        );

        


        return (
            <div className='container'>
                <div onScroll={event => this.onScrollList(event)} className='d-flex flex-column align-items-center'>

                    {context}

                </div>
            </div>
        )
    }
}






const ListItem = (p) => <>{p.children}</>;


function getSuperId() {
    return ''+ Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
}




export default connect( mapStateToProps, mapDispatchToProps )(MainPage);