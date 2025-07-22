import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import Navbar from './Navbar/nav';
import Notes from './Notes/notes';
import SavedDocuments from './Saved/saved';
import NotesLibrary from './Library/library';
import Favourite from './Favourite/Favourite';



const Layout = () => {
  const [dark, setDark] = React.useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  React.useEffect(() => {
    document.body.className = dark ? 'dark' : 'light';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <>
      <Navbar dark={dark} setDark={setDark}/>
      <Outlet />

     
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Notes /> },
      { path: '/saved', element: <SavedDocuments /> },
      { path: '/library', element: <NotesLibrary /> },
      { path: '/favourite',element:<Favourite/> }

    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

export default Layout;
