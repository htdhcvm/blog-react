import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Settings.scss';
import Header from '../Header/Header';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { getAllPostOnUser, deletePost } from '@features/posts/postsSlice';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Settings = () => {
    const dispath = useDispatch();

    const allPostMine = useSelector(
        (state) => state.posts.allPostOnCurrentUser
    );

    useEffect(() => {
        dispath(getAllPostOnUser());
    }, []);

    return (
        <div className='Settings Page'>
            <Header />
            <div className='listPosts'>
                {allPostMine.map((post) => (
                    <div className='item' key={uuidv4()}>
                        <Link to={`/settings/${post._id}`}>
                            <h3>{post.title}</h3>
                        </Link>
                        <Link to={`/settings/${post._id}`}>
                            <span>{post.date}</span>
                        </Link>
                        <Link to={`/settings/${post._id}`}>
                            <p>{post.mainContent}</p>
                        </Link>
                        <DeleteForeverIcon
                            onClick={() => dispath(deletePost(post._id))}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;
