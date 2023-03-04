import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { fetchNoteById, fetchNotes } from '../../features/data/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

import ReactQuill from 'react-quill';
import EmojiPicker from 'emoji-picker-react';
import 'react-quill/dist/quill.snow.css';
import { addNote } from '../../features/searchedNote/searchedNoteSlice';

export default function AddNote() {
    const navigate = useNavigate();

    const [emojiPicker, setEmojiPicker] = useState(false);

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState();

    const note = useSelector((state) => state.searchedNote);

    const dispatch = useDispatch();

    const handleClick = async () => {
        const date = new Date().toUTCString();
        let res = await dispatch(addNote({ content, title, icon, date }));
        navigate(`/notes/${res.payload.id}`);
        dispatch(fetchNotes());
    };

    const toggleEmojiPicker = () => {
        setEmojiPicker((prev) => !prev);
    };

    const changeIcon = (e) => {
        if (emojiPicker) setIcon(e.emoji ?? note.note.icon);
    };

    const editTitle = (e) => {
        setTitle(e.target.value);
    };

    return (
        !note.loading && (
            <article className="py-4 px-8 lg:py-8 lg:px-24 m-auto w-11/12 bg-neutral-800 opacity-80 rounded-xl text-zinc-200 font-poppins h-[90%] flex flex-col overflow-auto">
                <div className="text-2xl mb-3 w-full flex justify-between">
                    <div className="flex gap-5 items-center w-4/5">
                        <span
                            className="text-xl text-orange-500 cursor-pointer hover:scale-125 transition-all"
                            onClick={toggleEmojiPicker}
                        >
                            {icon ?? '#'}
                            <div className="absolute mt-2 z-10">
                                {emojiPicker ? (
                                    <EmojiPicker onEmojiClick={changeIcon} />
                                ) : (
                                    ''
                                )}
                            </div>
                        </span>
                        <input
                            type="text"
                            value={title}
                            className="bg-transparent outline-none w-full font-semibold hover:text-3xl hover:text-white transition-all cursor-pointer"
                            onChange={editTitle}
                        />
                    </div>
                    <button
                        className="border-green-600 hover:bg-green-600 border-2 text-sm px-6 py-1 justify-self-end rounded-md hover:text-zinc-200 transition-all"
                        onClick={handleClick}
                    >
                        save
                    </button>
                </div>
                <hr className="h-[0.5px] w-11/12 rounded-full self-center bg-gray-500 border-0  mb-5" />
                <div className="leading-7 font-light text-sm">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="text-zinc-200 border-0 rounded-lg"
                    />
                </div>
            </article>
        )
    );
}
