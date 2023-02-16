import React, { useEffect, useState } from 'react';
import NoteItem from './NoteItem';

import { useDispatch, useSelector } from 'react-redux';
import { selectItem } from '../../../features/sideBar/sideBarSlice';
import { fetchNotes } from '../../../features/data/dataSlice';

export default function NotesMenu(props) {
    const notes = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const idSelected = useSelector((state) => state.sideBar.idSelected);
    const searchBar = useSelector((state) => state.sideBar.searchBar);

    useEffect(() => {
        dispatch(fetchNotes());
    }, []);

    function handleClick() {
        props.hideMenu();
    }
    return (
        !notes.loading &&
        notes.notes?.length && (
            <div className="mt-5 text-zinc-300 w-full overflow-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-700 scrollbar-track-rounded-lg">
                <p className="text-[12pt] font-semibold">latest notes</p>
                <ul>
                    {notes.notes
                        .filter((note) => note.title.includes(searchBar))
                        .map((item) => (
                            <NoteItem
                                key={item.id}
                                id={item.id}
                                icon={item.icon}
                                name={item.title}
                                active={item.id === idSelected}
                                date={item.date}
                                onMouseEnter={() =>
                                    dispatch(selectItem(item.id))
                                }
                                onMouseOut={() => dispatch(selectItem(0))}
                                onClick={handleClick}
                            />
                        ))}
                </ul>
            </div>
        )
    );
}
