import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from '../../icons/logo.png'
import instagramm from '../../icons/instagram-icon.svg';

export default function Footer() {
    return(
        <footer className='d-flex justify-content-center align-items-center'>
        <div className='container d-flex align-items-center'>
            <div className="row w-100">
                <div className="col-12 col-md-3">
                    <div className='footer-left'>
                        <Link to="/" className='react-Link'>
                            <div className='footer-logo'>
                                <img src={logo} alt='Logotype'/>
                            </div>
                            <span className='fotter-logo-text'>ProBird</span>
                        </Link>
                    </div>
                </div>
                <div className="col-6 col-md-6">
                    <div className='footer-middle'>© 2020 ProBird. Все права защищены.</div>
                </div>
                <div className="col-6 col-md-3">
                    <div className='footer-right'>
                        <a href="https://www.instagram.com/akulov__dima/?igshid=s6r1zca5ujoz" target='_blank'>
                            <img src={instagramm} alt='Link to instagramm'/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
}