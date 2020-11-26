import React from "react";
import PropTypes from "prop-types";

import "./CircleSignInWith.scss";
import { useDispatch } from 'react-redux';


const CircleSignInWith = ({ type, Icon, signIn }) => {
    const dispatch = useDispatch();

    return (
        <div className="Circle" onClick={() => {
            console.log("click")
            dispatch(signIn())
        }}>
            <div
                className={
                    "CircleSignInWith " +
                    (type === "TW"
                        ? "twitter"
                        : type === "FC"
                        ? "facebook"
                        : "google")
                }
            >
                <Icon />
            </div>
        </div>
    );
};

CircleSignInWith.propTypes = {
    type: PropTypes.string,
    Icon: PropTypes.object,
};

export default CircleSignInWith;
