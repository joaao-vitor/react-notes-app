import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    notes: [],
    error: '',
};

const BASE_URL = 'http://192.168.0.13:3000';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', () => {
    return axios.get(`${BASE_URL}/notes`).then((res) => res.data);
});

export const fetchNoteById = createAsyncThunk('notes/fetchNotesById', (id) => {
    return axios.get(`${BASE_URL}/notes/${id}`).then((res) => res.data);
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = action.payload.sort((noteA, noteB) => {
                return new Date(noteB.date) - new Date(noteA.date);
            });
            state.error = '';
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false;
            state.notes = [];
            state.error = action.error.message;
        });
    },
});

export default dataSlice.reducer;
