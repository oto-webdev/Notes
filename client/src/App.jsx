import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: '',
    body: '',
  });

  // Fetch notes from the API
  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/notes');
      setNotes(res.data?.notes || []); // Handle undefined or null response
    } catch (err) {
      console.error('Error fetching notes:', err.message);
      alert('Failed to fetch notes. Please try again later.');
    }
  };

  // Update form field state
  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  // Create a new note
  const createNote = async (e) => {
    e.preventDefault();
    if (!createForm.title.trim() || !createForm.body.trim()) {
      alert('Title and body are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/notes', createForm);
      setNotes([...notes, res.data.note]);
      setCreateForm({ title: '', body: '' });
    } catch (err) {
      console.error('Error creating note:', err.message);
      alert('Failed to create note. Please try again.');
    }
  };

  // Delete a note
  const deleteNote = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await axios.delete(`http://localhost:4000/api/notes/${_id}`);
      setNotes(notes.filter((note) => note._id !== _id));
    } catch (err) {
      console.error('Error deleting note:', err.message);
      alert('Failed to delete note. Please try again.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app">
      <h2>Notes:</h2>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button onClick={() => deleteNote(note._id)}>Delete Note</button>
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}

      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <input
          onChange={updateCreateFormField}
          value={createForm.title}
          type="text"
          name="title"
          placeholder="Enter title"
        />
        <textarea
          onChange={updateCreateFormField}
          value={createForm.body}
          name="body"
          placeholder="Enter body"
        />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default App;
