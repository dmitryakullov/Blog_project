import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class WarnMessage extends Component {
    render() {
        return (
            <div className="warn-msg-card">
                {this.props.msg}
            </div>
        )
    }
}