import React from 'react'

function Note({note, onDelete}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
  return (
    <div className='note-container'>
      <p className='note-title'>{note.title}</p>
      <hr />
      <p className='note-content'>{note.content}</p>
      <p className='note-date'>{formattedDate}</p>
      <button onClick={() => onDelete(note.id)} className='note-delete btn btn-outline-dark'>Delete Note</button>
    </div>
  )
}

export default Note
