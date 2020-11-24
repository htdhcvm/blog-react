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
    fetch("http://localhost:3001/blog/post/getPosts", {
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

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        count: 0,
        countPages: 0,
        listPosts: [],
        currentPost: {}
    },
    reducers: {
        clearCurrentPost(state, action) {
            state.currentPost = {};
        }
    },
    extraReducers: {
        [addPost.fulfilled]: (state, action) => {
            console.log(action);
            state.count++;
            state.listPosts.push(action.payload.post)
        },

        [addPost.rejected]: (state, action) => {

        },

        [getPosts.fulfilled]: (state, action) => {
            state.listPosts = action.payload.listPosts;
            state.count = action.payload.listPosts.length
        },

        [getPosts.rejected]: (state, action) => {

        },

        [getcountPages.fulfilled]: (state, action) => {
            state.countPages = action.payload.count;
        },

        [getcountPages.rejected]: (state, action) => {

        },

        [getCurrentPost.fulfilled]: (state, action) => {
            state.currentPost = action.payload.post;
        },

        [getCurrentPost.rejected]: (state, action) => {

        },
    }
})

export const { clearCurrentPost } = postsSlice.actions;

export default postsSlice.reducer;
