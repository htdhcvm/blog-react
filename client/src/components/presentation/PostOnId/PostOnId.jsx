import React, { useEffect } from 'react';

import './PostOnId.scss';
import Header from '../Header/Header';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPost, clearCurrentPost } from '@features/posts/postsSlice';

const PostOnId = ({children}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentPost = useSelector((state) => state.posts.currentPost);
    let history = useHistory();

    useEffect(() => {
        dispatch(getCurrentPost(id));
        return () => {
            dispatch(clearCurrentPost());
        };
    }, []); 
    return (
        <div className='PostOnId Page'>
            <Header />
            <span
                className='back'
                onClick={() => {
                    history.goBack();
                }}
            >
                <KeyboardBackspaceIcon />
                Back
            </span>
            {children}
            <div className='PostData'>
                <h1>{currentPost.title}</h1>
                <h4>{currentPost.author}</h4>
                <span>{currentPost.date}</span>
                <p>{currentPost.mainContent}</p>
            </div>
        </div>
    );
};

export default PostOnId;
