import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:4000/api/notes") 

    setNotes(response.data.notes)
  }

  return (
    <div className=''>
      {notes && notes.map((note) => {
        return <div key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </div>
      })}
    </div>
  )
}

export default App;