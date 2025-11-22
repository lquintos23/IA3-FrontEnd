import React, { useState } from 'react';
import ImageUpload from '../shared/components/FormElements/ImageUpload';

function SignupForm({ onCreated }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
    imageValid: false,
  });
  const [message, setMessage] = useState('');

  const imageInputHandler = (file, isValid) => {
    setFormState((prevState) => ({
      ...prevState,
      image: file,
      imageValid: isValid,
    }));
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('password', formState.password);
    if (formState.image) {
      formData.append('image', formState.image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        body: formData, 
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Signup successful!');

        if (onCreated && data.user) {
          onCreated(data.user);
        }
      } else {
        setMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Signup</h2>
      <label>
        Name:
        <input name="name" type="text" value={formState.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input name="email" type="email" value={formState.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Password:
        <input name="password" type="password" value={formState.password} onChange={handleChange} required />
      </label>
      <br />
      <ImageUpload id="image" center onInput={imageInputHandler} />
      <button type="submit" disabled={!formState.imageValid}>Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default SignupForm;
