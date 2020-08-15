import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import usersPicture from '../../icons/profile-picture.png';
import gotTime from '../gotTime/gotTime';
import gotServices from '../gotService/gotService.js';
import mapDispatchToProps from '../actionsRedux';

const mapStateToProps = (store) => ({...store});



const AdminPage = (props) => {
    let gotService = new gotServices();


    const [searchText, setSearchText] = useState('');


    function search() {
        if(searchText !== '') {
            const data = props.adminInfo;
            gotService.findUser(data.skip, props.data.token, null, searchText)
                .then(res=> console.log(res), err=> console.log(err))
        }
    }
    

    const userProps = props.adminInfo;
    const user;

    if (!userProps.user._id) {
        user = null
    }

    
    return (
        <>
            <div className="form-inline w-100">
                <div className='row w-100'>
                    <div className='col-12'>
                        <div className='d-flex search-inp-btn-width w-100'>
                            <input value={searchText} onChange={(e)=> 
                                setSearchText(e.target.value)} className="form-control" 
                                placeholder="Ник или E-mail" aria-label="Search"
                            />

                            <button onClick={()=> search()} className="btn btn-secondary">Найти</button>
                        </div>
                    </div>
                </div>     
            </div>
            {user}

        </>
    )
}


const ListItem = (p) => <>{p.children}</>;


function getSuperId() {
    return ''+ Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
}


export default connect( mapStateToProps, mapDispatchToProps )(AdminPage);