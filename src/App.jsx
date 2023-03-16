import './App.css';
import SideBar from './components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from './features/toast/toastSlice';

import * as Toast from '@radix-ui/react-toast';

function App() {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.toast);

    return (
        <div
            className="app w-full h-screen flex bg-zinc-900
					font-inter"
        >
            <Toast.Provider swipeDirection="right">
                <Toast.Root
                    className={`fixed top-5 text-xs right-5 p-3 rounded-lg font-poppins text-zinc-50 z-20 transition-all data-[state=open]:animate-slide-in data-[state=closed]:animate-hide ${toast.classes}`}
                    open={toast.open}
                    onOpenChange={(value) => dispatch(setOpen(value))}
                >
                    <Toast.Title>{toast.message}</Toast.Title>
                </Toast.Root>
                <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>
            <SideBar />
            <main className="content w-full flex item-center">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
