import React from "react";

import {
    Route,
    Redirect
} from "react-router-dom";

import {useSelector} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';


const AuthRouter = ({ children, ...rest }) => {
    const statusUserAuth = useSelector(state => state.user.statusAuth);
    console.log(rest);
    return (
        <Route 
            {...rest}
            render={() => 
                (statusUserAuth)
                    ? <Redirect to="/main"/>
                    : (statusUserAuth === false) ? children : <CircularProgress />
            }
        >

        </Route>
    )
    // return <Route {...rest} render={({ location }) => children} />;
};

export default AuthRouter;



