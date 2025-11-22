import React from 'react';

function PlaceItem(props) {
  const handleDelete = async () => {
    if (!props.id) {
      alert('Place ID missing. Cannot delete.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/places/${props.id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {

        if (props.onDelete) {
          props.onDelete(props.id);
        }
        alert(data.message || 'Place deleted successfully!');
      } else {
        alert(data.message || 'Failed to delete place.');
      }
    } catch (error) {
      alert('Failed to delete place.');
    }
  };

  return (
    <div className="place-item">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>Address: {props.address}</p>
      <p>Creator: {props.creator}</p>
      {props.image && (
        <img
          src={`http://localhost:5000/${props.image}`}
          alt="Place"
          style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
        />
      )}
      <button onClick={handleDelete} style={{ marginTop: '1rem' }}>Delete</button>
    </div>
  );
}

export default PlaceItem;
