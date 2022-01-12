import React from 'react'

export default function Navbar(props) {
    return (
        <header className="main-header">
            <div className="container">
                <nav className="navbar navbar-expand-lg main-nav px-0">
                    <div className="collapse navbar-collapse justify-content-center" id="mainMenu">
                        <ul className="navbar-nav ml-auto text-uppercase f1">
                            <li><a href="/">home</a></li>
                            <li><a href="/new_quiz">New Quiz</a></li>
                            <li><a href="/your_quiz">your quizs</a></li>
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/logout">logout</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}
