import React, { useRef, useState } from 'react';
import './notes.css';
import Save from '../Buttons/Save/save';
import Clear from '../Buttons/Clear/clear';
import ToggleButtonsMultiple from '../Textstyle/textstyle';
import HamburgerMenu from '../Hamburger/hamburger';

const Notes = () => {
  const [notes, setnotes] = useState("");
  const textareaRef = useRef(null);

  function ischange() {
    setnotes(textareaRef.current.value);
  }

  function clear() {
    setnotes("");
    textareaRef.current.value = "";
  }

  return (
    <div className="notes-container">
      <textarea
        ref={textareaRef}
        placeholder="Start typing your notes here..."
        className="notes-textarea"
        onChange={ischange}
        value={notes}
      />
      <div className="notes-controls">
        <Save />
        <Clear clear={clear} />
      </div>
    </div>
  );
};

export default Notes;
