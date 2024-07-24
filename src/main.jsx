import React from 'react';
import ReactDOM from 'react-dom/client';
import { mainRoutes } from './routes/mainRoutes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(mainRoutes);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </React.StrictMode>
);
