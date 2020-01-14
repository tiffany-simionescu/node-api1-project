import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = props => {

  const [user, setUser] = useState({
    name: props.name,
    bio: props.bio
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${props.id}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  })

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const handleEdit = (e, userID, user) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/users/${userID}`, user)
      .then(res => {
        axios.get(`http://localhost:8000/api/users/${userID}`)
          .then(res => console.log(res.data))
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
    setEditMode(false);
    axios.get(`http://localhost:8000/api/users/${userID}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  };

  const triggerEditConfirmation = (e, userID, user) => {
    e.preventDefault();
    setEditMode(true);
    setUser({
      ...user,
      name: props.name,
      bio: props.bio
    })
  }

  return (
    <div className="card">
      {editMode ? ( 
        <>
        <h3>Name:</h3>
        <input 
          type="text"
          value={user.name}
          name="name"
          onChange={handleChange}
        />
        </>
        ) : (
          <h3>Name: {user.name}</h3>
        )
      }
      {editMode ? ( 
        <>
        <h3>Bio:</h3>
        <input 
          type="text"
          value={user.bio}
          name="bio"
          onChange={handleChange}
        />
        </>
        ) : (
          <h3>Bio: {user.bio}</h3>
        )
      }
            {editMode ? (
              <div>
                <button onClick={handleEdit} className="button">
                  Commit Changes
                </button>
              </div>
            ) : (
              <div>
                <button onClick={triggerEditConfirmation} className="button">
                  Edit User
                </button>
              </div>
            )}


    </div>
  )
}

export default UserCard;