import React from 'react'
import { Link } from 'react-router-dom'

function Note({note, onDelete}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
  return (
    <div className='note-container'>
      <div>
        <p className='note-title'>{note.title}</p>
      </div>
      <hr />
      <p className='note-content'>{note.content}</p>
      <p className='note-date'>{formattedDate}</p>
      <div className='note-btns'>
        <button className="btn-delete" onClick={() => onDelete(note.id)}>Delete</button>
        <Link to={`/edit/${note.id}`} className='btn-edit'>Edit</Link>
      </div>
    </div>
  )
}

export default Note
