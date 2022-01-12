import axios from 'axios'
import {getJWT} from '../helpers/jwt';
import React, { Component } from 'react'
export default class Your_quizs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quiz: [], 
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:4000/your_quizs/`,{
            headers: {
                Authorization: `Bearer ${getJWT()}`
            }
        }).then(res => {
                this.setState({
                    quiz: res.data
                })
                console.log(res.data)
            })
    }
    render() {
        return (
            <div className='container width-900'>
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8">
                            <div className='color-white headings d-flex justify-content-between align-items-center mb-3'>
                                <h5>Quizes you have Taken </h5>

                            </div>
                            {this.state.quiz.map(quiz => (
                                <div className='card p-3 mt-2'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='user d-flex flex-row align-items-center'>
                                            <span>
                                                <h4>{quiz.quiz_name}</h4>
                                                <h6>
                                                    {quiz.category}
                                                </h6>
                                                <br></br>
                                                <small>Score:{quiz.result}/{quiz.number_of_questions}</small>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='action d-flex justify-content-between mt-2 align-items-center'>
                                        <div className='.reply.px-4'>
                                            <a href={`/your_quiz/${quiz.id}`}> View Answers </a>
                                            <span className='dots'></span>
                                            <a href={`/leaderboard/${quiz.quiz_id}`}> View Leaderboard </a>
                                            <span className='dots'></span>
                                            <a href={`/your_quiz/delete/${quiz.id}`}> Delete </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            
        </div>
        )
    }
}