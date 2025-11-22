import React, { useState } from 'react';
import ImageUpload from '../shared/components/FormElements/ImageUpload';

function NewPlace({ onCreated }) {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    address: '',
    creator: '',
    image: null,
    imageValid: false
  });
  const [message, setMessage] = useState('');

  const imageInputHandler = (file, isValid) => {
    setFormState((prev) => ({
      ...prev,
      image: file,
      imageValid: isValid
    }));
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', formState.title);
    formData.append('description', formState.description);
    formData.append('address', formState.address);
    formData.append('creator', formState.creator);
    if (formState.image) {
      formData.append('image', formState.image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/places', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Place added successfully!');

        if (onCreated && data.place) {
          onCreated(data.place);
        }
      } else {
        setMessage(data.message || 'Failed to add place.');
      }
    } catch (error) {
      setMessage('Failed to add place.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Add New Place</h2>
      <label>
        Title:
        <input name="title" type="text" value={formState.title} onChange={handleChange} required />
      </label><br />
      <label>
        Description:
        <input name="description" type="text" value={formState.description} onChange={handleChange} required />
      </label><br />
      <label>
        Address:
        <input name="address" type="text" value={formState.address} onChange={handleChange} required />
      </label><br />
      <label>
        Creator:
        <input name="creator" type="text" value={formState.creator} onChange={handleChange} required />
      </label><br />
      <ImageUpload id="image" center onInput={imageInputHandler} />
      <button type="submit" disabled={!formState.imageValid}>Add Place</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default NewPlace;
