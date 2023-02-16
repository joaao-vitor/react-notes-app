import React, { useEffect, useState } from 'react';
import NotesMenu from './NotesMenu/NotesMenu';
import SearchBar from './SearchBar/SearchBar';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import {
    toggleSideBar,
    changeSideBar,
} from '../../features/sideBar/sideBarSlice';

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
                    'p-5 bg-black lg:w-1/5 h-screen sm:w-1/3 w-screen flex flex-col',
                    {
                        hidden: !showMenu && !isDesktop,
                        absolute: !isDesktop,
                        'inset-0': !isDesktop,
                    }
                )}
            >
                <SearchBar />
                <NotesMenu
                    hideMenu={() =>
                        isDesktop ? null : dispatch(changeSideBar(false))
                    }
                />
            </aside>
        </>
    );
}
