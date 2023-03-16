import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
    message: '',
    classes: '',
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setClasses: (state, action) => {
            state.classes = action.payload;
        },
    },
});

export const { setMessage, setClasses, setOpen } = toastSlice.actions;

export default toastSlice.reducer;
