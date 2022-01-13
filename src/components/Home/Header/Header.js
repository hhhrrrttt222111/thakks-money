import React from 'react'
import { Link } from 'react-router-dom';
import { HiUserCircle } from "react-icons/hi";

import logoImg from '../../../assets/images/logo.png'

import './Header.css'

function Header() {
    return (
        <div className='header'>
            <div className='logo_img'>
               <img onClick={() => {window.location.reload()}} src={logoImg} alt="" />
            </div>
            <Link to='profile'>
                <HiUserCircle className='profile_icon'/>
            </Link>
        </div>
    )
}

export default Header
