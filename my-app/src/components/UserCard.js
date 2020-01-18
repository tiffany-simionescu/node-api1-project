import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = props => {

  const [user, setUser] = useState({
    name: props.name,
    bio: props.bio
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get(`https://node-api1-project-tiffany.herokuapp.com/api/users/${props.id}`)
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
    axios.put(`https://node-api1-project-tiffany.herokuapp.com/api/users/${userID}`, user)
      .then(res => {
        axios.get(`https://node-api1-project-tiffany.herokuapp.com/api/users/${userID}`)
          .then(res => console.log(res.data))
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
    setEditMode(false);
    axios.get(`https://node-api1-project-tiffany.herokuapp.com/api/users/${userID}`)
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

  const deleteUser = id => {
    axios.delete(`https://node-api1-project-tiffany.herokuapp.com/api/users/${id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  };

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
          <h3>Name: 
            <br />
            <span className="font">{user.name}</span>
          </h3>
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
          <h3>Bio: 
            <br />
            <span className="font">{user.bio}</span>
          </h3>
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
                <button onClick={() => deleteUser(user.id)} className="button">
                Delete User
              </button>
              </div>
            )}


    </div>
  )
}

export default UserCard;