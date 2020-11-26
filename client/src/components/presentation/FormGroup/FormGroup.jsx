import React, { useEffect } from 'react';

import './FormGroup.scss';

const FormGroup = React.memo(
    ({
        name,
        Icon,
        type,
        toggleActiveLogin,
        toggleActivePassword,
        passwordVisible,
        refOn, 
        children,
    }) => {
        useEffect(() => {
            // console.log('Render component: FormGroup');
        });

        return (
            <div className={'form-group ' + name}>
                <div className='icon'>
                    <Icon />
                </div>

                {type === 'login' ? (
                    <input
                        name='login'
                        onFocus={() => toggleActiveLogin()}
                        onBlur={() => toggleActiveLogin()}
                        className='login'
                        type='text'
                        ref={refOn}
                        placeholder='Username or email'
                    />
                ) : (
                    <div className='input-wrapper'>
                        <input
                            name="password"
                            ref={refOn}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='Password'
                            onFocus={toggleActivePassword}
                            onBlur={toggleActivePassword}
                        />
                        {children}
                    </div>
                )}
            </div>
        );
    }
);

export default FormGroup;
