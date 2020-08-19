import React, { Component } from "react";
import {Link } from "react-router-dom"
import axios from 'axios';

const Exercise = props => {
    return <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <button onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</button>
        </td>
    </tr>
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props)
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {
            exercises: []
        }
    }


    async componentDidMount () {
        try {
            const response = await axios.get("http://localhost:5000/exercises/")
            this.setState({
                exercises: response.data
            })
        } catch(e) {
            console.log(e)
        }
    }

    deleteExercise = async (id) => {
        try {
            const response = await axios.delete("http://localhost:5000/exercises/"+id)
            console.log(response.data)
            this.setState({
                exercises: this.state.exercises.filter(el => el._id !== id)
            })
        } catch(e) {
            console.log(e)
        }
    }

    exerciseList() {
        return this.state.exercises.map(exe => {
            return <Exercise exercise={exe} deleteExercise={this.deleteExercise} key={exe._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}