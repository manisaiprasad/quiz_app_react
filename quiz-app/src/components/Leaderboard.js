import { useParams } from "react-router-dom";
import axios from 'axios'
import {getJWT} from '../helpers/jwt';
import React, { Component } from 'react'
class Leaderboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quiz: [],
            rank: 1
        }
    }
    componentDidMount() {
        const { id } = this.props.params;
        console.log(this.props.params)
        axios.get(`http://localhost:4000/leaderboard/${id}`,{
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
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="activity">
                                <div >
                                    <h2 className="color-white">Leaderboard</h2>
                                    <br></br>
                                    {console.log("state zero",this.state.quiz[0])}
                                    {this.state.quiz[0] ? (
                                        <div className="color-white">
                                            <h3>{this.state.quiz[0].quiz_name}</h3>
                                            <br></br>
                                            <h4>{this.state.quiz[0].desc}</h4>
                                            <br></br>
                                            <h5>{this.state.quiz[0].category}</h5>
                                        </div>
                                    ) 
                                    :   <h3 className="color-white" >Loading................</h3>
                    }
                                    <br></br>
                                    {this.state.quiz.map(user => (
                                        <div className="mt-3 card-color-black">
                                            <ul className="list list-inline">
                                                <li className="d-flex justify-content-between">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <div className="d-flex flex-column mr-2">
                                                            <h6>{this.state.rank++}</h6>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center">
                                                        <div className="d-flex flex-column mr-2">
                                                            <h6>{user.full_name}</h6>
                                                            <p>@{user.user_name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center">
                                                        <div className="d-flex flex-column mr-2">
                                                            <h6>Score: {user.result}/{user.number_of_questions}</h6>

                                                        </div>
                                                    </div>

                                                </li>
                                            </ul>

                                        </div>   
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
        </div>
        )
    }
}


export default (props) => (
    <Leaderboard
        {...props}
        params={useParams()}
    />
);

// export default function Leaderboard() {
//     let { id } = useParams();
//     const [quiz, setQuiz] = useState([]);
//     const [rank, setRank] = useState([]);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         axios.get(`http://localhost:4000/leaderboard/${id}`,{
//             headers: {
//                 Authorization: `Bearer ${getJWT()}`
//             }
//         }).then(res => {
//                 setQuiz(res);
//                 console.log(res)
//             })
           
//     }, []);

//     console.log(quiz)

//     return (
        
//     )
// }
