import React from "react";
import bander from "@img/404.gif";

import "./NotFound.scss";

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="NotFound">
            <div className="left">
                <h1>404</h1>
                <Link to="/main">Back to home</Link>
            </div>
            <div className="bander">
                <img src={bander} />
            </div>
        </div>
    );
};

export default NotFound;
