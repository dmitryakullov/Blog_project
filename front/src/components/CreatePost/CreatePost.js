import React, {Component} from 'react';
import {Link} from "react-router-dom";
import gotService from '../gotService/gotService.js';





export default class CreatePost extends Component{
    gotService = new gotService();
    
    render(){
        
        return (
            <div contentEditable='true' dangerouslySetInnerHTML={{ __html: '<i>Hello</i>' }}>

            </div>
        )
    }
}
