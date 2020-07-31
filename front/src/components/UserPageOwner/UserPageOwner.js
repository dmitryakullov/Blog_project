import React, {Component} from 'react';
import { connect } from 'react-redux';

import usersPicture from '../../icons/profile-picture.png';
import mapDispatchToProps from '../actionsRedux';
import gotService from '../gotService/gotService.js';

const mapStateToProps = (state) => ({...state});



class UserPage extends Component {
    gotService = new gotService();

    componentDidMount() {
        if (this.props.idU.params.id === this.props.data._id) {
            console.log('Ovner')
        } else {
            console.log('another')
        }
        
    }

    render() {
        return (
            <div className='container bg-white'>
            <div className='user-page bg-white'>
                <div className="media">
                    <div className='user-page-img'>
                        <img src={usersPicture} alt="User's profole"/>
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


export default connect( mapStateToProps, mapDispatchToProps )(UserPage);