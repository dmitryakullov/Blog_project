import React, {Component} from 'react';
import {Link} from "react-router-dom";
import usersPicture from '../../icons/profile-picture.png'


export default class UserPage extends Component {
    render() {
        return (
            <div className='container bg-white'>
            <div className='user-page bg-white'>
                <div className="media">
                    <div className='user-page-img'>
                        <img src={usersPicture} alt="User's picture"/>
                    </div>
                    <div className="media-body user-page-info">
                        <h5 className="mt-0">{'User Name'}</h5>
                        
                    </div>
                </div>
                <hr/>
            </div>
            </div>
        )
    }
}


