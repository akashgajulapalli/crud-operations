import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    this.getusers();
  }
  getusers = async () => {
    await axios.get("http://localhost:3005/users").then((response) => {
      console.log(response);
    });
  };
  render() {
    return <div></div>;
  }
}

export default Users;
