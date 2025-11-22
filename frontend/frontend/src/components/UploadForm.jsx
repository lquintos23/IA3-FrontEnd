import React, { useState } from 'react';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Upload successful');
      } else {
        setMessage(data.message || 'Upload failed. Please try again.');
      }
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default UploadForm;
