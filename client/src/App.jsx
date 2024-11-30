import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);

  //Get Notes
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

  return (
    <div>
      {notes.length > 0 ? (
        notes.map((note) => <div key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
      </div>)
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default App;
