import React from "react";
import PropTypes from "prop-types";

import "./CircleSignInWith.scss";

const CircleSignInWith = ({ type, Icon }) => {
    return (
        <div className="Circle">
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
