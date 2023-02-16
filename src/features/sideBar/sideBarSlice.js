import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShown: false,
    idSelected: 0,
    searchBar: '',
};

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        toggleSideBar: (state) => {
            state.isShown = !state.isShown;
        },
        selectItem: (state, action) => {
            state.idSelected = action.payload;
        },
        changeSideBar: (state, action) => {
            state.isShown = action.payload;
        },
        changeSearchBar: (state, action) => {
            state.searchBar = action.payload;
        },
    },
});

export const { toggleSideBar, selectItem, changeSideBar, changeSearchBar } =
    sideBarSlice.actions;

export default sideBarSlice.reducer;
