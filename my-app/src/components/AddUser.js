import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class AddUser extends React.Component {
  state = {
      id: Date.now(),
      name: '',
      bio: ''
  }

  addUser = () => {
    axiosWithAuth()
      .post('/api/users', this.state)
      .then(res => console.log(res))
      .catch(err => console.log('post error', err.response))
  }

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.addUser} className="form">
          <h2 className="new-user-title">Add a New User</h2>
          <input 
            className="add-input"
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChanges}
          />
          <input 
            className="add-input"
            type="text"
            name="bio"
            placeholder="Bio"
            value={this.state.bio}
            onChange={this.handleChanges}
          />
          <button className="button">Add User</button>
      </form>
    )
  }
}

export default AddUser;