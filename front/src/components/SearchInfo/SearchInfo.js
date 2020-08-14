import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import gotServices from '../gotService/gotService.js';
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


    const val1 = typeSearch ? "btn btn-dark btn-change" : "btn btn-outline-dark btn-change";
    const val2 = typeSearch ? "btn btn-outline-dark btn-change" : "btn btn-dark btn-change";

    return (
        <>
            <div className='container'>
                    <div className="form-inline w-100">
                        <div className='row w-100'>
                            <div className='col-12'>
                                <div className='d-flex search-inp-btn-width w-100'>
                                    <input value={searchText} onChange={(e)=> setSearchText(e.target.value)} className="form-control" placeholder="Поиск" aria-label="Search"/>
                                    <button className="btn btn-secondary">Найти</button>
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
            </div>
        </>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )(SearchInfo);



// searchPosts = () => {
        
//     if(this.state.search !== '') {
//         this.setState(()=>({nowSearch: true}))

//         this.gotService.findPosts(this.state.search)
//             .then(res=> this.props.putMainPageStore({searchPostArr: res.postsArr}), err=> console.log(err))
        
//     }
// }


{/* <div className="form-inline w-100">
<div className='row w-100'>
    <div className='col-8 col-md-10'>
    <input onChange={this.changeSearch} value={this.state.search} className="form-control w-100" placeholder="Поиск" aria-label="Search"/>
    </div>
    <div className='col-4 col-md-2'>
    <button onClick={this.searchPosts} className="btn btn-secondary w-100">Найти</button>
    </div>
</div>     
</div> */}