import React, { Component } from "react";
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            username: ''
        }
    }

    onChangeUsername (e) {
        this.setState ({
            username: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const {username} = this.state;
        const user = {
            username
        }

        // console.log(user);
        try {
            const response = await axios.post("http://localhost:5000/users/add", user)
            console.log(response)
        } catch(e) {
            console.log(e)
        }
        

        this.setState({
            username: ''
        })
        window.location = "/user";
    }

    render() {
        return (
            <div>
                <h3>Create new User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name: </label>
                        <input type="text" 
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group"> 
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}