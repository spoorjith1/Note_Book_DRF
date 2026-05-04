import React from 'react'
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const createNote = (e) => {
    e.preventDefault()
    api.post('api/v1/notes/', {content, title}).then((res) => {
      if (res.status === 201) alert("Note Created")
      else { alert("Failed to Create Note") }
      navigate('/')
    }).catch((error) => alert(error))
  };

  return (
    <div>
      <div className="create-container">
        <form onSubmit={createNote} className="create-form">
            <h2 className="create-heading">create Note</h2>
            <label htmlFor="title">Title :</label><br />
            <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} className="create-input mt-1" />
            <br />
            <label htmlFor="content">Content :</label><br />
            <textarea type="text" id="content" name="content" required onChange={(e) => setContent(e.target.value)} value={content}  className="create-input mt-1 create-textarea"></textarea>
            <br />
            <button type="submit" className="create-btn">Create Note</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePage
