import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

// ----------- MODALS ----------- //

const ViewModal = ({ isOpen, onClose, note }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white dark:bg-[#1e1e28] text-gray-800 dark:text-white rounded-xl p-8 shadow-2xl max-w-lg w-full relative transition">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >&times;</button>
        <h2 className="text-2xl font-bold mb-4 break-words text-blue-700 border-b pb-2 dark:text-blue-400">{note.title || <span className="italic text-gray-400">[Untitled]</span>}</h2>
        <div className="text-lg text-gray-700 dark:text-gray-200 whitespace-pre-line break-words mb-4">{note.content}</div>
        <div className="text-xs text-gray-400 text-right">Created at: {note.created_at}</div>
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, note, onUpdate, updating }) => {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  // Update state when a new note is passed
  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
  }, [note]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-[#1e1e28] text-gray-800 dark:text-white rounded-xl p-8 shadow-2xl max-w-lg w-full relative transition">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >&times;</button>
        <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">Edit Note</h2>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2a2a32] dark:text-white"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
        <textarea
          className="w-full p-2 h-28 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none dark:bg-[#2a2a32] dark:text-white"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Enter note content"
        />
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            onClick={onClose}
            disabled={updating}
          >Cancel</button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
            onClick={() => onUpdate(title, content)}
            disabled={updating}
          >{updating ? 'Updating...' : 'Update'}</button>
        </div>
      </div>
    </div>
  );
};

// ----------- MAIN COMPONENT ----------- //

const SavedNotes = () => {
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewNote, setViewNote] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNote, setEditNote] = useState({});
  const [updating, setUpdating] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      alert("Error loading notes: " + error.message);
      setNotesList([]);
    } else {
      setNotesList(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleView = (note) => {
    setViewNote(note);
    setViewModalOpen(true);
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setEditModalOpen(true);
  };

  const handleUpdate = async (title, content) => {
    setUpdating(true);
    const { error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', editNote.id);
    setUpdating(false);
    if (error) {
      alert("Error updating note: " + error.message);
    } else {
      setEditModalOpen(false);
      fetchNotes();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setDeletingId(id);
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    setDeletingId(null);
    if (error) {
      alert("Error deleting note: " + error.message);
    } else {
      fetchNotes();
    }
  };

  return (
    <div className="section-wrapper py-10 px-4 flex justify-center items-start min-h-screen">
      <div className="w-full max-w-4xl saved-card bg-white  rounded-2xl shadow p-8 transition">
        {/* VIEW MODAL */}
        <ViewModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          note={viewNote}
        />

        {/* EDIT MODAL */}
        <EditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          note={editNote}
          onUpdate={handleUpdate}
          updating={updating}
        />

        <h3 className="text-2xl font-bold mb-4 light:text-black-800 dark:text-black-800 tracking-tight flex items-center gap-2">
          📚 Saved Notes
        </h3>

        {loading && <div className="my-4 text-blue-400">Loading...</div>}

        {!loading && notesList.length === 0 && (
          <div className="text-gray-400 italic my-6">No notes found.</div>
        )}

        {!loading && notesList.length > 0 && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {notesList.map(note => (
              <li
                key={note.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4"
              >
                <div className="flex-1">
                  <div className="font-semibold text-lg text-blue-900 dark:text-blue-900">
                    {note.title || <span className="italic text-gray-400">[Untitled]</span>}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{note.created_at}</div>
                </div>
                <div className="mt-2 sm:mt-0 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition font-semibold"
                    onClick={() => handleView(note)}
                  >View</button>
                  <button
                    className="bg-yellow-400 text-gray-900 px-4 py-1 rounded hover:bg-yellow-500 transition font-semibold"
                    onClick={() => handleEdit(note)}
                  >Edit</button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition font-semibold"
                    onClick={() => handleDelete(note.id)}
                    disabled={deletingId === note.id}
                  >
                    {deletingId === note.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedNotes;
