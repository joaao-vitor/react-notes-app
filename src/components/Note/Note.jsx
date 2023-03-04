import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import classNames from 'classnames';

import { fetchNoteById, fetchNotes } from '../../features/data/dataSlice';
import { updateNote } from '../../features/searchedNote/searchedNoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ReactQuill from 'react-quill';
import EmojiPicker from 'emoji-picker-react';
import 'react-quill/dist/quill.snow.css';
import './Note.css';

export default function Note() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');

    const [emojiPicker, setEmojiPicker] = useState(false);
    const [editorVisible, setEditorVisible] = useState(false);

    const dispatch = useDispatch();
    const note = useSelector((state) => state.searchedNote);
    const { id } = useParams();

    const handleClick = async () => {
        if (editorVisible) {
            const date = new Date().toUTCString();
            await dispatch(
                updateNote({ ...note.note, content, title, icon, date })
            );
            dispatch(fetchNotes());
        }
        setEditorVisible((prevState) => !prevState);
    };

    const toggleEmojiPicker = () => {
        if (editorVisible) setEmojiPicker((prev) => !prev);
    };

    const changeIcon = (e) => {
        if (emojiPicker) setIcon(e.emoji ?? note.note.icon);
    };

    const editTitle = (e) => {
        if (editorVisible) setTitle(e.target.value);
    };

    useEffect(() => {
        dispatch(fetchNoteById(id));
    }, [id]);

    useEffect(() => {
        setContent(note.note.content);
        setIcon(note.note.icon);
        setTitle(note.note.title);
    }, [note.loading]);

    return (
        !note.loading && (
            <article className="py-4 px-8 lg:py-8 lg:px-24 m-auto w-11/12 bg-neutral-800 opacity-80 rounded-xl text-zinc-200 font-poppins h-[90%] flex flex-col overflow-auto">
                <div className="text-2xl mb-3 w-full flex gap-5 justify-between">
                    <div className="flex gap-5 items-center w-4/5">
                        <span
                            className={classNames('text-xl', {
                                'text-orange-500': !note.note.icon,
                                'cursor-pointer': editorVisible,
                                ' hover:scale-125 transition-all':
                                    editorVisible,
                            })}
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
                            className={classNames(
                                'bg-transparent outline-none w-full font-semibold',
                                {
                                    'hover:text-3xl hover:text-white transition-all cursor-pointer':
                                        editorVisible,
                                }
                            )}
                            readOnly={!editorVisible}
                            onChange={editTitle}
                        />
                    </div>
                    <button
                        className={classNames(
                            'border-2 text-sm px-6 py-1 justify-self-end rounded-md border-orange-500 hover:bg-orange-500 hover:text-zinc-200 transition-all',
                            {
                                'border-green-600': editorVisible,
                                'hover:bg-green-600': editorVisible,
                            }
                        )}
                        onClick={handleClick}
                    >
                        {editorVisible ? 'save' : 'edit'}
                    </button>
                </div>
                <hr className="h-[0.5px] w-11/12 rounded-full self-center bg-gray-500 border-0  mb-5" />
                <div className="leading-7 font-light text-sm">
                    {!editorVisible ? (
                        <div className="note">
                            {parse(note.note.content ?? '')}
                        </div>
                    ) : (
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            className="text-zinc-200 border-0 rounded-lg"
                        />
                    )}
                </div>
            </article>
        )
    );
}
