import React, { Component } from 'react'
import axios from 'axios'
import {getJWT} from '../helpers/jwt'

export default class Home extends Component {
    state = {
        quizs: []
    }
    componentDidMount() {
        axios.get('http://localhost:4000/getUser',{
            headers: {
                Authorization: `Bearer ${getJWT()}`
            }
        }).then(res => {
                console.log(res.data)
            })
        axios.get('http://localhost:4000/getQuizes',{
            headers: {
                Authorization: `Bearer ${getJWT()}`
            }
        }).then(res => {
                this.setState({
                    quizs: res.data
                })
                console.log(res.data)
            })
    }
    
    render() {
        return (
            <ul>
                {this.state.quizs.map(quiz => (
                    <div key={quiz.id} className="courses-container">
                        <div className="course">
                            <div className="course-preview">
                                <h6>Quiz Category</h6>
                                <h2>#{quiz.category}</h2>
                                <a href={"/leaderboard/"+quiz.id}>View Leaderboard</a>
                            </div>
                            <div className="course-info">
                                <h2>{quiz.quiz_name}</h2>
                                <h6>{quiz.desc}</h6>
                                <a href="" className='btn'>Take Quiz</a>
                            </div>
                        </div>
                    </div>
                ))}          
            </ul>   
        )
    }
}
