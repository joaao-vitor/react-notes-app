import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchBar } from '../../../features/sideBar/sideBarSlice';

export default function SearchBar() {
    const searchBar = useSelector((state) => state.sideBar.searchBar);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(changeSearchBar(e.target.value));
    };

    return (
        <div className="w-full">
            <input
                className="text-zinc-400 px-3 py-2 rounded-2xl text-sm w-full bg-transparent
                            border-neutral-700 border-2 placeholder-neutral-600
                            focus:border-zinc-400 focus:placeholder-zinc-400 focus:outline-none
                            transition-all duration-150"
                type="text"
                placeholder="search note..."
                value={searchBar}
                onChange={handleChange}
            />
        </div>
    );
}
