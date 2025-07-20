import React, { useContext } from 'react';
import NotesContext from '../../notesContext';

const Save = () => {
  const { addNote } = useContext(NotesContext);

  const handleSave = () => {
    
    const now = new Date();
    const note = {
      title: `Document`,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };
    addNote(note);
  };

  return (
    <button 
      onClick={handleSave} 
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Save
    </button>
  );
};

export default Save;
