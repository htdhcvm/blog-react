import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Content.scss';

import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getcountPages } from '@features/posts/postsSlice';




const posts = [
    // import background_1 from "@img/background_1";
    // import background_2 from "@img/background_2";
    // import background_3 from "@img/background_3";
    // import background_4 from "@img/background_4";
    // import background_5 from "@img/background_5";
    // import background_6 from "@img/background_6";
    // import background_7 from "@img/background_7";
    // {
    //     title: "Title_1",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     date: "02.04.2020",
    //     time: "18:04",
    //     author: "Andre",
    //     image : background_1
    // },
    // {
    //     title: "Title_2",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     date: "02.04.2020",
    //     time: "18:04",
    //     author: "Hulio",
    //     image : background_2
    // },
    // {
    //     title: "Title_3",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     date: "02.04.2020",
    //     time: "18:04",
    //     author: "Petro",
    //     image : background_3
    // },
    // {
    //     title: "Title_4",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     date: "02.04.2020",
    //     time: "18:04",
    //     author: "Jigurda",
    //     image : background_4
    // },
    // {
    //     title: "Title_5",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     date: "02.04.2020",
    //     time: "18:04",
    //     author: "Pedro",
    //     image : background_5
    // },
    // {
    //     title: "Title_6",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     date: "02.04.2020",
    //     time: "18:04",
    //     author: "Alpacho",
    //     image : background_6
    // },
    // {
    //     title: "Title_7",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //     date: "02.04.2020",
    //     time: "18:04",
    //     author: "Max",
    //     image : background_7
    // },
];

const Content = () => {
    const dispatch = useDispatch();
    const countPosts = useSelector((state) => state.posts.count);
    const countPages = useSelector((state) => state.posts.countPages);
    const listPosts = useSelector((state) => state.posts.listPosts);
    const [mapCountPages, setMapCountPages] = useState([]);

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getcountPages());
    }, []);


    useEffect(() => {
        for(let i = 1; i < countPages + 1; i++) {
            setMapCountPages(old => [...old, (
                <li key={uuidv4()}>{i}</li>
            )]);

        }
    }, [countPages])

    return (
        <div className='Content'>
            <h2>Count posts : {countPosts}</h2>
            <div className='listPosts'>
                {listPosts.map((item) => {
                    return (
                        <Post
                            id={item._id}
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            author={item.author}
                            key={uuidv4()}
                        />
                    );
                })}
            </div>
            <div className='pagination'>
                <ul>
                    {
                        mapCountPages.map(item => item)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Content;
