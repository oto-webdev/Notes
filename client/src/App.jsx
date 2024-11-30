import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
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
    try {
      const res = await axios.post("http://localhost:3000/api/notes", {
        title: createForm.title,
        body: createForm.body,
      });

      setNotes((prevNotes) => [...prevNotes, res.data.note]);

      setCreateForm({
        title: "",
        body: "",
      });
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

  return (
    <>
      <div>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.body}</p>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
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
    </>
  );
};

export default App;
