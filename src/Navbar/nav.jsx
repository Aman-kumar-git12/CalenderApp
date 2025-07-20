import React from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import HamburgerMenu from "../Hamburger/hamburger";
import MaterialUISwitchOnly from "./ThemeToggle";


const Navbar = ({ dark, setDark }) => (
  <div className="navbar h-19 flex justify-between items-center">
    <div className="p-4 pt-8 w-20 nav-left flex items-center">
      <HamburgerMenu />
    </div>
    <div className="nav-right flex items-center gap-3">
      <FullscreenIcon className="nav-icon" />
      <MaterialUISwitchOnly checked={dark} onChange={setDark} />
    </div>
  </div>
);

export default Navbar;
