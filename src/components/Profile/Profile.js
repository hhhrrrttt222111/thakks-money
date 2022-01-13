import React, { useContext, useState } from 'react';
import firebase from 'firebase/compat';
import { AuthContext } from '../../context/AuthContext';
import { Button, MenuItem, Menu } from '@mui/material'; 
import { Link, useNavigate } from 'react-router-dom';

import { IoChevronBack } from "react-icons/io5";



import './Profile.css'

function Profile() {

    const { currentUser, handleLogout } = useContext(AuthContext)
    let navigate = useNavigate();

    const deleteAccount = () => {
        const user = firebase.auth().currentUser;
        user.delete().then(() => {
            // User deleted.
        }).catch((error) => {
            console.log('Sign in again to delete account')
        });
    }

    const logout = () => {
        handleLogout()
        navigate("/login")
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div className='profile'>
            <Link to="/">
                <IoChevronBack className="profile-backarrow"/>
            </Link>
            <div className="logout">
                <img onClick={handleClick} src={currentUser.photoURL} alt="" className='profile_img'/>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
           
                <div className="profileContainer">
                    <div className="profile_header">
                        <img src={currentUser.photoURL} alt="" />
                        <div className="profile-name">
                            <h4>Name:</h4>
                            <h3>{currentUser.displayName}</h3>
                        </div>
                        <div className="profile-email">
                            <h4>Email:</h4>
                            <h3>{currentUser.email}</h3>
                        </div>
                    </div>
                    <div className="profile_options">
                        <Button onClick={deleteAccount}>Delete My Account</Button>
                    </div>
                </div>
            
        </div>
    )
}

export default Profile
