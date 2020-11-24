import React from "react";

import {
    Route,
    Redirect
} from "react-router-dom";

import {useSelector} from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
    const statusUserAuth = useSelector(state => state.user.statusAuth);
    
    return <Route {...rest} render={() => 
        (statusUserAuth)
            ? (children)
            : <Redirect to="/"/>
    } />;
};

export default PrivateRoute;
