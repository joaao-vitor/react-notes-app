import { configureStore } from '@reduxjs/toolkit';
import sideBarReducer from '../features/sideBar/sideBarSlice';
import dataReducer from '../features/data/dataSlice';
import searchedNoteSlice from '../features/searchedNote/searchedNoteSlice';

export const store = configureStore({
    reducer: {
        sideBar: sideBarReducer,
        data: dataReducer,
        searchedNote: searchedNoteSlice,
    },
});
