import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './DropDownCard.scss';
import { logout } from '@features/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClickAwayListener } from '@material-ui/core';

const DropDownCard = ({ handleToggle, data }) => {
    const dispatch = useDispatch();

    return (
        <ClickAwayListener onClickAway={handleToggle}>
            <div className='DropDownCard'>
                {data.map((card) => (
                    <div
                        className={card.active ? 'item active' : 'item'}
                        key={uuidv4()}
                        onClick={() => {
                            if (card.name === 'Logout') dispatch(logout());
                        }}
                    >
                        {card.name !== 'Logout' ? (
                            <Link to={`/${card.link}/`}>
                                <span>{card.name}</span>
                                <card.Icon />
                            </Link>
                        ) : (
                            <>
                                <span>{card.name}</span>
                                <card.Icon />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </ClickAwayListener>
    );
};

export default DropDownCard;
