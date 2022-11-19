import axios from "axios";
const API_URL = "http://localhost:5092/api/";
// Cadastro Funcionario: role chefe
// Cadastro Animal: role funconal
// Doacao: todos
const user = JSON.parse(localStorage.getItem('user'));
const getPublicContent = () => {
    return axios.get(API_URL + "doacao");
};
const getChefeBoard = async () => {
    return await axios.get(API_URL + "funcionario", {
        headers: {
            Authorization:
                'Bearer ' + user.token 
        }
    });
};
const getFuncionarioBoard = async () => {
    return await axios.get(API_URL + "animal", {
        headers: {
            Authorization:
                'Bearer ' + user.token 
        }
    });
};
const UserService = {
    getPublicContent,
    getChefeBoard,
    getFuncionarioBoard
};
export default UserService;