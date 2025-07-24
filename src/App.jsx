import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import Navbar from './Navbar/nav.jsx';
import Notes from './Notes/notes.jsx';
import SavedDocuments from './Saved/saved.jsx';
import NotesLibrary from './Library/library.jsx';
import Favourite from './Favourite/Fav.jsx';
import Home from './Home/home.jsx';


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
      { path: '/', element: <Home /> },             // Load Home first
      { path: '/notes', element: <Notes /> },       // Move Notes to /notes
      { path: '/saved', element: <SavedDocuments /> }, // Move Saved to /saved
      { path: '/library', element: <NotesLibrary /> }, // Move Library to /library
      { path: '/favourite', element: <Favourite /> }  // Move Favourite to /favourite
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

export default Layout;
