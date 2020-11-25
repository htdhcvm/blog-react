import React, { useRef } from 'react';

import Header from '../Header/Header';
import Button from '@material-ui/core/Button';
import { addPost } from '@features/posts/postsSlice.js';

import { useDispatch } from 'react-redux';

import './Write-post.scss';

const Writepost = () => {
    const dispatch = useDispatch();

    const formAddPost = useRef('');
    const titleForm = useRef('');
    const textForm = useRef('');

    const addPostForm = (e) => {
        e.preventDefault();

        let form = new FormData(formAddPost.current);

        let title = form.get('title');
        let text = form.get('text');

        if ((title.length > 0) & (text.length > 0)) {
            dispatch(addPost({ title: title, text: text }));
        }

        titleForm.current.value = "";
        textForm.current.value = "";
    };

    return (
        <div className='write-post Page'>
            <Header />
            <form ref={formAddPost} onSubmit={addPostForm}>
                <div className='form-group'>
                    <input
                        ref={titleForm}
                        name='title'
                        type='text'
                        placeholder='Enter title'
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        ref={textForm}
                        name='text'
                        placeholder='Enter your text post'
                    ></textarea>
                </div>
                <Button type='submit' size='large'>
                    Create post
                </Button>
            </form>
        </div>
    );
};

export default Writepost;
