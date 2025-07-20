import React, { createContext, useState, useEffect } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [savedNotes, setSavedNotes] = useState(() => {
    const data = localStorage.getItem("savedNotes");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedNotes", JSON.stringify(savedNotes));
  }, [savedNotes]);

  const addNote = (note) => {
    setSavedNotes((prev) => [...prev, note]);
  };

  return (
    <NotesContext.Provider value={{ savedNotes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;