import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = () => {
    api.get(`api/v1/notes/edit/${id}/`)
      .then((res) => {
        setNote(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = () => {
    api.patch(`api/v1/notes/edit/${id}/`, note)
      .then(() => {
        alert("Updated successfully");
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="create-container">
        <h2>Edit Note</h2>
        <label htmlFor="title">Title :</label><br />
        <input type="text" name="title" value={note.title} onChange={handleChange} className="create-input mt-1" />
        <label htmlFor="content">Content :</label><br />
        <textarea name="content" value={note.content} onChange={handleChange} className="create-input mt-1 create-textarea" />
        <button onClick={handleUpdate} className="create-btn">Update</button>
      </div>
    </div>
  );
}

export default Edit;