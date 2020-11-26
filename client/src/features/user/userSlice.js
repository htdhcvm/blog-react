import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const userSignIn = createAsyncThunk("user/signIn", ({ login, password }) =>
    fetch("http://localhost:3001/auth/signIn", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login,
            password
        })
    })
        .then(response => response.json())
)


export const registrationUser = createAsyncThunk("user/registrationUser", ({ login, password }) =>
    fetch("http://localhost:3001/auth/registration", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: login, password: password
        })
    })
        .then(response => {
            return response.json();
        })
)

export const withGoogle = createAsyncThunk("user/signInWithGoogle", () => {
    window.open("http://localhost:3001/auth/google", "_self")
})

export const withFacebook = createAsyncThunk("user/withFacebook", () => {
    window.open("http://localhost:3001/auth/facebook", "_self")
})

export const checkIsAuthUser = createAsyncThunk("user/checkIsAuthUser", () =>
    fetch("http://localhost:3001/auth/checkoutIsAuth", {
        method: "GET",
        credentials: "include"
    }).then(response => response.json())
)

export const logout = createAsyncThunk("user/logout", () =>
    fetch("http://localhost:3001/auth/logoutService", {
        method: "GET",
        credentials: "include"
    }).then(response => response.json())
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        name: "",
        photo: "",
        statusAuth: undefined
    },
    reducers: {

    },
    extraReducers: {
        [userSignIn.fulfilled]: (state, action) => {
            console.log(action);
            if (action.payload.status === "ok") {
                const { id_Service, name, photo } = action.payload.userData;

                state.id = (id_Service) ? id_Service : "";
                state.name = (name) ? name : "";
                state.photo = (photo) ? photo : "";
                state.statusAuth = true;
                return;
            }
        },

        [registrationUser.fulfilled]: (state, action) => {
            if (action.payload.status === "ok") {
                const { id_Service, name, photo } = action.payload.userData;

                state.id = (id_Service) ? id_Service : "";
                state.name = (name) ? name : "";
                state.photo = (photo) ? photo : "";
                state.statusAuth = true;
                return;
            }
        },

        [checkIsAuthUser.fulfilled]: (state, action) => {
            if (action.payload.status === "ok") {
                const { id_Service, name, photo } = action.payload.userData;

                state.id = (id_Service) ? id_Service : "";
                state.name = (name) ? name : "";
                state.photo = (photo) ? photo : "";
                state.statusAuth = true;
                return;
            }

            state.statusAuth = false;
        },

        [logout.fulfilled]: (state, action) => {
            if (action.payload.status === "ok") {
                state.id = "";
                state.name = "";
                state.photo = "";
                state.statusAuth = false;
            }
        },

        [registrationUser.rejected]: (state, action) => {
            console.log(action);
        },

        [checkIsAuthUser.rejected]: (state, action) => {

        },

        [logout.rejected]: (state, action) => {

        },

        [userSignIn.rejected]: (state, action) => {

        }

    }
})

export default userSlice.reducer;
