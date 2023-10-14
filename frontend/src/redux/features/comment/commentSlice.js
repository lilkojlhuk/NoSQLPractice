import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    comments: [],
    loading: false,
    status: null,
}

export const createComment = createAsyncThunk('comments/createComment', async ({ comment }) => {
    try {
        const { data } = await axios.post('/comments/addcomm', { comment })

        return data

    } catch (error) {
        console.log(error)
    }
})

export const getAllComment = createAsyncThunk('comments/getAllComment', async () => {
    try {
        const { data } = await axios.get('/comments/allcomm')

        return data

    } catch (error) {
        console.log(error)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {

        // Создание комментария
        [createComment.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
            state.status = action.payload.message
        },
        [createComment.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },

        // Получение всех комментариев
        [getAllComment.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getAllComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
            state.status = action.payload.message

        },
        [getAllComment.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },
    },
})

export default commentSlice.reducer