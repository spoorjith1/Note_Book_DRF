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
        navigate("/");   // redirect to home
      })
      .catch((err) => alert(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Note</h2>

      <input
        type="text"
        name="title"
        value={note.title}
        onChange={handleChange}
      />

      <textarea
        name="content"
        value={note.content}
        onChange={handleChange}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Edit;