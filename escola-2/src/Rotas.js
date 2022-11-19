import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import CrudAluno from './components/CrudFuncionario/CrudFuncionario';
import AuthService from './services/AuthService';
import UserService from './services/UserService';
import Login from './components/login/Login';
import Logout from './components/Logout/Logout';
import CrudCurso from './components/Pets/CrudPets';
import Carometro from './components/Carometro/Carometro';


export default function Rotas() {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);
    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div>Adote um pet</div>
                    </Main>
                }
            />
            {currentUser ? (
                <Route exact path='/funcionario'
                    element={<CrudAluno />}
                />
            ) : (
                <Route exact path='/funcionario'
                    element={
                        <Main title="Cadastro de Funcionarios">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            {currentUser ? (
                <Route exact path='/pets'
                element={<CrudCurso />}
                    
                />
            ) : (
                <Route exact path='/pets'
                    element={
                        <Main title="Cadastro de pet">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            <Route exact path='/adocao'
                element={
                    <Main title="Carômetro">
                        <Carometro />
                    </Main>
                }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />
        </Routes>
    )
}