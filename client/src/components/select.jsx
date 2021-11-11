import React, { Component } from "react";
import axios from "axios";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: 1,
      selctedUser: {
        id: "",
        name: "",
        place: "",
        role: "",
      },
    };
  }
  componentDidMount() {
    this.getusers();
    this.display();
  }
  getusers = async () => {
    await axios.get("http://localhost:3005/users").then((response) => {
      this.setState({
        users: response.data,
      });
    });
  };
  selectUser = (e) => {
    if (e.target.name === "newName") {
      this.setState({
        name: e.target.value,
      });
    }
  };
  display = () => {
    const url = "http://localhost:3005/users/" + this.state.name;
    axios.get(url).then((response) => {
      this.setState({
        selectedUser: response.data,
      });
    });
  };

  render() {
    const { users, selectedUser} = this.state;
    return (
      <div>
        <label>Select player: </label>
        <select name="newName" onChange={this.selectUser}>
          {users.length > 0
            ? users.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })
            : null}
        </select>
        <button
          type="button"
          className="btn btn-info btn-lg"
          data-toggle="modal"
          data-target="#myModal"
          onClick={this.display}
        >
          Show
        </button>
        <br />

        <div className="container">
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                  <h4 className="modal-title">Player Details</h4>
                </div>
                <div className="modal-body">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Place</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{selectedUser?.name}</td>
                        <td>{selectedUser?.place}</td>
                        <td>{selectedUser?.role}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Select;
