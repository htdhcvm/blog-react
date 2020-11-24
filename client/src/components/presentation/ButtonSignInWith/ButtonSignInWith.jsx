import React from "react";
import PropTypes from "prop-types";
import "./ButtonSignInWith.scss";

const ButtonSignInWith = ({ type, text, Icon, authWith }) => {
    return (
        <div className="Button" onClick={authWith}>
            <div
                className={
                    "ButtonSignInWith " +
                    (type === "FB"
                        ? "facebook"
                        : type === "TW"
                        ? "twitter"
                        : "google")
                }
            >
                <div className="icon">
                    <Icon />
                </div>
                <div className="text">{text.toUpperCase()}</div>
            </div>
        </div>
    );
};

ButtonSignInWith.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    Icon: PropTypes.object,
};

export default ButtonSignInWith;
