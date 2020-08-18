import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import usersPicture from '../../icons/profile-picture.png';
import gotServices from '../gotService/gotService.js';
import mapDispatchToProps from '../actionsRedux';

const mapStateToProps = (store) => ({...store});


function EditProfile(props) {
    return (
        <>
        <div className='container bg-white'>
            <div className='edit-profile'>
                <Link to='/owner'>
                    <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Link>

            </div>

        </div>
        </>
    )
}


export default connect( mapStateToProps, mapDispatchToProps )(EditProfile);