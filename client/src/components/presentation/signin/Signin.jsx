import React, {
    useEffect,
    useState,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import background from '@img/background-signin';

import GTranslateIcon from '@material-ui/icons/GTranslate';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Checkbox from '@material-ui/core/Checkbox';

import ButtonSignInWith from '../ButtonSignInWith/ButtonSignInWith';

import FormGroup from '../FormGroup/FormGroup';

import { Link } from 'react-router-dom';

import './Signin.scss';

import { useDispatch } from 'react-redux';

import { userSignIn, withGoogle, withFacebook } from '@features/user/userSlice.js';

const Signin = () => {
    const dispatch = useDispatch();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [activeLogin, setActiveLogin] = useState(false);
    const [activePassword, setActivePassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // console.log('Render component: Signin');
    });

    const toggleActiveLogin = useCallback(
        () => setActiveLogin((prev) => !prev),
        [activeLogin]
    );

    const toggleActivePassword = useCallback(
        () => setActivePassword((prev) => !prev),
        [activePassword]
    );

    const togglePasswordVisible = useCallback(
        () => setPasswordVisible((prev) => !prev),
        [passwordVisible]
    );

    const refFormSignIn = useRef('');
    const refCheckbox = useRef('');

    const signIn = () => {
        console.log('Sign in');
        let form = new FormData(refFormSignIn.current);

        let user = {
            login: form.get('login'),
            password: form.get('password'),
            check: isChecked,
        };

        if (
            (user.login.length > 0) &
            (user.password.length > 0) &
            (user.check === true)
        ) {
            dispatch(userSignIn(user))
        }
    };

    const signInWithFaceBook = () => {
        console.log('Sign in with FaceBook');
        dispatch(withFacebook())
    };

    const signInWithGoogle = () => {
        dispatch(withGoogle())
    };

    const visibleIcon = useMemo(
        () => <VisibilityIcon onClick={togglePasswordVisible} />,
        []
    );

    return (
        <div className='signin'>
            <div className='image'>
                <img src={background} />
            </div>
            <div className='form'>
                <form ref={refFormSignIn}>
                    <h2>Sign in</h2>

                    <FormGroup
                        name={activeLogin === true ? 'active first' : ''}
                        Icon={AccountCircleIcon}
                        type='login'
                        toggleActiveLogin={toggleActiveLogin}
                    ></FormGroup>

                    <FormGroup
                        name={activePassword === true ? 'active Two' : ''}
                        Icon={VpnKeyIcon}
                        type='password'
                        toggleActivePassword={toggleActivePassword}
                        passwordVisible={passwordVisible}
                    >
                        {visibleIcon}
                    </FormGroup>
                    <div className='footer'>
                        <div>
                            <Checkbox
                                checked={isChecked}
                                onChange={() => setIsChecked((prev) => !prev)}
                            />
                            Remember me
                        </div>
                        <button
                            className='btnlogin'
                            onClick={signIn}
                            type='button'
                        >
                            LOGIN
                        </button>
                    </div>
                    <div className='manipulation'>
                        <Link className='register' to='/sign-up'>
                            Register now
                        </Link>
                        <Link className='forgot' to='/forgot-password'>
                            Forgot password?
                        </Link>
                    </div>
                </form>
                <div className='devider'>
                    <div className='line'></div>
                    <span>or</span>
                    <div className='line'></div>
                </div>
                <ButtonSignInWith
                    type='FB'
                    text='Login in with facebook'
                    Icon={FacebookIcon}
                    authWith={signInWithFaceBook}
                />
                <ButtonSignInWith
                    type='GO'
                    text='Login in with google'
                    Icon={GTranslateIcon}
                    authWith={signInWithGoogle}
                />
            </div>
        </div>
    );
};

export default Signin;
