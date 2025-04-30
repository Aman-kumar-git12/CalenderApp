import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import TitleIcon from "@mui/icons-material/Title";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import "./nav.css";
import HamburgerMenu from "../Hamburger/hamburger";
import Clear from "../Buttons/Clear/clear";
import Save from "../Buttons/Save/save";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <HamburgerMenu />
        {/* <FormatBoldIcon className="nav-icon" />
        <FormatItalicIcon className="nav-icon" />
        <FormatUnderlinedIcon className="nav-icon" />
        <TitleIcon className="nav-icon" /> */}
      </div>

      <div className="nav-right">
        <FullscreenIcon className="nav-icon" />
      </div>
    </div>
  );
};

export default Navbar;
