import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    body: "",
    _id: "",
  });

  // Get Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notes");
      setNotes(res.data.note);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Post Notes
  const createNote = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:3000/api/notes", {
        title: createForm.title,
        body: createForm.body,
      });

      setNotes((prevNotes) => [...prevNotes, res.data.note]);
      setCreateForm({ title: "", body: "" });
    } catch (error) {
      console.error("Error creating note:", error.message);
    }
  };

  // Delete Notes
  const deleteNote = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${_id}`);
      setNotes(notes.filter((note) => note._id !== _id));
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Update Notes
  const updateNote = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.put(
        `http://localhost:3000/api/notes/${editForm._id}`,
        {
          title: editForm.title,
          body: editForm.body,
        }
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === editForm._id ? { ...note, ...res.data.note } : note
        )
      );
      setEditForm({ title: "", body: "", _id: "" });
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const editNote = (note) => {
    setEditForm({
      title: note.title,
      body: note.body,
      _id: note._id,
    });
  };

  return (
    <>
      <div>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.body}</p>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
              <button onClick={() => editNote(note)}>Edit</button>
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>

      <div>
        <h2>Create Notes</h2>
        <form onSubmit={createNote}>
          <input
            type="text"
            name="title"
            value={createForm.title}
            onChange={(e) =>
              setCreateForm((prevForm) => ({
                ...prevForm,
                title: e.target.value,
              }))
            }
          />
          <textarea
            name="body"
            value={createForm.body}
            onChange={(e) =>
              setCreateForm((prevForm) => ({
                ...prevForm,
                body: e.target.value,
              }))
            }
          />
          <button type="submit">Create</button>
        </form>
      </div>

      <div>
        <h2>Update Notes</h2>
        {editForm._id ? (
          <form onSubmit={updateNote}>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={(e) =>
                setEditForm((prevForm) => ({
                  ...prevForm,
                  title: e.target.value,
                }))
              }
            />
            <textarea
              name="body"
              value={editForm.body}
              onChange={(e) =>
                setEditForm((prevForm) => ({
                  ...prevForm,
                  body: e.target.value,
                }))
              }
            />
            <button type="submit">Update</button>
          </form>
        ) : (
          <p>Select a note to edit.</p>
        )}
      </div>
    </>
  );
};

export default App;
