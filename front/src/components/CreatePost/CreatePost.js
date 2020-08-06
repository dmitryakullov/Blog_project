import React, {Component} from 'react';
import {Link} from "react-router-dom";
import gotService from '../gotService/gotService.js';
import { connect } from 'react-redux';


const mapStateToProps = (stpre) => ({...stpre});


class CreatePost extends Component{
    gotService = new gotService();

    state={
        title: '',
        textArea: ''
    }

    title = (e) => {
        this.setState(({title: e.target.value}))
    }
    textArea = (e) => {
        this.setState({textArea: e.target.value})
    }
    break= () => {
        this.setState((state) => ({textArea: state.textArea + '<br/>'}))
    }
    bold= () => {
        this.setState((state) => ({textArea: state.textArea + '<b></b>'}))
    }
    italick= () => {
        this.setState((state) => ({textArea: state.textArea + '<i></i>'}))
    }
    underline= () => {
        this.setState((state) => ({textArea: state.textArea + '<ins></ins>'}))
    }
    deleted= () => {
        this.setState((state) => ({textArea: state.textArea + '<s></s>'}))
    }
    href = () => {
        let href = prompt('Введите URL ссылки','http://')
            if (href) {
                this.setState((state) => ({textArea: state.textArea + `<a href="${href}"></a>`}))
            }
        }

    
    img = () => {
        let href = prompt('Введите src картинки','')
        if (href) {
            this.setState((state) => ({textArea: state.textArea + `<img src="${href}" target='_blank' alt="something"/>`}))
        }
    }


    savePost = () => {
        this.gotService.createPost(this.props.data._id, this.state.title, this.state.textArea) 
        .then(res=> console.log(res), err=> console.log(err))
    }

    
    render(){

        let sendBtn = this.state.title !=='' && this.state.textArea !=='' ? 
            <Link exact to='/owner'>
                <button onClick={this.savePost} className='btn btn-success'>Отправить</button>
            </Link> : null;
        
        return (
            <>
                <div className='container bg-white create-post-form'>
                    <div>
                        <Link to='/owner'>
                            <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Link>
                
                        <div className="form-group">
                            <label className='header-text'>Заголовок:
                                <input 
                                    onChange={this.title}
                                    value={this.state.title}
                                    className="form-control"/>
                            </label>
                            <hr/>

                            <div className='chenge-textarea-btn'>
                                <button onClick={this.break} type="button" className="btn btn-outline-info">Перенос строки</button>
                                <button onClick={this.bold} type="button" className="btn btn-outline-info">Жирный</button>
                                <button onClick={this.italick} type="button" className="btn btn-outline-info">Курсив</button>
                                <button onClick={this.underline} type="button" className="btn btn-outline-info">Подчёркнутый</button>
                                <button onClick={this.deleted} type="button" className="btn btn-outline-info">Зачёркнутый</button>
                                <button onClick={this.href} type="button" className="btn btn-outline-info">Ссылка</button>
                                <button onClick={this.img} type="button" className="btn btn-outline-info">Картинка</button>
                            </div>

                            <div className='text-area'>
                                <textarea onChange={this.textArea} cols="30" rows="10" value={this.state.textArea} ></textarea>
                            </div>
                        </div>

                        <div className='text-area'>
                            <h2>{this.state.title}</h2>
                            <hr/>
                            <div 
                                className='superText super-text-style' 
                                contentEditable='false' 
                                dangerouslySetInnerHTML={{ __html: `${this.state.textArea}` }}>
                                </div>
                        </div>
                        <br/>
                        <hr/>
                        <div className='save-my-post-btn'>
                            {sendBtn}
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}


export default connect( mapStateToProps )(CreatePost);