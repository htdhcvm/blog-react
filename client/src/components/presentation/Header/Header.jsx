import React from 'react';
import logo from '@img/logo.png';

import SearchIcon from '@material-ui/icons/Search';

import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import { logout } from '@features/user/userSlice';

import { useDispatch, useSelector } from 'react-redux';

import './Header.scss';

const Header = () => {
    const dispacth = useDispatch();
    const name = useSelector((state) => state.user.name);
    const photo = useSelector((state) => state.user.photo);

    return (
        <div className='Header'>
            <Link to='/main'>
                <img className='logo' src={`http://localhost:3000/${logo}`}></img>
            </Link>
            <div className='search'>
                <input />
                <SearchIcon />
            </div>
            <div className='info'>
                <Link to='write-post'>write post</Link>
                <div className='userData'>
                    <span>{name}</span>
                    <Avatar src={photo} />
                </div>
                <span className='logout' onClick={() => dispacth(logout())}>
                    Log out
                </span>
            </div>
        </div>
    );
};

export default Header;
