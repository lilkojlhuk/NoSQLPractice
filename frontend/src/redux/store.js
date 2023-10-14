import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice"
import recordSlice from "./features/record/recordSlice"
import commentSlice from "./features/comment/commentSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        record: recordSlice,
        comment: commentSlice
    }
})