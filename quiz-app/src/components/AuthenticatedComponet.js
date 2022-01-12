import React, { Component } from 'react'
import {getJWT} from '../helpers/jwt'
import axios from 'axios'
export default class AuthenticatedComponet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined
        }
    }
    componentDidMount() {
        const jwt = getJWT()
        if (!jwt) {
            this.props.history.push('/Login')
        }
        axios.get('http://localhost:4000/getUser', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        .then(res => {
            this.setState({
                user: res.data
            })
        }).catch(err => {
            console.log(err)
            localStorage.removeItem('quiz_token')
            this.props.history.push('/Login')
        })
    }
    render() {
        if(this.state.user === undefined) {
            return(
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
