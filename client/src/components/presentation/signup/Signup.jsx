import React from "react";

import background from "@img/background-signup";

import GTranslateIcon from "@material-ui/icons/GTranslate";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import CircleSignInWith from "../CircleSignInWith/CircleSignInWith";

import Checkbox from "@material-ui/core/Checkbox";

import "./Signup.scss";

const Signup = () => {
    return (
        <div className="signUp">
            <div className="form">
                <h2>Registration</h2>
                <form>
                    <div className="header">
                        <CircleSignInWith type="TW" Icon={TwitterIcon} />
                        <CircleSignInWith type="FC" Icon={FacebookIcon} />
                        <CircleSignInWith type="GO" Icon={GTranslateIcon} />
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <AccountCircleIcon />
                        </div>
                        <input className="login" placeholder="Username or email" />
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <VpnKeyIcon />
                        </div>
                        <div className="inputWrapper">
                            <input placeholder="Password" type="password"/>
                            <VisibilityOffIcon />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <VpnKeyIcon />
                        </div>
                        <div className="inputWrapper">
                            <input placeholder="Confirm password" type="password"/>
                            <VisibilityOffIcon />
                        </div>
                    </div>
                    <div className="check">
                        <Checkbox /> Lorem ipsum dolor sit amet, consectetur
                    </div>
                    <button className="btnSignUp">Sign up</button>
                </form>
            </div>
            <div className="image">
                <img src={background} />
            </div>
        </div>
    );
};

export default Signup;
