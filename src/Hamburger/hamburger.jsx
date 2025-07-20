import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from "@mui/icons-material/Logout";
import "./hamburger.css";
import { Link } from "react-router-dom";

const SidebarMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="top-bar1">
        <MenuIcon className="menu-icon" onClick={toggleSidebar} />
      </div>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="top-bar2">
          <MenuIcon className="menu-icon" onClick={toggleSidebar} />
        </div>

        <Link to="/"><NoteAddIcon /> New Notes</Link>
        <Link to="/saved"><SaveIcon /> Saved</Link>
        <Link to="/library"><LibraryBooksIcon /> Library</Link>
        <Link to="logout"><LogoutIcon /> Logout</Link>
      </div>

      {open && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default SidebarMenu;
