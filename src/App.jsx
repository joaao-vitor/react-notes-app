import './App.css';
import SideBar from './components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div
            className="app w-full h-screen flex bg-zinc-900
					font-inter"
        >
            <SideBar />
            <main className="content w-full flex item-center">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
