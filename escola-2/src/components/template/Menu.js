import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';


export default function Menu(props) {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    return (
        <nav className='menu'>
            <Link to="/funcionario">
                Funcionário
            </Link>
            <Link to="/pets">
                Novo pet
            </Link>
            <Link to="/adocao">
                Adoção
            </Link>
            {currentUser ? (
                <Link to="/logout">
                    Logout
                </Link>
            ) : (
                <Link to="/login">
                    Login
                </Link>
            )}
        </nav>
    )
}