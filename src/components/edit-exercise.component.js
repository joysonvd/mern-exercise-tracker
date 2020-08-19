import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangedDuration = this.onChangedDuration.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users:[]
        }
    }

    onChangeUsername (e) {
        this.setState ({
            username: e.target.value
        })
    }

    onChangeDescription (e) {
        this.setState({
            description: e.target.value
        }) 
    }

    onChangedDuration (e) {
        this.setState ({
            duration: e.target.value
        }) 
    }

    onChangeDate (date) {
        this.setState ({
            date
        }) 
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const {username, description, duration, date} = this.state;
        const exercise = {
            username, description, duration, date
        }
        console.log(exercise)
        try {
            const response = await axios.post("http://localhost:5000/exercises/update/"+this.props.match.params.id, exercise)
            console.log(response)
        } catch(e) {
            console.log(e)
        }

        console.log(exercise);
        window.location = "/";
    }

    async componentDidMount() {
        try {
            const response = await axios.get("http://localhost:5000/exercises/"+this.props.match.params.id)
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        } catch(e) {
            console.log(e)
        }

        try {
            const response = await axios.get("http://localhost:5000/users")
            if (response.data.length > 0)
            this.setState({
                users: response.data.map(user => user.username)
            })
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select  
                        required 
                        className="form-control" 
                        value={this.state.username} 
                        onChange={this.onChangeUsername} >
                        {
                            this.state.users.map((user) => {
                                return <option key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" 
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration in minutes: </label>
                        <input type="text" 
                        required
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangedDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className="form-group"> 
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}