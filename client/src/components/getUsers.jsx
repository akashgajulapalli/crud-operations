import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      tempid: "",
      name: "",
      place: "",
      role: "",
    };
  }
  componentDidMount() {
    this.getusers();
  }
  getusers = async () => {
    await axios.get("http://localhost:3005/users").then((response) => {
      this.setState({
        users: response.data,
      });
    });
  };
  deleteObject = (value) => {
    const url = "http://localhost:3005/users/" + value.id;
    axios.delete(url).then((response) => {
      if (response.status === 200) {
        this.getusers();
      }
    });
  };

  updateObject = (value) => {
    this.setState({
      name: value.name,
      place: value.place,
      role: value.role,
      tempid: value.id,
    });
  };

  update = () => {
    const object = {
      id: this.state.tempid,
      name: this.state.name,
      place: this.state.place,
      role: this.state.role,
    };
    const url = "http://localhost:3005/users/" + this.state.tempid;
    axios.put(url, object).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.getusers();
      }
    });
  };

  addChange = (e) => {
    if (e.target.name === "newName") {
      this.setState({
        name: e.target.value,
      });
    } else if (e.target.name === "newPlace") {
      this.setState({
        place: e.target.value,
      });
    } else if (e.target.name === "newRole") {
      this.setState({
        role: e.target.value,
      });
    }
  };
  addElement = () => {
    const newObject = {
      id: this.state.users.length + 1,
      name: this.state.name,
      place: this.state.place,
      role: this.state.role,
    };
    axios.post("http://localhost:3005/users", newObject).then((response) => {
      if (response.status === 201) {
        this.getusers();
      }
    });
  };

  get = (obj) => {
    const url = "http://localhost:3005/users/" + obj.id;
    axios.get(url).then((response) => {
      console.log(response.data);
    });
  };

  render() {
    const { users, name, place, role } = this.state;
    return (
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="newName"
          defaultValue={name}
          onChange={this.addChange}
        />        
        <label>Place:</label>
        <input
          type="text"
          name="newPlace"
          defaultValue={place}
          onChange={this.addChange}
        />
        <label>Role:</label>
        <input
          type="text"
          name="newRole"
          defaultValue={role}
          onChange={this.addChange}
        />
        <button onClick={this.addElement}>Add</button>
        <button onClick={this.update}>Update</button>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Place</th>
              <th>Role</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0
              ? users.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.place}</td>
                      <td>{item.role}</td>
                      <td>
                        <button className="but1" onClick={() => this.deleteObject(item)}>
                          Delete
                        </button>
                      </td>
                      <td>
                        <button onClick={() => this.updateObject(item)}>
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => this.get(item)}>Get</button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
