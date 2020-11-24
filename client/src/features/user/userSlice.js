import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSignIn = createAsyncThunk("user/signIn", ({ login, password, check }) => {
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
        .then(data => console.log(data));
})

export const withGoogle = createAsyncThunk("user/signInWithGoogle", () => {
    window.open("http://localhost:3001/auth/google", "_self")
})

export const withFacebook = createAsyncThunk("user/withFacebook", () => {
    window.open("http://localhost:3001/auth/facebook", "_self")
})

export const checkIsAuthUser = createAsyncThunk("user/checkIsAuthUser", () => 
    fetch("http://localhost:3001/auth/checkoutIsAuth", {
        method : "GET",
        credentials : "include"
    }).then( response => response.json())
)

export const logout = createAsyncThunk("user/logout", () => 
    fetch("http://localhost:3001/auth/logoutService", {
        method : "GET",
        credentials : "include"
    }).then( response => response.json())
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        name: "",
        photo: "",
        statusAuth : undefined
    },

    extraReducers: {
        [userSignIn.fulfilled]: (state, action) => {

        },

        [userSignIn.rejected]: (state, action) => {

        },

        [logout.fulfilled]: (state, action) => {
            if(action.payload.status === "ok") {
                console.log(action);
                state.id = "";
                state.name = "";
                state.photo = "";
                state.statusAuth = false;
            }
        },

        [logout.rejected]: (state, action) => {

        },

        [checkIsAuthUser.fulfilled]: (state, action) => {
            if(action.payload.status === "ok") {
                const {id_Service, name, photo} = action.payload.userData;
    
                state.id = (id_Service) ? id_Service: "";
                state.name = (name) ? name: "";
                state.photo = (photo) ? photo : "";
                state.statusAuth = true;
                return;
            }
            
            state.statusAuth = false;
        },

        [checkIsAuthUser.rejected]: (state, action) => {

        }

    }
})

export default userSlice.reducer;
