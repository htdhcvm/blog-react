import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import Signin from './components/presentation/signin/Signin';
import Signup from './components/presentation/signup/Signup';
import Main from './components/presentation/main/Main';
import WritePost from './components/presentation/write-post/Write-post';
import ForgorPassword from './components/presentation/ForgorPassword/ForgorPassword';
import NotFound from './components/presentation/404/NotFound';
import Settings from './components/presentation/Settings/Settings.jsx';
import PostOnId from './components/presentation/PostOnId/PostOnId';
import ChangePost from "./components/ChangePost/ChangePost";

import Private from './components/privateRoute/privateRoute';
import AuthRouter from './components/authRouter/AuthRouter';

import { checkIsAuthUser } from '@features/user/userSlice.js';

import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("Render component: App")
    });

    useEffect(() => {
        dispatch(checkIsAuthUser());
    }, []);

    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Private path='/main'>
                        <Main />
                    </Private>
                    <Private path='/write-post'>
                        <WritePost />
                    </Private>
                    <Private path='/settings/:id'>
                        <ChangePost />
                    </Private>
                    <Private path='/settings'>
                        <Settings />
                    </Private>
                    <Private path='/post/:id'>
                        <PostOnId />
                    </Private>
                    <Route path='/sign-up'>
                        <Signup />
                    </Route>
                    <Route path='/forgot-password'>
                        <ForgorPassword />
                    </Route>
                    <AuthRouter exact path='/'>
                        <Signin />
                    </AuthRouter>
                    <Route path='/*'>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
