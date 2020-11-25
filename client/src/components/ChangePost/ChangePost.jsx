import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostOnId from '../presentation/PostOnId/PostOnId';

import { updateListPosts, updatePost } from '@features/posts/postsSlice';
import { useParams } from 'react-router-dom';

const ChangePost = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const currentPostData = useSelector((state) => state.posts.currentPost);

    const [title, setTitle] = useState('');
    const [mainContent, setMainContent] = useState('');

    useEffect(() => {
        if (currentPostData.title !== undefined)
            setTitle(currentPostData.title);
        if (currentPostData.mainContent !== undefined)
            setMainContent(currentPostData.mainContent);
    }, [currentPostData]);

    const changeTitle = (e) => {
        let title = e.target.value;
        setTitle(title);
        dispatch(updateListPosts({ type: 'title', text: title }));
    };

    const changeMainContent = (e) => {
        let content = e.target.value;
        setMainContent(content);
        dispatch(updateListPosts({ type: 'mainContent', text: content }));
    };

    const changePost = (e) => {
        e.preventDefault();
        console.log(id, title, mainContent)
        dispatch(updatePost({ idPost: id, title: title, text: mainContent }));

        setTitle("");
        setMainContent("");
    };

    return (
        <PostOnId>
            <form onSubmit={changePost} className='form-change'>
                <div className='form-group'>
                    <input
                        type='text'
                        value={title}
                        onChange={changeTitle}
                        placeholder='Title'
                    />
                </div>
                <div className='form-group'>
                    <textarea
                        placeholder='Main content change'
                        value={mainContent}
                        onChange={changeMainContent}
                    />
                </div>
                <button>Change</button>
            </form>
        </PostOnId>
    );
};

export default ChangePost;
