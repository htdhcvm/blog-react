import React, { useRef, useState, useEffect } from 'react';

import background from '@img/background-signup';

import GTranslateIcon from '@material-ui/icons/GTranslate';
import FacebookIcon from '@material-ui/icons/Facebook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import CircleSignInWith from '../CircleSignInWith/CircleSignInWith';

import {
    withGoogle,
    withFacebook,
    registrationUser,
} from '@features/user/userSlice';

import './Signup.scss';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch();
    const formRegistration = useRef('');
    const [isChecked, setIsChecked] = useState(false);

    const [helperText, setHelperText] = useState('');

    const registerUser = (e) => {
        e.preventDefault();

        let form = new FormData(formRegistration.current);

        let dataForm = {
            login: form.get('login'),
            password: form.get('passord'),
            retPassord: form.get('ret-password'),
            check: isChecked,
        };

        if (
            dataForm.login.trim().length &&
            dataForm.password.trim().length &&
            dataForm.retPassord.trim().length
        ) {
            if (dataForm.password === dataForm.retPassord) {
                if (dataForm.check) {
                    dispatch(
                        registrationUser({
                            login: dataForm.login,
                            password: dataForm.password,
                        })
                    ).catch( err => {
                        console.log(err);
                    })
                } else {
                    setHelperText('Check is not checkes');
                }
            } else {
                setHelperText('Passwords not equal');
            }
        } else {
            setHelperText('Fill fields');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setHelperText('');
        }, 5000);
    }, [helperText]);

    return (
        <div className='signUp'>
            <div className='form'>
                <h2>Registration</h2>
                <form ref={formRegistration} onSubmit={registerUser}>
                    <div className='header'>
                        <CircleSignInWith
                            type='FC'
                            Icon={FacebookIcon}
                            signIn={withFacebook}
                        />
                        <CircleSignInWith
                            type='GO'
                            Icon={GTranslateIcon}
                            signIn={withGoogle}
                        />
                    </div>
                    <div className='form-group'>
                        <div className='icon'>
                            <AccountCircleIcon />
                        </div>
                        <input
                            className='login'
                            placeholder='Username or email'
                            name='login'
                        />
                    </div>
                    <div className='form-group'>
                        <div className='icon'>
                            <VpnKeyIcon />
                        </div>
                        <div className='inputWrapper'>
                            <input
                                placeholder='Password'
                                type='password'
                                name='passord'
                            />
                            <VisibilityOffIcon />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='icon'>
                            <VpnKeyIcon />
                        </div>
                        <div className='inputWrapper'>
                            <input
                                placeholder='Confirm password'
                                type='password'
                                name='ret-password'
                            />
                            <VisibilityOffIcon />
                        </div>
                    </div>
                    <div className='check'>
                        <Checkbox
                            checked={isChecked}
                            onChange={() => setIsChecked((prev) => !prev)}
                        />{' '}
                        Lorem ipsum dolor sit amet, consectetur
                    </div>
                    <button className='btnSignUp'>Sign up</button>
                    <FormHelperText className='errorMessage'>
                        {helperText}
                    </FormHelperText>
                </form>
            </div>
            <div className='image'>
                <img src={background} />
            </div>
        </div>
    );
};

export default Signup;
