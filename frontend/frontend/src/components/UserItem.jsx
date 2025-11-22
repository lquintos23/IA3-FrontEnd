import React from 'react';

function UserItem(props) {
  return (
    <div className="user-item">
      <h3>{props.name}</h3>
      <p>Email: {props.email}</p>
      {props.image && (
        <img
          src={`http://localhost:5000/${props.image}`}
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

export default UserItem;
