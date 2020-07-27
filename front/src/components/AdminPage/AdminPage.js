import React, {Component} from 'react';

export default class AdminPage extends Component {
    render() {
        return(
            <div className='container'>
            <div className='admin-page bg-white'>
                <div className="form-inline w-100">
                    <div className='row w-100'>
                        <div className='col-10'>
                        <input className="form-control w-100" placeholder="Поиск" aria-label="Search"/>
                        </div>
                        <div className='col-2'>
                        <button className="btn btn-secondary w-100">Найти</button>
                        </div>
                    </div>     
                </div>
            </div>
            </div>
        )
    }
}