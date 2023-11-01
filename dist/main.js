"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa os módulos necessários
const express_1 = __importDefault(require("express")); // Importa o módulo 'express' para criar e configurar o servidor HTTP.
const path_1 = __importDefault(require("path")); // Importa o módulo 'path' para manipular caminhos de arquivos e diretórios.
const axios_1 = __importDefault(require("axios")); // Importa o módulo 'axios' para fazer requisições HTTP.
// Inicializa o aplicativo Express
const app = (0, express_1.default)(); // Inicializa uma nova instância do aplicativo Express e armazena na variável 'app'.
const port = 3000; // Define a porta 3000 como a porta onde o servidor vai escutar.
// Define a classe Carro
class Carro {
    // Construtor da classe
    constructor(marca, modelo, categoria, ano, quilometragem, valor) {
        this.marca = marca; // Inicializa a propriedade 'marca' com o valor fornecido.
        this.modelo = modelo; // Inicializa a propriedade 'modelo' com o valor fornecido.
        this.categoria = categoria; // Inicializa a propriedade 'categoria' com o valor fornecido.
        this.ano = ano; // Inicializa a propriedade 'ano' com o valor fornecido.
        this.quilometragem = quilometragem; // Inicializa a propriedade 'quilometragem' com o valor fornecido.
        this.valor = valor; // Inicializa a propriedade 'valor' com o valor fornecido.
    }
}
// Inicializa a lista de carros
let carros = []; // Declara uma variável chamada 'carros' que é um array vazio do tipo 'CarroAPI'.
// Busca dados da API e armazena em 'carros'
axios_1.default.get('https://apigenerator.dronahq.com/api/XYiVwDBB/carro') // Faz uma requisição GET para a URL especificada usando o Axios.
    .then(response => {
    carros = response.data; // Atribui os dados recebidos à variável 'carros'.
})
    .catch(error => {
    console.log('Erro ao buscar dados:', error); // Exibe uma mensagem de erro no console.
});
// Configura o middleware
app.use(express_1.default.json()); // Configura o aplicativo Express para usar o middleware que analisa corpos de requisição JSON.
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); // Configura o aplicativo para servir arquivos estáticos do diretório 'public'.
// Rota para obter todos os carros
app.get('/carros', (req, res) => {
    res.json(carros); // Envia a variável 'carros' como uma resposta JSON.
});
// Rota para obter um carro específico pelo ID
app.get('/carros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); // Converte o parâmetro 'id' para um número inteiro.
    try { // Inicia um bloco try para capturar erros.
        const response = yield axios_1.default.get(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`); // Faz uma requisição GET assíncrona para buscar um carro específico pelo 'id'.
        res.json(response.data); // Envia os dados recebidos como uma resposta JSON.
    }
    catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.
        res.status(404).send('Carro não encontrado'); // Envia uma resposta com status 404 e a mensagem 'Carro não encontrado'.
    }
}));
// Rota para adicionar um novo carro
app.post('/carros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const novoCarro = req.body; // Extrai o corpo da requisição e o armazena na variável 'novoCarro' do tipo 'CarroAPI'.
    try { // Inicia um bloco try para capturar erros.
        const response = yield axios_1.default.post('https://apigenerator.dronahq.com/api/XYiVwDBB/carro', novoCarro); // Faz uma requisição POST assíncrona para adicionar um novo carro.
        carros.push(response.data); // Adiciona o novo carro ao array 'carros'.
        res.send('Novo carro adicionado'); // Envia uma resposta indicando que o novo carro foi adicionado.
    }
    catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.
        res.status(500).send('Erro ao adicionar carro'); // Envia uma resposta com status 500 e a mensagem 'Erro ao adicionar carro'.
    }
}));
// Rota para atualizar um carro existente pelo ID
app.put('/carros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); // Converte o parâmetro 'id' para um número inteiro.
    const dadosAtualizados = req.body; // Extrai o corpo da requisição e o armazena na variável 'dadosAtualizados' do tipo 'CarroAPI'.
    try { // Inicia um bloco try para capturar erros.
        const response = yield axios_1.default.put(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`, dadosAtualizados); // Faz uma requisição PUT assíncrona para atualizar um carro específico pelo 'id'.
        const index = carros.findIndex(c => c.id === id); // Encontra o índice do carro com o 'id' especificado no array 'carros'.
        if (index !== -1) { // Verifica se o carro foi encontrado.
            carros[index] = response.data; // Atualiza os dados do carro no array 'carros'.
        }
        carros.push(response.data); // Adiciona os dados atualizados ao array 'carros'.
        res.send(`Carro com ID: ${id} atualizado`); // Envia uma resposta indicando que o carro foi atualizado.
    }
    catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.
        res.status(500).send('Erro ao atualizar carro'); // Envia uma resposta com status 500 e a mensagem 'Erro ao atualizar carro'.
    }
}));
// Rota para excluir um carro pelo ID
app.delete('/carros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); // Converte o parâmetro 'id' para um número inteiro.
    try { // Inicia um bloco try para capturar erros.
        const response = yield axios_1.default.delete(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`); // Faz uma requisição DELETE assíncrona para excluir um carro específico pelo 'id'.
        const index = carros.findIndex(c => c.id === id); // Encontra o índice do carro na array.
        if (index !== -1) { // Verifica se o carro foi encontrado.
            carros.splice(index, 1); // Remove o carro da array.
        }
        console.log("Array atualizada após exclusão: ", carros); // Log da array atualizada.
        res.send(`Carro com ID: ${id} excluído`); // Envia uma resposta indicando que o carro foi excluído.
    }
    catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.
        res.status(500).send('Erro ao excluir carro'); // Envia uma resposta com status 500 e a mensagem 'Erro ao excluir carro'.
    }
}));
// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`); // Exibe uma mensagem no console indicando que o servidor está rodando e em qual porta.
});
