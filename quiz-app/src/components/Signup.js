import React, { useState } from "react";
import './login.css'
import axios from 'axios'
export default function Signup() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userName,setUserName] = useState('');
    const [data, setData] = useState(null);

    const signup = () => {
        const data = {
            name: name,
            username: userName,
            email: email,
            password: password
        }
        console.log(data)
        axios.post('http://localhost:4000/signup', data)
            .then(res => {
                console.log(res)
                setData(res.data)
            })

    }
    return (
        <div className='container'>
                <div className='card border-0 shadow rounded-3 my-5'>
                    <div className='card-body p-4 p-sm-5'>
                        <h1 className='card-title text-center mb-5 fw-light fs-5'>
                            <span>Login</span>
                        </h1>
                        <form className='form'>
                            <div className='form-group'>
                                <div className='form-floating mb-3'>
                                    <input id='floatingInput' required='true' type='text' onChange={(e)=>setName(e.target.value)} className='form-control' id='name' placeholder='Full Name' />
                                    <lable for='floatingInput'>Full Name</lable>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input id='floatingInput'  required='true' onChange={(e)=>setUserName(e.target.value)} type='text' className='form-control' id='username' placeholder='Username' />
                                    <lable for='floatingInput'>Username</lable>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input id='floatingInput' type='email' onChange={(e)=>setEmail(e.target.value)} className='form-control' id='email' placeholder='Email' />
                                    <lable for='floatingInput'>Email address</lable>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input id='floatingPassword' required='true' type='password' onChange={(e)=>setPassword(e.target.value)} className='form-control' id='password' placeholder='Password' />
                                    <lable for='floatingPassword'>Password</lable>
                                </div>
                                <div className='form-group text-center'>
                                    <button type='submit' onClick={signup} className='btn btn-primary btn-lg'>Sign Up</button>
                                </div>
                            </div>
                        </form>
                        <div className='text-center'>
                            <p>Already have an account? <a href='/login'>Login</a></p>
                        </div>
                </div>
        </div>
        </div>
    )
}

