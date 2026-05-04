import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import Title from '../components/Title'

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, [])

  const getNotes = () => {
    api.get("api/v1/notes/").then((res) => res.data).then((data) => { setNotes(data) }).catch((err) => alert(err));
  };

  const deleteNote = (id) => {
      api.delete(`api/v1/notes/edit/${id}/`).then((res) => {
        if (res.status === 204) { alert("Notes Deleted") }
        else { alert("Failed to Delete Note") }
        getNotes()
      }).catch((error) => alert(error))
    };

  return (
    <>
    <div className="home-nav">
      <Title />
      <Link to='/logout'>Logout</Link>
    </div>
    <div className="create-circle-box">
      <div className="create-circle">
        <Link to='/create' className="circle-plus"><FaPlus /></Link>
      </div>
      <div>
        <p className="create-circle-text">Create New Note</p>
      </div>
    </div>
    <h2 className="note-heading">Notes</h2>
    <div className="notes">
      {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id} />)}
    </div>
    </>
  )
}

export default Home;