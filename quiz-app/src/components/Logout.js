import React, {useEffect} from 'react'
import { useNavigate,Navigate } from "react-router-dom";

export default function Logout() {
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('quiz_token');
    }, []);
    return (
        <Navigate to="/login" />
    )
}
