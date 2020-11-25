import React from 'react';
import logo from '@img/logo.png';

import { Link } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
import DropDown from '../DropDown/DropDown';

import { useSelector } from 'react-redux';

import './Header.scss';

const dropItems = [
    {
        name: 'Write post',
        link: 'write-post',
        Icon: CreateIcon,
        active: true,
    },
    {
        name: 'Settings',
        link: 'settings',
        Icon: SettingsIcon,
        active: false,
    },
    {
        name: 'Logout',
        link: '',
        Icon: ExitToAppIcon,
        active: false,
    },
];

const Header = () => {
    const name = useSelector((state) => state.user.name);
    const photo = useSelector((state) => state.user.photo);

    return (
        <div className='Header'>
            <Link to='/main'>
                <img
                    className='logo'
                    src={`http://localhost:3000/${logo}`}
                ></img>
            </Link>
            <div className='search'>
                <input />
                <SearchIcon />
            </div>
            <div className='info'>
                <div className='userData'>
                    <span>{name}</span>
                    <Avatar src={photo} />
                </div>
                <DropDown data={dropItems} />

                {/* <Link to='write-post'>write post</Link>
                <span className='logout' onClick={() => dispacth(logout())}>
                    Log out
                </span> */}
            </div>
        </div>
    );
};

export default Header;
