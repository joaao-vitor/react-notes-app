import React, { useEffect, useState } from 'react';
import NotesMenu from './NotesMenu/NotesMenu';
import SearchBar from './SearchBar/SearchBar';
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import {
    toggleSideBar,
    changeSideBar,
} from '../../features/sideBar/sideBarSlice';
import { Link } from 'react-router-dom';

export default function SideBar() {
    const [isDesktop, setIsDesktop] = useState(false);
    const showMenu = useSelector((state) => state.sideBar.isShown);
    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 640) {
                setIsDesktop(true);
            } else setIsDesktop(false);
        });
        if (window.innerWidth > 640) {
            setIsDesktop(true);
            dispatch(changeSideBar(true));
        }
    }, []);
    return (
        <>
            <span
                className="text-zinc-400 text-2xl self-end mt-3 absolute top-2 right-3
                            sm:hidden"
                onClick={() => dispatch(toggleSideBar())}
            >
                {showMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
            </span>
            <aside
                className={classNames(
                    'p-5 bg-black lg:max-w-[20%] h-screen sm:max-w-[30%] w-screen flex flex-col',
                    {
                        hidden: !showMenu && !isDesktop,
                        absolute: !isDesktop,
                        'inset-0': !isDesktop,
                    }
                )}
            >
                <div className="mt-24 flex flex-col">
                    <Link to="/notes/new" className="self-end">
                        <button className="text-zinc-200 text-xs rounded-lg border-red-800 border-2 hover:bg-red-800 transition-all px-3 py-2 mb-4 flex gap-2 items-center">
                            <AiOutlinePlus /> new note
                        </button>
                    </Link>
                    <SearchBar />
                </div>
                <NotesMenu
                    hideMenu={() =>
                        isDesktop ? null : dispatch(changeSideBar(false))
                    }
                />
            </aside>
        </>
    );
}
