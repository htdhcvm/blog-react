import { configureStore } from "@reduxjs/toolkit";

import userReduser from "@features/user/userSlice.js";
import postsReduser from "@features/posts/postsSlice.js";

export default configureStore({
    reducer : ({
        user : userReduser,
        posts : postsReduser
    })
})
