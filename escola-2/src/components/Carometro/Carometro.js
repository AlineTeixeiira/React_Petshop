import React, { Component } from "react";
import "./Carometro.css";
import Main from "../template/Main";
import axios from "axios";

const title = "Busca de alunos por sala";

const urlAPI = "http://localhost:5092/api/animal";
const urlEspecie = "http://localhost:5092/api/especie";

const initialState = {
  animal: {     //anima = aluno
    nome: null,
    idade: '',
    codEspecie: 0,
    saude: '',
    cor: '' },
  lista: [],
  especie: { id: 0, nome: "", codEspecie: 0 },
  listagemEspecies: [],
};


export default class Carometro extends Component {
  state = { ...initialState };

  componentDidMount() {
    axios(urlAPI).then((resp) => {
      this.setState({ lista: resp.data });
    });
    axios(urlEspecie).then((resp) => {
      this.setState({ listagemEspecies: resp.data })
    })
  }

  getAnimaisEspecie() {
    const value = document.getElementById('codEspecie').value
    axios(urlAPI).then((resp) => {
      const animalPorEspecie = resp.data
      const animalPorEspecie2 = [];
      animalPorEspecie.forEach(res => {
        if (res.codEspecie === value) {
          animalPorEspecie2.push(res)
        }
      });

      this.setState({ lista: animalPorEspecie2 });
    });
  }


  renderForm() {
    return (
      <div className="container ">
        <table>

          <label>Selecione a especie do pet</label>
          <select id="codEspecie" name="codEspecie" value={this.state.especie.codEspecie}
            onChange={e => this.getAnimaisEspecie()}>
            {this.state.listagemEspecies.map((a) => (
              <option value={a.codEspecie}>{a.nome}</option>
            ))}
          </select>

          <tbody>
            {this.state.lista.map(
              (animal) =>
                <tr className="card">
                  <img src={require(`../../assets/img/${Math.floor(Math.random() * 2 + 1)}.png`)} alt="imagem" />
                  <td className="conteudo">Nome: {animal.nome}</td>
                  <td className="conteudo">Cor: {animal.cor}</td>
                  <td className="conteudo">Idade: {animal.idade}</td>
                  <td className="conteudo">Saude: {animal.saude}</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
  render() {
    return (
      <Main title={title}>
        {this.renderForm()}
      </Main>
    );
  }
}