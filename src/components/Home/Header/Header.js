import React from 'react'
import { Link } from 'react-router-dom';
import { HiUserCircle } from "react-icons/hi";

import './Header.css'

function Header() {
    return (
        <div className='header'>
            <h1>Logo</h1>
            

            <Link to='profile'>
                <HiUserCircle className='profile_icon'/>
            </Link>
        </div>
    )
}

export default Header
