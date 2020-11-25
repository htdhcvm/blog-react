import React, { useState } from 'react';

import './DropDown.scss';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DropDownCard from '../DropDownCard/DropDownCard';

const DropDown = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleText = () => {
        console.log('Text');
    };

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <div className='dropbtn'>
                <button className='text' onClick={handleText}>
                    <h4> {data[0].name}</h4>
                </button>
                <button className='toggle' onClick={handleToggle}>
                    <ArrowDropDownIcon />
                </button>
                {open && <DropDownCard handleToggle={handleToggle} data={data} />}
            </div>
        </>
    );
};

export default DropDown;
