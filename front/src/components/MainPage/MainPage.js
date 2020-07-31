
import React, {Component} from 'react';
import usersPicture from '../../icons/profile-picture.png';
import {Link} from "react-router-dom";
import gotService from '../gotService/gotService.js';
import gotTime from '../gotTime/gotTime'

export default class MainPage extends Component {
    gotService = new gotService();

    constructor(){
        super();
        this.addSkip =20;
    }

    state = {
        postsArr: [],
        searchPostArr: [],
        nowSearch: false,
        skip: 0,
        amountPosts: null,
        allow: true,
        search: ''
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScrollList);
        this.gotService.findAmountPosts()
            .then(res=> this.setState({amountPosts: res.msg}), err=> console.log(err))
            .then(()=> this.gotService.getPosts(this.state.skip))
            .then(res=> this.setState({postsArr: res.postsArr, skip: this.state.skip+this.addSkip}), err=> console.log(err))
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

            this.gotService.getPosts(this.state.skip)
            .then(res=> this.setState((state)=>({
                skip: state.skip + this.addSkip,
                postsArr: [...state.postsArr, ... res.postsArr],
                allow: true
            })))
            .catch(err=> console.log(err));
        }
    }

    changeSearch = (e) => {
        if (e.target.value === '') {
            this.setState({search: e.target.value, nowSearch: false})
        } else {
            this.setState({search: e.target.value})
        }
        
    }

    searchPosts = () => {
        
        if(this.state.search !== '') {
            this.setState(()=>({nowSearch: true}))
            this.gotService.findPosts(this.state.search)
                .then(res=> this.setState({searchPostArr: res.postsArr}), err=> console.log(err))
            
        }
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        console.log(this.state.amountPosts)

        let mappedArr = this.state.nowSearch ? this.state.searchPostArr : this.state.postsArr;

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