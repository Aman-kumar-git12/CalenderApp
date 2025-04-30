import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./hamburger.css";

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
        <a href="#"><NoteAddIcon /> New Notes</a>
        <a href="#"><SaveIcon /> Saved</a>
        <a href="#"><SettingsIcon /> Settings</a>
        <a href="#"><LogoutIcon /> Logout</a>
      </div>

      {open && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default SidebarMenu;
