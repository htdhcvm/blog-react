import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Post.scss';

const Post = ({ id, title, description, date, author }) => {
    return (
        <Link to={`/post/${id}`}>
            <div className='Post'>
                <p>{title}</p>
                <p>{description}</p>
                <p>{date}</p>
                <p>{author}</p>
            </div>
        </Link>
    );
};

Post.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.string,
};

export default Post;
