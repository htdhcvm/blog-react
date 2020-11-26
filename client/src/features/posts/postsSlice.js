import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addPost = createAsyncThunk("posts/addPost", ({ title, text }) =>
    fetch("http://localhost:3001/blog/post/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ title, text })
    })
        .then(response => response.json())
)

export const getPosts = createAsyncThunk("posts/getPosts", () =>
    fetch("http://localhost:3001/blog/post/getAllPosts", {
        method: "GET"
    })
        .then(response => response.json())
)

export const getcountPages = createAsyncThunk("posts/getcountPages", () =>
    fetch("http://localhost:3001/blog/post/countPages", {
        method: "GET"
    })
        .then(response => response.json())
)

export const getCurrentPost = createAsyncThunk("posts/getCurrentPost", (id) =>
    fetch(`http://localhost:3001/blog/post/${id}`, {
        method: "GET"
    })
        .then(r => r.json())
)

export const deletePost = createAsyncThunk("post/deletePost", (id) =>
    fetch(`http://localhost:3001/blog/post/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
        .then(r => r.json())
)

export const getAllPostOnUser = createAsyncThunk("post/getAllPostOnUser", () =>
    fetch(`http://localhost:3001/blog/post/getAllPostsOnUser`, {
        method: "GET",
        credentials: "include"
    })
        .then(r => r.json())
)

export const updatePost = createAsyncThunk("post/updatePost", ({ idPost, title, text }) =>
    fetch(`http://localhost:3001/blog/post/${idPost}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, text })
    })
        .then(r => r.json())
)

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        count: 0,
        countPages: 0,
        currentPost: {},
        listPosts: [],
        allPostOnCurrentUser: []
    },
    reducers: {
        clearCurrentPost(state, action) {
            state.currentPost = {};
        },

        updateListPosts(state, action) {
            state.currentPost[action.payload.type] = action.payload.text;
        }

    },
    extraReducers: {
        [addPost.fulfilled]: (state, action) => {
            console.log(action);
            state.count++;
            state.listPosts.push(action.payload.post)
        },

        [getPosts.fulfilled]: (state, action) => {
            state.listPosts = action.payload.listPosts;
            state.count = action.payload.listPosts.length
        },

        [getcountPages.fulfilled]: (state, action) => {
            state.countPages = action.payload.count;
        },

        [getCurrentPost.fulfilled]: (state, action) => {
            state.currentPost = action.payload.post;
        },

        [getAllPostOnUser.fulfilled]: (state, action) => {
            state.allPostOnCurrentUser = action.payload.posts
        },

        [deletePost.fulfilled]: (state, action) => {
            state.allPostOnCurrentUser = action.payload.posts;
        },

        [updatePost.fulfilled]: (state, action) => {
            state.currentPost.title = action.payload.post.title;
            state.currentPost.mainContent = action.payload.post.text;
        },




        [updatePost.rejected]: (state, action) => {

        },

        [deletePost.rejected]: (state, action) => {

        },

        [getAllPostOnUser.rejected]: (state, action) => {

        },

        [getCurrentPost.rejected]: (state, action) => {

        },

        [getcountPages.rejected]: (state, action) => {

        },


        [getPosts.rejected]: (state, action) => {

        },

        [addPost.rejected]: (state, action) => {

        },
    }
})

export const { clearCurrentPost, updateListPosts } = postsSlice.actions;

export default postsSlice.reducer;
