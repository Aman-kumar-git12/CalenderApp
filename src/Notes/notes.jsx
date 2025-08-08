import React, { useRef, useState } from 'react';
// Import your Supabase client
import { supabase } from '../supabaseClient'; // adjust path as needed
import Clear from '../Buttons/clear';   // still using your Clear button

const Notes = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleChange = () => setNotes(textareaRef.current.value);

  const handleClear = () => {
    setNotes("");
    setTitle("");
    textareaRef.current.value = "";
  };

  // All save logic is here:
  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = notes.trim();

    if (!trimmedContent && !trimmedTitle) {
      alert("Enter a title or a note to save.");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from('notes')
      .insert([
        {
          title: trimmedTitle || null,
          content: trimmedContent
          // id and created_at are automatic
        }
      ]);
    setSaving(false);

    if (error) {
      alert("Error saving note: " + error.message);
      return;
    }

    alert("Note saved!");
    handleClear();
  };

  return (
    <div className="notes-wrapper min-h-screen py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📝 Your Notes</h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title..."
          className="w-full mb-3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-lg"
        />
        <textarea
          ref={textareaRef}
          placeholder="Start typing your notes here..."
          className="w-full h-100 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700 text-base"
          onChange={handleChange}
          value={notes}
        />
        <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none font-semibold transition"
            onClick={handleSave}
            disabled={saving}
            type="button"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <Clear clear={handleClear} />
        </div>
      </div>
    </div>
  );
};

export default Notes;
