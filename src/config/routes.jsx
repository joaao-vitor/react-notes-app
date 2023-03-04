import { createBrowserRouter } from 'react-router-dom';
import Note from '../components/Note/Note';
import App from '../App';
import AddNote from '../components/AddNote/AddNote';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'notes',
                children: [
                    {
                        path: 'new',
                        element: <AddNote />,
                    },
                ],
            },
        ],
    },
]);
