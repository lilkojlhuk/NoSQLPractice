import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    records: [],
    loading: false,
    status: null,
}

export const createRecord = createAsyncThunk('record/createRecord', async ({ title, text }) => {
    try {
        const { data } = await axios.post('/record/add', { title, text })

        return data

    } catch (error) {
        console.log(error)
    }
})

export const getAllRecord = createAsyncThunk('record/getAllRecord', async () => {
    try {
        const { data } = await axios.get('/record/all')

        return data

    } catch (error) {
        console.log(error)
    }
})

export const removeRecord = createAsyncThunk('record/removeRecord', async (id) => {
    try {
        const { data } = await axios.get(`/record/remove/${id}`, id)

        return data

    } catch (error) {
        console.log(error)
    }
})

export const updateRecord = createAsyncThunk('post/updateRecord', async (requestData) => {
    try {
        const { data } = await axios.put(`/record/edit/${requestData.id}`, requestData)

        return data
    } catch (error) {
        console.log(error)
    }
})

export const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {},
    extraReducers: {

        // Создание поста
        [createRecord.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createRecord.fulfilled]: (state, action) => {
            state.loading = false
            state.records.push(action.payload)
            state.status = action.payload.message
        },
        [createRecord.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },

        // Получение всех постов
        [getAllRecord.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getAllRecord.fulfilled]: (state, action) => {
            state.loading = false
            state.records = action.payload
            state.status = action.payload.message

        },
        [getAllRecord.rejected]: (state, action) => {
            state.status = action.payload.message
            state.loading = false
        },

        // Удаление поста
        [removeRecord.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [removeRecord.fulfilled]: (state, action) => {
            state.loading = false
            if (action.payload && action.payload.id) {
                state.records = state.records.filter((record) => record.id !== action.payload.id)
            }
        },
        [removeRecord.rejected]: (state, action) => {
            state.loading = false
        },

        // Редактирование поста 
        [updateRecord.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateRecord.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.records.findIndex((record) => record.id === action.payload.id,)
            state.records[index] = action.payload
        },
        [updateRecord.rejected]: (state, action) => {
            state.loading = false
        },
    },
})

export default recordSlice.reducer