import React, { Component } from "react";
import { useEffect, useState } from 'react';
import "./CrudFuncionario.css";
import Main from "../template/Main";
import axios from "axios";
import UserService from "../../services/UserService";

const title  = "Cadastro de Funcionarios";

const urlAPI ="http://localhost:5092/api/Funcionario";

const initialState = {
  funcionario: { id: 0, nome: "", setor: "", inscricao: 0 },
  lista: [],
};

const user = JSON.parse(localStorage.getItem("user"));

export default function Crudfuncionario() {
  const [funcionario, setfuncionario] = useState({
    id: null,
    nome: '',
    setor: '',
    inscricao: 0
  });
  const [lista, setLista] = useState([]);
  const [mens, setMens] = useState([]);
  useEffect(() => {
    UserService.getChefeBoard().then(
      (response) => {
        console.log("useEffect getChefeBoard: " + response.data)
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
    setfuncionario({ nome: '', setor: '', inscricao: 0 })
  }


  const listarfuncionarios = async () => {
    const resposta = await axios.get(urlAPI);

    setLista(resposta.data)
  };
 
  
  const salvar = async () => {
    const requisicao = funcionario.id ? 'put' : 'post'
    const minhaUrl = funcionario.id ? `${urlAPI}/${funcionario.id}` : urlAPI

    if (funcionario.id) {
      funcionario.id = Number(funcionario.id)
    }

    const validacaoPost = {
      "nome": funcionario.nome,
      "setor": funcionario.setor,
      "inscricao": funcionario.inscricao
    }

    await axios[requisicao](minhaUrl, validacaoPost)
    limpar()

    await listarfuncionarios()
  }

  useEffect(() => {
    listarfuncionarios()
  }, [])

  const pegaDados = (e) => {
    const novoValor = funcionario
    novoValor[e.target.name] = e.target.value

    setfuncionario({ ...novoValor })
  }

  const deleteDados = async (registrar) => {
    if(window.confirm("Confirme a remoção do curso" + registrar.id)) {
      await axios.delete(`${urlAPI}/${registrar.id}`)
    }

    await listarfuncionarios()
  }
  
  const renderTable = () => {
    return (
      <div>
        <div className="inclui-container">

          <label>Código</label>
          <input
            type="number"
            id=""
            placeholder="Cod. do Funcionário"
            className="form-input"
            name="inscricao"
            value={funcionario.inscricao}
            onChange={pegaDados}
          />

          <label>Nome do funcionário</label>
          <input
            type="text"
            id=""
            placeholder="Nome do funcionário"
            className="form-input"
            name="nome"
            value={funcionario.nome}
            onChange={pegaDados}
          />

          <label>Setor</label>
          <input
            type="text"
            id=""
            placeholder="Setor de trabalho"
            className="form-input"
            name="setor"
            value={funcionario.setor}
            onChange={pegaDados}
          />


          <button className="btnSalvar" onClick={salvar}>
            Salvar
          </button>
          <button className="btnCancelar" onClick={() => limpar()}>
            Cancelar
          </button>
        </div>
        <div className="listagem">
          <table className="listafuncionarios" id="tblListafuncionarios">
            <thead>
              <tr className="cabecTabela">
                <th className="tabTituloRa">Codigo</th>
                <th className="tabTituloNome">Nome</th>
                <th className="tabTituloCurso">Setor</th>
              </tr>
            </thead>
            <tbody>
              {lista.map(
                (funcionario) =>
                  <tr key={funcionario.id}>
                    <td>{funcionario.inscricao}</td>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.setor}</td>
                    <td>
                    <button onClick={() => setfuncionario(funcionario)}>Altera</button>
                  </td>
                  <td>
                    <button onClick={() => deleteDados(funcionario)}>Remove</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div >
      </div>
    );
  }
  return (
    <Main title={title}>
      {(mens) ? "Problema com conexão ou autorização (contactar administrador)." : renderTable()}
    </Main>
  )
}