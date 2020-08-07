
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
        nowSearch: false,
        allow: true,
        search: ''
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList);
        let amountPosts;
        const mainPageProps = this.props.mainPage;

        this.gotService.findAmountPosts()
            .then(res=> {amountPosts = res.msg}, err=> console.log(err))
            .then(()=> this.gotService.getPosts(mainPageProps.skip))
            .then(res=> this.props.putMainPageStore({
                postsArr: res.postsArr,
                skip: mainPageProps.skip + this.props.addSkip,
                amountPosts,
                searchPostArr: []
            }), err=> console.log(err))

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
        const mainPageProps = this.props.mainPage;
        
        if (mainPageProps.amountPosts - mainPageProps.skip > (-this.props.addSkip +1)){

            this.gotService.getPosts(mainPageProps.skip)
            .then(res=> {
                this.props.putMainPageStore({
                    skip: mainPageProps.skip + this.props.addSkip,
                    postsArr: [...mainPageProps.postsArr, ... res.postsArr],
                });
                this.setState({allow: true})
            })
            .catch(err=> console.log(err));
        }
    }

    changeSearch = (e) => {
        if (e.target.value === '') {
            this.setState({search: e.target.value, nowSearch: false});
            this.props.putMainPageStore({searchPostArr: []})
        } else {
            this.setState({search: e.target.value})
        }
        
    }

    searchPosts = () => {
        
        if(this.state.search !== '') {
            this.setState(()=>({nowSearch: true}))

            this.gotService.findPosts(this.state.search)
                .then(res=> this.props.putMainPageStore({searchPostArr: res.postsArr}), err=> console.log(err))
            
        }
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const mainPageProps = this.props.mainPage;

        let mappedArr = this.state.nowSearch ? mainPageProps.searchPostArr : mainPageProps.postsArr;

        if (!mappedArr) {return null}

        let context = mappedArr.map(i => {

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

                    <div className="form-inline w-100">
                        <div className='row w-100'>
                            <div className='col-8 col-md-10'>
                            <input onChange={this.changeSearch} value={this.state.search} className="form-control w-100" placeholder="Поиск" aria-label="Search"/>
                            </div>
                            <div className='col-4 col-md-2'>
                            <button onClick={this.searchPosts} className="btn btn-secondary w-100">Найти</button>
                            </div>
                        </div>     
                    </div>

                    {context}


                </div>
            </div>
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




export default connect( mapStateToProps, mapDispatchToProps )(MainPage);