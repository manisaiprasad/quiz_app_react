import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useParams } from "react-router-dom";
import AuthenticatedComponet from './components/AuthenticatedComponet';
import Leaderboard from './components/Leaderboard';
import {getJWT} from './helpers/jwt';
import Logout from './components/Logout';
import Your_quizs from './components/Your_quizs';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />,
        <Route path="/signup" element={<Signup/>} />,

        <Route exact path="/" element={<PrivateRoute>
          <Navbar active='home'/>
          <Home />
        </PrivateRoute>}>
        </Route>   

        <Route exact path="/leaderboard/:id" element={<PrivateRoute>
          <Navbar active='home'/>
          <Leaderboard />
        </PrivateRoute>}>
        </Route>   

        <Route exact path="/your_quiz/" element={<PrivateRoute>
          <Navbar active='your_quizs'/>
          <Your_quizs />
        </PrivateRoute>}>
        </Route>

        <Route path='/logout' element={<Logout/>} />'   
      </Routes>
    </Router>     
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}
function useAuth() {
  const jwt = getJWT();
  return jwt && jwt !== 'undefined' && jwt !== 'null';
}
export default App;
