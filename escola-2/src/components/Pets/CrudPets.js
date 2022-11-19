import React, { Component } from "react";
import { useEffect, useState } from 'react';
import "./CrudPets.css";
import Main from "../template/Main";
import axios from "axios";
import UserService from "../../services/UserService";

const title  = "Cadastro de Animal";

const urlAPI ="http://localhost:5092/api/animal";

const initialState = {
  pets: {     
    nome: null,
    idade: '',
    codEspecie: 0,
    saude: '',
    cor: '' },
  lista: [],
};

const user = JSON.parse(localStorage.getItem("user"));

export default function CrudCurso() {
  const [pets, setpets] = useState({
    nome: null,
    idade: '',
    codEspecie: 0,
    saude: '',
    cor: ''
  });
  const [lista, setLista] = useState([]);
  const [mens, setMens] = useState([]);
  useEffect(() => {
    UserService.getFuncionarioBoard().then(
      (response) => {
        console.log("useEffect getFuncionarioBoard: " + response.data)
        setLista(response.data);
        setMens(null);
      },
      (error) => {
        const _mens =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMens(_mens);
        console.log("_mens: " + _mens);
      }
    );
  }, []);
  
  const limpar = () => {
    setpets({    
      nome: null,
      idade: '',
      codEspecie: 0,
      saude: '',
      cor: ''})
  }


  const listarpetss = async () => {
    const resposta = await axios.get(urlAPI);

    setLista(resposta.data)
  };
 
  
  const salvar = async () => {
    const requisicao = pets.id ? 'put' : 'post'
    const minhaUrl = pets.id ? `${urlAPI}/${pets.id}` : urlAPI

    if (pets.id) {
      pets.id = Number(pets.id)
    }

    const validacaoPost = {
      "codEspecie": pets.codEspecie,
      "nome": pets.nome,
      "idade": pets.idade,
      "saude": pets.saude,
      "cor": pets.cor
    }

    await axios[requisicao](minhaUrl, validacaoPost)
    limpar()

    await listarpetss()
  }

  useEffect(() => {
    listarpetss()
  }, [])

  const pegaDados = (e) => {
    const novoValor = pets
    novoValor[e.target.name] = e.target.value

    setpets({ ...novoValor })
  }

  const renderTable = () => {
    return (
      <div>
        <div className="inclui-container">

          <label>Código da Espécie</label>
          <input
            type="number"
            id=""
            placeholder="Cod. do Funcionário"
            className="form-input"
            name="codEspecie"
            value={pets.codEspecie}
            onChange={pegaDados}
          />

          <label>Nome do Animal</label>
          <input
            type="text"
            id=""
            placeholder="Nome do funcionário"
            className="form-input"
            name="nome"
            value={pets.nome}
            onChange={pegaDados}
          />


          <label>Idade</label>
          <input
            type="number"
            id=""
            placeholder="Idade"
            className="form-input"
            name="idade"
            value={pets.idade}
            onChange={pegaDados}
          />
          <label>Saude</label>
          <input
            type="text"
            id=""
            placeholder="Saude"
            className="form-input"
            name="saude"
            value={pets.saude}
            onChange={pegaDados}
          />
          <label>Cor</label>
          <input
            type="text"
            id=""
            placeholder="cor"
            className="form-input"
            name="cor"
            value={pets.cor}
            onChange={pegaDados}
          />
          <button className="btnSalvar" onClick={salvar}>
            Salvar
          </button>
          <button className="btnCancelar" onClick={() => limpar()}>
            Cancelar
          </button>
        </div>
     
      </div>
    );
  }
  return (
    <Main title={title}>
      {(mens) ? "Problema com conexão ou autorização (contactar administrador)." : renderTable()}
    </Main>
  )
}