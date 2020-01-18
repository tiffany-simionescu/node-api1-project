import React, { useState, useEffect } from 'react';
import AddUser from './AddUser';
import UserCard from './UserCard';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const UserList = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  });

  return (
    <div>
      <h1>User List</h1>
      <AddUser />
      <div className="user-list">
      {users.length > 0 ? 
        (users.map(user => {
          return (
            <div>
              <UserCard {...user} key={user.id} />
            </div>
          )
        })) : (
          null
        )}
      </div>
    </div>
  )
}

export default UserList;