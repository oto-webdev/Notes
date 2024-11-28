import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/notes");
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/notes", createForm);
      setNotes([...notes, response.data.note]); // Assuming the response includes the created note
      setCreateForm({ title: "", body: "" }); // Reset form after creation
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div>
      {notes && notes.map((note) => (
        <div key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </div>
      ))}

      <h2>Create Note</h2>

      <form method="post" onSubmit={createNote}>
        <input
          name="title"
          type="text"
          value={createForm.title}
          onChange={(e) => setCreateForm({ ...createForm, [e.target.name]: e.target.value })}
        />
        <textarea
          name="body"
          value={createForm.body}
          onChange={(e) => setCreateForm({ ...createForm, [e.target.name]: e.target.value })}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default App;
