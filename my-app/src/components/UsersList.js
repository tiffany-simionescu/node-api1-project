import React, { useState, useEffect } from 'react';
import AddUser from './AddUser';
import UserCard from './UserCard';
import axios from 'axios';

const UserList = props => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  });

  const deleteUser = id => {
    axios.delete(`http://localhost:8000/api/users/${id}`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  };

  return (
    <div>
      <h1>User List</h1>
      <AddUser />
      {users.length > 0 ? 
        (users.map(user => {
          return (
            <div>
              <UserCard {...user} key={user.id} />
              <button onClick={() => deleteUser(user.id)} className="button">
                Delete User
              </button>
            </div>
          )
        })) : (
          null
        )}
    </div>
  )
}

export default UserList;