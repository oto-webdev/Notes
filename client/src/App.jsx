import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/notes")

    setNotes(res.data.notes)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div>
      <div className='app'>
      <h2>Notes:</h2>
      {notes && notes.map(note => {
        return <div key={note._id}>
          <h3>{note.title}</h3>
        </div>
      })}
    </div>

    <form>
      
    </form>
    </div>
  )
}

export default App;