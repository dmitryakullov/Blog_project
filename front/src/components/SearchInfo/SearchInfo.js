import React from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import gotServices from '../gotService/gotService.js';
import mapDispatchToProps from '../actionsRedux';

const mapStateToProps = (store) => ({...store});


function SearchInfo (props) {
    let gotService = new gotServices();



    return (
        <>
            <div className='container'>
                <div className='d-flex flex-column align-items-center'>

                    <div className="form-inline w-100">
                        <div className='row w-100'>
                            <div className='col-8 col-md-10'>
                                <input className="form-control w-100" placeholder="Поиск" aria-label="Search"/>
                            </div>
                            <div className='col-4 col-md-2'>
                                <button className="btn btn-secondary w-100">Найти</button>
                            </div>
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