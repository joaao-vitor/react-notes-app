import { createBrowserRouter } from 'react-router-dom';
import Note from '../components/Note/Note';
import App from '../App';
import { useDispatch } from 'react-redux';
import { fetchNoteById } from '../features/data/dataSlice';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'notes/:noteid',
                element: <Note />,
            },
        ],
    },
]);
