import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchNotes } from '../data/dataSlice';

const initialState = {
    loading: false,
    note: {},
    error: '',
};

const BASE_URL = 'http://192.168.0.23:3000';

export const fetchNoteById = createAsyncThunk('notes/fetchNotesById', (id) => {
    return axios.get(`${BASE_URL}/notes/${id}`).then((res) => res.data);
});

export const updateNote = createAsyncThunk('notes/updateNote', (note) => {
    return axios
        .put(`${BASE_URL}/notes/${note.id}`, note)
        .then((res) => res.data);
});

const searchedNoteSlice = createSlice({
    name: 'data',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNoteById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchNoteById.fulfilled, (state, action) => {
            state.loading = false;
            state.note = action.payload;
            state.error = '';
        });
        builder.addCase(fetchNoteById.rejected, (state, action) => {
            state.loading = false;
            state.note = {};
            state.error = action.error.message;
        });
        builder.addCase(updateNote.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateNote.fulfilled, (state, action) => {
            state.loading = false;
            state.note = action.payload;
            state.error = '';
        });
        builder.addCase(updateNote.rejected, (state, action) => {
            state.loading = false;
            state.note = {};
            state.error = action.error.message;
        });
    },
});

export default searchedNoteSlice.reducer;
export const { editNote } = searchedNoteSlice.actions;
